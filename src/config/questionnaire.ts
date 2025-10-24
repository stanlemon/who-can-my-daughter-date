import type { QuestionnaireConfig } from '../types/questions'

/*
 * Weight System:
 * - Steelers: +10 (best team)
 * - Most teams: 0 (neutral)
 * - Browns/Ravens/Bengals: immediate disqualifier
 *
 * - Pineapple NO: +5 (good taste)
 * - Pineapple neutral: 0
 * - Pineapple YES: immediate disqualifier
 *
 * - Ketchup NO: +5 (good taste)
 * - Ketchup neutral: 0
 * - Ketchup YES: -8 (very bad)
 *
 * - Lutheran YES: +3
 * - Lutheran NO: 0
 *
 * Score ranges:
 * - 18-23: Excellent (Steelers + good food opinions + Lutheran)
 * - 10-17: Good/Approved
 * - 0-9: Conditional
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
  { value: 'steelers', label: 'Pittsburgh Steelers', weight: 10, tags: ['steelers'] },
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
        { value: 'no', label: 'No', weight: 5, tags: ['pineapple-no'] },
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
        { value: 'yes', label: 'Yes', weight: -8, tags: ['ketchup-yes'] },
        { value: 'no', label: 'No', weight: 5, tags: ['ketchup-no'] },
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
        { value: 'yes', label: 'Yes', weight: 3, tags: ['lutheran'] },
        { value: 'no', label: 'No', weight: 0, tags: ['not-lutheran'] },
      ],
    },
  ],

  scoreThresholds: {
    excellent: 18, // Steelers (10) + No pineapple (5) + No ketchup (5) + Lutheran (3) = 23
    good: 10, // Steelers (10) + good food opinions
    acceptable: 0, // Neutral answers
  },

  rules: [
    // Excellent score - perfect candidate
    {
      id: 'excellent-score',
      description: 'Excellent score - perfect match',
      minScore: 18,
      verdict: 'approved',
      message:
        'Outstanding! As a Lutheran Steelers fan with impeccable food opinions, they have my highest approval!',
      priority: 100,
    },

    // Good score - strong approval
    {
      id: 'good-score',
      description: 'Good score - approved',
      minScore: 10,
      verdict: 'approved',
      message:
        'As a Steelers fan with good taste in food, they stand a strong chance at approval.',
      priority: 90,
    },

    // Acceptable score - conditional approval
    {
      id: 'acceptable-score',
      description: 'Acceptable score but room for improvement',
      minScore: 0,
      maxScore: 9,
      verdict: 'conditional',
      message:
        'They have some redeeming qualities, but need to make improvements to be a strong candidate.',
      priority: 50,
    },

    // Negative score - rejected
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
