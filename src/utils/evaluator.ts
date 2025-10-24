import type {
  Question,
  UserAnswers,
  EvaluationResult,
  EvaluationRule,
  RuleCondition,
} from '../types/questions'

export class QuestionnaireEvaluator {
  constructor(
    private questions: Question[],
    private rules: EvaluationRule[]
  ) {}

  /**
   * Get a specific disqualification message based on the question and answer
   */
  private getDisqualificationMessage(questionId: string, answerLabel: string): string {
    const messageMap: Record<string, string> = {
      football_team: `Absolutely not. Being a ${answerLabel} fan is a fundamental character flaw and an immediate disqualifier.`,
      pineapple_pizza: `Absolutely not. Anyone who thinks pineapple belongs on pizza has demonstrated a catastrophic lack of judgment. This is a deal-breaker.`,
    }

    return (
      messageMap[questionId] ||
      `Absolutely not. ${answerLabel} is a deal-breaker that cannot be overlooked.`
    )
  }

  /**
   * Check if any answer is an immediate disqualifier
   */
  private checkImmediateDisqualifiers(answers: UserAnswers): EvaluationResult | null {
    for (const question of this.questions) {
      const userAnswer = answers.get(question.id)
      if (!userAnswer) continue

      const selectedOption = question.options.find((opt) => opt.value === userAnswer)
      if (selectedOption?.immediateDisqualifier) {
        return {
          verdict: 'immediate_no',
          message: this.getDisqualificationMessage(question.id, selectedOption.label),
          isImmediate: true,
          score: -Infinity, // Immediate disqualifiers have the worst possible score
        }
      }
    }

    return null
  }

  /**
   * Calculate the total score from all answers
   */
  private calculateScore(answers: UserAnswers): number {
    let totalScore = 0

    for (const question of this.questions) {
      const userAnswer = answers.get(question.id)
      if (!userAnswer || userAnswer === '') continue

      const selectedOption = question.options.find((opt) => opt.value === userAnswer)
      if (selectedOption?.weight !== undefined) {
        totalScore += selectedOption.weight
      }
    }

    return totalScore
  }

  /**
   * Get all tags for a given answer
   */
  private getAnswerTags(questionId: string, answerValue: string): string[] {
    const question = this.questions.find((q) => q.id === questionId)
    if (!question) return []

    const option = question.options.find((opt) => opt.value === answerValue)
    return option?.tags || []
  }

  /**
   * Get the score for a specific question's answer
   */
  private getQuestionScore(questionId: string, answerValue: string): number {
    const question = this.questions.find((q) => q.id === questionId)
    if (!question) return 0

    const option = question.options.find((opt) => opt.value === answerValue)
    return option?.weight ?? 0
  }

  /**
   * Check if a condition is met
   */
  private isConditionMet(condition: RuleCondition, answers: UserAnswers): boolean {
    const userAnswer = answers.get(condition.questionId)
    if (!userAnswer) return false

    // Check for specific value match
    if (condition.value !== undefined) {
      return userAnswer === condition.value
    }

    // Check for tag match
    if (condition.hasTag !== undefined) {
      const tags = this.getAnswerTags(condition.questionId, userAnswer)
      return tags.includes(condition.hasTag)
    }

    // Check for score-based match on this specific question
    const questionScore = this.getQuestionScore(condition.questionId, userAnswer)

    if (condition.minScore !== undefined && questionScore < condition.minScore) {
      return false
    }

    if (condition.maxScore !== undefined && questionScore > condition.maxScore) {
      return false
    }

    // If we have minScore or maxScore defined, and we passed the checks, condition is met
    if (condition.minScore !== undefined || condition.maxScore !== undefined) {
      return true
    }

    return false
  }

  /**
   * Check if a rule applies to the given answers and score
   */
  private doesRuleApply(rule: EvaluationRule, answers: UserAnswers, score: number): boolean {
    // Check weight-based thresholds
    if (rule.minScore !== undefined && score < rule.minScore) {
      return false
    }
    if (rule.maxScore !== undefined && score > rule.maxScore) {
      return false
    }

    // Check condition-based rules (if any conditions are specified)
    if (rule.conditions && rule.conditions.length > 0) {
      return rule.conditions.every((condition) => this.isConditionMet(condition, answers))
    }

    // If no conditions and score is in range, rule applies
    return true
  }

  /**
   * Evaluate the user's answers and return a verdict
   */
  evaluate(answers: UserAnswers): EvaluationResult {
    // First check for immediate disqualifiers
    const immediateResult = this.checkImmediateDisqualifiers(answers)
    if (immediateResult) {
      return immediateResult
    }

    // Calculate total score
    const score = this.calculateScore(answers)

    // Sort rules by priority (highest first)
    const sortedRules = [...this.rules].sort((a, b) => b.priority - a.priority)

    // Find the first rule that applies
    for (const rule of sortedRules) {
      if (this.doesRuleApply(rule, answers, score)) {
        return {
          verdict: rule.verdict,
          message: rule.message,
          isImmediate: rule.verdict === 'immediate_no',
          score,
        }
      }
    }

    // Fallback if no rules match (shouldn't happen with a catch-all rule)
    return {
      verdict: 'conditional',
      message: 'Unable to determine compatibility. Please review your answers.',
      isImmediate: false,
      score,
    }
  }

  /**
   * Check if all questions have been answered
   */
  isComplete(answers: UserAnswers): boolean {
    return this.questions.every((q) => {
      const answer = answers.get(q.id)
      return answer !== undefined && answer !== ''
    })
  }
}
