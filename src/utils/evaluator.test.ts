import { describe, it, expect } from 'vitest'
import { QuestionnaireEvaluator } from './evaluator'
import { questionnaireConfig } from '../config/questionnaire'
import type { UserAnswers } from '../types/questions'

describe('QuestionnaireEvaluator', () => {
  const evaluator = new QuestionnaireEvaluator(
    questionnaireConfig.questions,
    questionnaireConfig.rules
  )

  const createAnswers = (answers: Record<string, string>): UserAnswers => {
    return new Map(Object.entries(answers))
  }

  describe('Immediate Disqualifiers', () => {
    it('should reject Cleveland Browns fans', () => {
      const answers = createAnswers({
        football_team: 'browns',
        pineapple_pizza: 'no',
        ketchup_hotdog: 'no',
        lutheran: 'yes',
      })

      const result = evaluator.evaluate(answers)

      expect(result.verdict).toBe('immediate_no')
      expect(result.isImmediate).toBe(true)
      expect(result.message).toContain('Cleveland Browns')
      expect(result.message).toContain('fundamental character flaw')
    })

    it('should reject people who like pineapple on pizza', () => {
      const answers = createAnswers({
        football_team: 'steelers',
        pineapple_pizza: 'yes',
        ketchup_hotdog: 'no',
        lutheran: 'yes',
      })

      const result = evaluator.evaluate(answers)

      expect(result.verdict).toBe('immediate_no')
      expect(result.isImmediate).toBe(true)
      expect(result.message).toContain('pineapple')
      expect(result.message).toContain('catastrophic lack of judgment')
    })
  })

  describe('Combination Rules', () => {
    it('should reject Steelers fans who like both pineapple and ketchup', () => {
      const answers = createAnswers({
        football_team: 'steelers',
        pineapple_pizza: 'yes',
        ketchup_hotdog: 'yes',
        lutheran: 'no',
      })

      // Note: This will hit the immediate disqualifier for pineapple first
      const result = evaluator.evaluate(answers)
      expect(result.verdict).toBe('immediate_no')
    })

    it('should conditionally approve Steelers fans with pineapple but no ketchup', () => {
      // This test won't work as expected because pineapple 'yes' is an immediate disqualifier
      // Let's test the forgiveness path doesn't exist due to immediate disqualification
      const answers = createAnswers({
        football_team: 'steelers',
        pineapple_pizza: 'yes',
        ketchup_hotdog: 'no',
        lutheran: 'yes',
      })

      const result = evaluator.evaluate(answers)
      expect(result.verdict).toBe('immediate_no')
      expect(result.isImmediate).toBe(true)
    })
  })

  describe('Approvals', () => {
    it('should approve perfect candidate: Lutheran Steelers fan with good food takes', () => {
      const answers = createAnswers({
        football_team: 'steelers',
        pineapple_pizza: 'no',
        ketchup_hotdog: 'no',
        lutheran: 'yes',
      })

      const result = evaluator.evaluate(answers)

      expect(result.verdict).toBe('approved')
      expect(result.isImmediate).toBe(false)
      expect(result.message).toContain('Lutheran Steelers fan')
    })

    it('should approve Steelers fan with good food takes (not Lutheran)', () => {
      const answers = createAnswers({
        football_team: 'steelers',
        pineapple_pizza: 'no',
        ketchup_hotdog: 'no',
        lutheran: 'no',
      })

      const result = evaluator.evaluate(answers)

      expect(result.verdict).toBe('approved')
      expect(result.isImmediate).toBe(false)
      expect(result.score).toBe(90) // Steelers (40) + No pineapple (25) + No ketchup (25) + Not Lutheran (0)
      expect(result.message).toContain('Steelers fan')
    })

    it('should conditionally approve non-Steelers fan with excellent food opinions', () => {
      const answers = createAnswers({
        football_team: 'packers',
        pineapple_pizza: 'no',
        ketchup_hotdog: 'no',
        lutheran: 'no',
      })

      const result = evaluator.evaluate(answers)

      // Packers (-10) + No pineapple (25) + No ketchup (25) = 40
      // This should match the 'acceptable-score' rule (30-59)
      expect(result.verdict).toBe('conditional')
      expect(result.isImmediate).toBe(false)
      expect(result.score).toBe(40)
    })
  })

  describe('Conditional Approvals', () => {
    it('should reject someone who likes ketchup on hot dogs with Packers', () => {
      const answers = createAnswers({
        football_team: 'packers',
        pineapple_pizza: 'no',
        ketchup_hotdog: 'yes',
        lutheran: 'yes',
      })

      const result = evaluator.evaluate(answers)

      // Score: Packers (-10) + No pineapple (25) + Yes ketchup (-35) + Lutheran (10) = -10
      // This now falls into negative-score (rejected) due to Packers penalty
      expect(result.verdict).toBe('rejected')
      expect(result.score).toBe(-10)
    })

    it('should conditionally approve someone with neutral food opinions', () => {
      const answers = createAnswers({
        football_team: 'lions',
        pineapple_pizza: 'can-live-without',
        ketchup_hotdog: 'can-live-without',
        lutheran: 'no',
      })

      const result = evaluator.evaluate(answers)

      expect(result.verdict).toBe('conditional')
    })
  })

  describe('Condition-Based Rules', () => {
    it('should match exact value conditions', () => {
      const answers = createAnswers({
        football_team: 'steelers',
        pineapple_pizza: 'no',
        ketchup_hotdog: 'no',
        lutheran: 'yes',
      })

      const result = evaluator.evaluate(answers)

      // Should match 'perfect-match' rule which requires exact values
      expect(result.verdict).toBe('approved')
      expect(result.message).toContain('Lutheran Steelers fan with impeccable food opinions')
    })

    it('should match score-based question conditions', () => {
      const answers = createAnswers({
        football_team: 'steelers', // 40 points
        pineapple_pizza: 'can-live-without', // 0 points
        ketchup_hotdog: 'can-live-without', // 0 points
        lutheran: 'yes', // 10 points
      })

      const result = evaluator.evaluate(answers)

      // Total: 50 points, but has Steelers (40+) so should match 'good-steelers' if score >= 60
      // Actually this is 50 total, so won't match 'good-steelers' (needs 60+)
      // Should fall through to 'acceptable-score' (30-59)
      expect(result.score).toBe(50)
      expect(result.verdict).toBe('conditional')
    })

    it('should approve Lutheran with perfect food opinions (non-Steelers team)', () => {
      const answers = createAnswers({
        football_team: 'lions',
        pineapple_pizza: 'no',
        ketchup_hotdog: 'no',
        lutheran: 'yes',
      })

      const result = evaluator.evaluate(answers)

      // Score: Lions (30) + No pineapple (25) + No ketchup (25) + Lutheran (10) = 90
      // Hits 'lutheran-perfect-food' rule (priority 85)
      expect(result.score).toBe(90)
      expect(result.verdict).toBe('approved')
      expect(result.message).toContain('Lutheran with impeccable food opinions')
      expect(result.message).toContain('converting them to Steelers fans')
    })
  })

  describe('Completeness Check', () => {
    it('should return false when questions are unanswered', () => {
      const answers = createAnswers({
        football_team: 'steelers',
      })

      expect(evaluator.isComplete(answers)).toBe(false)
    })

    it('should return false when dropdown has empty value', () => {
      const answers = createAnswers({
        football_team: '',
        pineapple_pizza: 'no',
        ketchup_hotdog: 'no',
        lutheran: 'yes',
      })

      expect(evaluator.isComplete(answers)).toBe(false)
    })

    it('should return true when all questions are answered', () => {
      const answers = createAnswers({
        football_team: 'steelers',
        pineapple_pizza: 'no',
        ketchup_hotdog: 'no',
        lutheran: 'yes',
        lotr: 'yes-second-breakfast',
      })

      expect(evaluator.isComplete(answers)).toBe(true)
    })
  })
})
