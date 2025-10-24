export type QuestionType = 'select' | 'radio'

export interface AnswerOption {
  value: string
  label: string
  // If true, this answer immediately disqualifies the candidate
  immediateDisqualifier?: boolean
  // Numeric weight for this answer (can be positive or negative)
  // Higher weights are better, negative weights are red flags
  weight?: number
  // Tags for use in combination rules (kept for compatibility/additional logic)
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
  score: number // Total calculated score
}

export interface RuleCondition {
  questionId: string
  value?: string // Match specific value (exact match)
  hasTag?: string // Or match by tag
  minScore?: number // Or match if this question's answer has score >= minScore
  maxScore?: number // Or match if this question's answer has score <= maxScore
}

export interface EvaluationRule {
  id: string
  description: string
  // All conditions must be met for this rule to apply (optional - for complex logic)
  conditions?: RuleCondition[]
  verdict: VerdictType
  message: string
  // Higher priority rules are evaluated first
  priority: number
  // Weight-based thresholds
  minScore?: number // Rule applies if score >= minScore
  maxScore?: number // Rule applies if score <= maxScore
}

export interface QuestionnaireConfig {
  questions: Question[]
  rules: EvaluationRule[]
  // Optional: Define score ranges for verdicts
  scoreThresholds?: {
    excellent: number // Score >= this is excellent
    good: number // Score >= this is good
    acceptable: number // Score >= this is acceptable
    // Below acceptable is problematic
  }
}
