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
          message: `Absolutely not. ${selectedOption.label} is a deal-breaker.`,
          isImmediate: true,
        }
      }
    }

    return null
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
   * Check if a condition is met
   */
  private isConditionMet(condition: RuleCondition, answers: UserAnswers): boolean {
    const userAnswer = answers.get(condition.questionId)
    if (!userAnswer) return false

    // Check for specific value match
    if (condition.value) {
      return userAnswer === condition.value
    }

    // Check for tag match
    if (condition.hasTag) {
      const tags = this.getAnswerTags(condition.questionId, userAnswer)
      return tags.includes(condition.hasTag)
    }

    return false
  }

  /**
   * Check if a rule applies to the given answers
   */
  private doesRuleApply(rule: EvaluationRule, answers: UserAnswers): boolean {
    // All conditions must be met
    return rule.conditions.every((condition) => this.isConditionMet(condition, answers))
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

    // Sort rules by priority (highest first)
    const sortedRules = [...this.rules].sort((a, b) => b.priority - a.priority)

    // Find the first rule that applies
    for (const rule of sortedRules) {
      if (this.doesRuleApply(rule, answers)) {
        return {
          verdict: rule.verdict,
          message: rule.message,
          isImmediate: rule.verdict === 'immediate_no',
        }
      }
    }

    // Fallback if no rules match (shouldn't happen with a catch-all rule)
    return {
      verdict: 'conditional',
      message: 'Unable to determine compatibility. Please review your answers.',
      isImmediate: false,
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
