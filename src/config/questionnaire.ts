import type { QuestionnaireConfig } from '../types/questions'

/*
 * Weight System (out of 100 points):
 * - Steelers: +40 (best team)
 * - Most teams: 0 (neutral)
 * - Browns/Ravens/Bengals: immediate disqualifier
 *
 * - Pineapple NO: +25 (good taste)
 * - Pineapple neutral: 0
 * - Pineapple YES: immediate disqualifier
 *
 * - Ketchup NO: +25 (good taste)
 * - Ketchup neutral: 0
 * - Ketchup YES: -35 (very bad)
 *
 * - Lutheran YES: +10
 * - Lutheran NO: 0
 *
 * Perfect Score: 100 (Steelers + No pineapple + No ketchup + Lutheran)
 *
 * Score ranges:
 * - 80-100: Excellent/Outstanding
 * - 60-79: Good/Approved
 * - 30-59: Conditional
 * - 0-29: Needs major improvement
 * - Below 0: Rejected
 */

const NFL_TEAMS = [
  { value: '', label: 'Select a team...', weight: 0 },
  { value: 'cardinals', label: 'Arizona Cardinals', weight: 0 },
  { value: 'falcons', label: 'Atlanta Falcons', weight: 0 },
  { value: 'ravens', label: 'Baltimore Ravens', immediateDisqualifier: true, weight: -100 },
  { value: 'bills', label: 'Buffalo Bills', weight: 0 },
  { value: 'panthers', label: 'Carolina Panthers', weight: 0 },
  { value: 'bears', label: 'Chicago Bears', weight: 0 },
  { value: 'bengals', label: 'Cincinnati Bengals', immediateDisqualifier: true, weight: -100 },
  { value: 'browns', label: 'Cleveland Browns', immediateDisqualifier: true, weight: -100 },
  { value: 'cowboys', label: 'Dallas Cowboys', weight: 0 },
  { value: 'broncos', label: 'Denver Broncos', weight: 0 },
  { value: 'lions', label: 'Detroit Lions', weight: 0 },
  { value: 'packers', label: 'Green Bay Packers', weight: 0 },
  { value: 'texans', label: 'Houston Texans', weight: 0 },
  { value: 'colts', label: 'Indianapolis Colts', weight: 0 },
  { value: 'jaguars', label: 'Jacksonville Jaguars', weight: 0 },
  { value: 'chiefs', label: 'Kansas City Chiefs', weight: 0 },
  { value: 'raiders', label: 'Las Vegas Raiders', weight: 0 },
  { value: 'chargers', label: 'Los Angeles Chargers', weight: 0 },
  { value: 'rams', label: 'Los Angeles Rams', weight: 0 },
  { value: 'dolphins', label: 'Miami Dolphins', weight: 0 },
  { value: 'vikings', label: 'Minnesota Vikings', weight: 0 },
  { value: 'patriots', label: 'New England Patriots', weight: 0 },
  { value: 'saints', label: 'New Orleans Saints', weight: 0 },
  { value: 'giants', label: 'New York Giants', weight: 0 },
  { value: 'jets', label: 'New York Jets', weight: 0 },
  { value: 'eagles', label: 'Philadelphia Eagles', weight: 0 },
  { value: 'steelers', label: 'Pittsburgh Steelers', weight: 40, tags: ['steelers'] },
  { value: '49ers', label: 'San Francisco 49ers', weight: 0 },
  { value: 'seahawks', label: 'Seattle Seahawks', weight: 0 },
  { value: 'buccaneers', label: 'Tampa Bay Buccaneers', weight: 0 },
  { value: 'titans', label: 'Tennessee Titans', weight: 0 },
  { value: 'commanders', label: 'Washington Commanders', weight: 0 },
]

export const questionnaireConfig: QuestionnaireConfig = {
  questions: [
    {
      id: 'football_team',
      text: 'Their football team is',
      type: 'select',
      options: NFL_TEAMS,
    },
    {
      id: 'pineapple_pizza',
      text: 'Pineapple belongs on pizza',
      type: 'radio',
      options: [
        {
          value: 'yes',
          label: 'Yes',
          immediateDisqualifier: true,
          weight: -100,
          tags: ['pineapple-yes'],
        },
        { value: 'no', label: 'No', weight: 25, tags: ['pineapple-no'] },
        {
          value: 'can-live-without',
          label: 'I can live with never having it again',
          weight: 0,
          tags: ['pineapple-neutral'],
        },
      ],
    },
    {
      id: 'ketchup_hotdog',
      text: 'Ketchup belongs on a hot dog',
      type: 'radio',
      options: [
        { value: 'yes', label: 'Yes', weight: -35, tags: ['ketchup-yes'] },
        { value: 'no', label: 'No', weight: 25, tags: ['ketchup-no'] },
        {
          value: 'can-live-without',
          label: 'I can live with never having it again',
          weight: 0,
          tags: ['ketchup-neutral'],
        },
      ],
    },
    {
      id: 'lutheran',
      text: 'Are they Lutheran?',
      type: 'radio',
      options: [
        { value: 'yes', label: 'Yes', weight: 10, tags: ['lutheran'] },
        { value: 'no', label: 'No', weight: 0, tags: ['not-lutheran'] },
      ],
    },
  ],

  scoreThresholds: {
    excellent: 80, // Steelers (40) + No pineapple (25) + No ketchup (25) + Lutheran (10) = 100
    good: 60, // Strong approval threshold
    acceptable: 50, // Conditional approval threshold
  },

  rules: [
    // Perfect match - Lutheran Steelers fan with excellent food opinions (100 points)
    {
      id: 'perfect-match',
      description: 'Perfect Lutheran Steelers fan',
      conditions: [
        { questionId: 'football_team', value: 'steelers' },
        { questionId: 'pineapple_pizza', value: 'no' },
        { questionId: 'ketchup_hotdog', value: 'no' },
        { questionId: 'lutheran', value: 'yes' },
      ],
      verdict: 'approved',
      message:
        'Outstanding! As a Lutheran Steelers fan with impeccable food opinions, they have my highest approval!',
      priority: 100,
    },

    // Excellent Steelers fan - not Lutheran but great otherwise (90 points)
    {
      id: 'excellent-steelers',
      description: 'Steelers fan with excellent food opinions',
      conditions: [
        { questionId: 'football_team', value: 'steelers' },
        { questionId: 'pineapple_pizza', value: 'no' },
        { questionId: 'ketchup_hotdog', value: 'no' },
      ],
      verdict: 'approved',
      message:
        'As a Steelers fan with impeccable food opinions, they have my strong approval!',
      priority: 95,
    },

    // Good Steelers fan - one acceptable food opinion
    {
      id: 'good-steelers',
      description: 'Steelers fan with good taste',
      conditions: [{ questionId: 'football_team', minScore: 40 }], // Must be Steelers (40 points)
      minScore: 60, // And overall score 60+
      verdict: 'approved',
      message: 'As a Steelers fan with good taste, they stand a strong chance at approval.',
      priority: 90,
    },

    // Good food opinions, not a Steelers fan
    {
      id: 'good-food-opinions',
      description: 'Excellent food opinions compensate for team choice',
      conditions: [
        { questionId: 'pineapple_pizza', value: 'no' },
        { questionId: 'ketchup_hotdog', value: 'no' },
      ],
      minScore: 50, // 25+25 = 50
      verdict: 'conditional',
      message:
        'They have excellent food opinions, which is redeeming. The team choice could be better.',
      priority: 60,
    },

    // Acceptable score - some redeeming qualities (30-59)
    {
      id: 'acceptable-score',
      description: 'Acceptable score but room for improvement',
      minScore: 30,
      maxScore: 59,
      verdict: 'conditional',
      message:
        'They have some redeeming qualities, but need to make improvements to be a strong candidate.',
      priority: 50,
    },

    // Low positive score - needs major improvement (0-29)
    {
      id: 'low-score',
      description: 'Low score - needs improvement',
      minScore: 0,
      maxScore: 29,
      verdict: 'conditional',
      message:
        'Significant concerns about their choices. Major improvements needed to be considered.',
      priority: 45,
    },

    // Negative score - rejected (below 0)
    {
      id: 'negative-score',
      description: 'Below acceptable threshold',
      maxScore: -1,
      verdict: 'rejected',
      message:
        'Their questionable life choices (especially regarding hot dog condiments) are concerning. Major changes needed.',
      priority: 40,
    },

    // Catch-all fallback
    {
      id: 'default-fallback',
      description: 'Fallback rule',
      verdict: 'conditional',
      message: 'Evaluation complete. Review their answers carefully.',
      priority: 1,
    },
  ],
}
