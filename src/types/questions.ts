export type QuestionType = 'select' | 'radio'

export interface AnswerOption {
  value: string
  label: string
  // If true, this answer immediately disqualifies the candidate
  immediateDisqualifier?: boolean
  // Tags for use in combination rules
  tags?: string[]
}

export interface Question {
  id: string
  text: string
  type: QuestionType
  options: AnswerOption[]
}

export type UserAnswers = Map<string, string>

export type VerdictType = 'approved' | 'conditional' | 'rejected' | 'immediate_no'

export interface EvaluationResult {
  verdict: VerdictType
  message: string
  isImmediate: boolean
}

export interface RuleCondition {
  questionId: string
  value?: string // Match specific value
  hasTag?: string // Or match by tag
}

export interface EvaluationRule {
  id: string
  description: string
  // All conditions must be met for this rule to apply
  conditions: RuleCondition[]
  verdict: VerdictType
  message: string
  // Higher priority rules are evaluated first
  priority: number
}

export interface QuestionnaireConfig {
  questions: Question[]
  rules: EvaluationRule[]
}
