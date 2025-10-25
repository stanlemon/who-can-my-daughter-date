import type { QuestionnaireConfig, AnswerOption } from '../types/questions'

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

const NFL_TEAMS: AnswerOption[] = [
  { value: '', label: 'Select a team...', weight: 0, color: 'default' },
  { value: 'cardinals', label: 'Arizona Cardinals', weight: 0, color: 'orange' },
  { value: 'falcons', label: 'Atlanta Falcons', weight: 0, color: 'orange' },
  {
    value: 'ravens',
    label: 'Baltimore Ravens',
    immediateDisqualifier: true,
    weight: -100,
    color: 'red',
  },
  { value: 'bills', label: 'Buffalo Bills', weight: 5, color: 'yellow' },
  { value: 'panthers', label: 'Carolina Panthers', weight: 0, color: 'orange' },
  { value: 'bears', label: 'Chicago Bears', weight: 0, color: 'orange' },
  {
    value: 'bengals',
    label: 'Cincinnati Bengals',
    immediateDisqualifier: true,
    weight: -100,
    color: 'red',
  },
  {
    value: 'browns',
    label: 'Cleveland Browns',
    immediateDisqualifier: true,
    weight: -100,
    color: 'red',
  },
  { value: 'cowboys', label: 'Dallas Cowboys', weight: -60, color: 'orange' },
  { value: 'broncos', label: 'Denver Broncos', weight: 0, color: 'orange' },
  { value: 'lions', label: 'Detroit Lions', weight: 30, color: 'yellow' },
  { value: 'packers', label: 'Green Bay Packers', weight: -10, color: 'orange' },
  { value: 'texans', label: 'Houston Texans', weight: 0, color: 'orange' },
  { value: 'colts', label: 'Indianapolis Colts', weight: 10, color: 'yellow' },
  { value: 'jaguars', label: 'Jacksonville Jaguars', weight: 0, color: 'orange' },
  { value: 'chiefs', label: 'Kansas City Chiefs', weight: 0, color: 'orange' },
  { value: 'raiders', label: 'Las Vegas Raiders', weight: -50, color: 'orange' },
  { value: 'chargers', label: 'Los Angeles Chargers', weight: 0, color: 'orange' },
  { value: 'rams', label: 'Los Angeles Rams', weight: 0, color: 'orange' },
  { value: 'dolphins', label: 'Miami Dolphins', weight: 0, color: 'orange' },
  { value: 'vikings', label: 'Minnesota Vikings', weight: 0, color: 'orange' },
  { value: 'patriots', label: 'New England Patriots', weight: 0, color: 'orange' },
  { value: 'saints', label: 'New Orleans Saints', weight: 0, color: 'orange' },
  { value: 'giants', label: 'New York Giants', weight: 0, color: 'orange' },
  { value: 'jets', label: 'New York Jets', weight: 0, color: 'orange' },
  { value: 'eagles', label: 'Philadelphia Eagles', weight: 0, color: 'orange' },
  {
    value: 'steelers',
    label: 'Pittsburgh Steelers',
    weight: 40,
    tags: ['steelers'],
    color: 'green',
  },
  { value: '49ers', label: 'San Francisco 49ers', weight: 0, color: 'orange' },
  { value: 'seahawks', label: 'Seattle Seahawks', weight: 0, color: 'orange' },
  { value: 'buccaneers', label: 'Tampa Bay Buccaneers', weight: 0, color: 'orange' },
  { value: 'titans', label: 'Tennessee Titans', weight: 0, color: 'orange' },
  { value: 'commanders', label: 'Washington Commanders', weight: 0, color: 'orange' },
]

export const questionnaireConfig: QuestionnaireConfig = {
  questions: [
    {
      id: 'football_team',
      text: 'Their football team is',
      type: 'select',
      options: NFL_TEAMS,
      emoji: '🏈',
    },
    {
      id: 'pineapple_pizza',
      text: 'They think pineapple belongs on pizza',
      type: 'radio',
      options: [
        {
          value: 'yes',
          label: 'Yes',
          immediateDisqualifier: true,
          weight: -100,
          tags: ['pineapple-yes'],
          color: 'red',
        },
        { value: 'no', label: 'No', weight: 25, tags: ['pineapple-no'], color: 'green' },
        {
          value: 'can-live-without',
          label: 'They can live with never having it again',
          weight: 0,
          tags: ['pineapple-neutral'],
          color: 'yellow',
        },
      ],
      emoji: '🍕',
    },
    {
      id: 'ketchup_hotdog',
      text: 'They think ketchup belongs on a hot dog',
      type: 'radio',
      options: [
        { value: 'yes', label: 'Yes', weight: -35, tags: ['ketchup-yes'], color: 'red' },
        { value: 'no', label: 'No', weight: 25, tags: ['ketchup-no'], color: 'green' },
        {
          value: 'can-live-without',
          label: 'They can live with never having it again',
          weight: 0,
          tags: ['ketchup-neutral'],
          color: 'yellow',
        },
      ],
      emoji: '🌭',
    },
    {
      id: 'lutheran',
      text: 'They are Lutheran',
      type: 'radio',
      options: [
        { value: 'yes', label: 'Yes', weight: 10, tags: ['lutheran'], color: 'green' },
        { value: 'no', label: 'No', weight: 0, tags: ['not-lutheran'], color: 'yellow' },
      ],
      emoji: '⛪',
    },
    {
      id: 'lotr',
      text: 'They have read Lord of the Rings',
      type: 'radio',
      options: [
        {
          value: 'yes-second-breakfast',
          label: 'Yes, and my second breakfast was delicious',
          weight: 35,
          tags: ['lotr-superfan'],
          color: 'green',
        },
        { value: 'yes', label: 'Yes', weight: 30, tags: ['lotr-read'], color: 'yellow' },
        {
          value: 'movie-directors-cut',
          label: "No, but I saw the director's cut movie",
          weight: 10,
          tags: ['lotr-movie'],
          color: 'yellow',
        },
        {
          value: 'sauron',
          label: 'I am Sauron',
          weight: -5,
          tags: ['lotr-villain'],
          color: 'orange',
        },
        { value: 'no', label: 'No', weight: -10, tags: ['lotr-no'], color: 'red' },
        { value: 'huh', label: 'Huh?', weight: -15, tags: ['lotr-unaware'], color: 'red' },
      ],
      emoji: '📚',
    },
  ],

  scoreThresholds: {
    excellent: 80, // Strong approval threshold
    good: 60, // Good approval threshold
    acceptable: 50, // Conditional approval threshold
    // Perfect score: Steelers (40) + No pineapple (25) + No ketchup (25) + Lutheran (10) + LOTR superfan (15) = 115
  },

  rules: [
    // Perfect match - Lutheran Steelers fan with excellent food opinions + LOTR superfan
    {
      id: 'perfect-match-lotr-superfan',
      description: 'Perfect Lutheran Steelers fan + LOTR superfan',
      conditions: [
        { questionId: 'football_team', value: 'steelers' },
        { questionId: 'pineapple_pizza', value: 'no' },
        { questionId: 'ketchup_hotdog', value: 'no' },
        { questionId: 'lutheran', value: 'yes' },
        { questionId: 'lotr', value: 'yes-second-breakfast' },
      ],
      verdict: 'approved',
      message:
        'Absolutely outstanding! A Lutheran Steelers fan with impeccable food opinions AND a true scholar of Middle-earth. My highest approval!',
      emoji: '💯',
      priority: 101,
    },

    // Perfect match - Lutheran Steelers fan with excellent food opinions + LOTR reader
    {
      id: 'perfect-match-lotr-reader',
      description: 'Perfect Lutheran Steelers fan + LOTR reader',
      conditions: [
        { questionId: 'football_team', value: 'steelers' },
        { questionId: 'pineapple_pizza', value: 'no' },
        { questionId: 'ketchup_hotdog', value: 'no' },
        { questionId: 'lutheran', value: 'yes' },
        { questionId: 'lotr', value: 'yes' },
      ],
      verdict: 'approved',
      message:
        'Outstanding! A Lutheran Steelers fan with impeccable food opinions and excellent literary taste. They have my highest approval!',
      emoji: '💯',
      priority: 100.5,
    },

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
      emoji: '💯',
      priority: 100,
    },

    // Excellent Steelers fan + LOTR superfan
    {
      id: 'excellent-steelers-lotr-superfan',
      description: 'Steelers fan with excellent food opinions + LOTR superfan',
      conditions: [
        { questionId: 'football_team', value: 'steelers' },
        { questionId: 'pineapple_pizza', value: 'no' },
        { questionId: 'ketchup_hotdog', value: 'no' },
        { questionId: 'lutheran', value: 'no' },
        { questionId: 'lotr', value: 'yes-second-breakfast' },
      ],
      verdict: 'approved',
      message:
        "A Steelers fan with impeccable food opinions and a true scholar of Middle-earth! My strong approval! We'll convert them to Lutheranism before they join the family.",
      emoji: '⭐',
      priority: 96,
    },

    // Excellent Steelers fan + LOTR reader
    {
      id: 'excellent-steelers-lotr-reader',
      description: 'Steelers fan with excellent food opinions + LOTR reader',
      conditions: [
        { questionId: 'football_team', value: 'steelers' },
        { questionId: 'pineapple_pizza', value: 'no' },
        { questionId: 'ketchup_hotdog', value: 'no' },
        { questionId: 'lutheran', value: 'no' },
        { questionId: 'lotr', value: 'yes' },
      ],
      verdict: 'approved',
      message:
        "A Steelers fan with impeccable food opinions and excellent literary taste! My strong approval! We'll convert them before they join the family.",
      emoji: '⭐',
      priority: 95.5,
    },

    // Excellent Steelers fan - not Lutheran but great otherwise (90 points)
    {
      id: 'excellent-steelers',
      description: 'Steelers fan with excellent food opinions',
      conditions: [
        { questionId: 'football_team', value: 'steelers' },
        { questionId: 'pineapple_pizza', value: 'no' },
        { questionId: 'ketchup_hotdog', value: 'no' },
        { questionId: 'lutheran', value: 'no' },
      ],
      verdict: 'approved',
      message:
        "As a Steelers fan with impeccable food opinions, they have my strong approval! We'll convert them before they join the family.",
      emoji: '⭐',
      priority: 95,
    },

    // Lutheran + perfect food + LOTR superfan
    {
      id: 'lutheran-perfect-food-lotr-superfan',
      description: 'Lutheran with impeccable food opinions + LOTR superfan',
      conditions: [
        { questionId: 'pineapple_pizza', value: 'no' },
        { questionId: 'ketchup_hotdog', value: 'no' },
        { questionId: 'lutheran', value: 'yes' },
        { questionId: 'lotr', value: 'yes-second-breakfast' },
      ],
      minScore: 60,
      verdict: 'approved',
      message:
        "A Lutheran with impeccable food opinions and a true scholar of Middle-earth! They can join the family! We'll work on converting them to Steelers fans.",
      emoji: '✝️',
      priority: 86,
    },

    // Lutheran + perfect food + LOTR reader
    {
      id: 'lutheran-perfect-food-lotr-reader',
      description: 'Lutheran with impeccable food opinions + LOTR reader',
      conditions: [
        { questionId: 'pineapple_pizza', value: 'no' },
        { questionId: 'ketchup_hotdog', value: 'no' },
        { questionId: 'lutheran', value: 'yes' },
        { questionId: 'lotr', value: 'yes' },
      ],
      minScore: 60,
      verdict: 'approved',
      message:
        "A Lutheran with impeccable food opinions and excellent literary taste! They can join the family! We'll work on converting them to Steelers fans.",
      emoji: '✝️',
      priority: 85.5,
    },

    // Perfect food opinions and Lutheran, just need to convert to Steelers
    {
      id: 'lutheran-perfect-food',
      description: 'Lutheran with impeccable food opinions - Steelers conversion needed',
      conditions: [
        { questionId: 'pineapple_pizza', value: 'no' },
        { questionId: 'ketchup_hotdog', value: 'no' },
        { questionId: 'lutheran', value: 'yes' },
      ],
      minScore: 60, // 25+25+10 = 60 (food + Lutheran, any non-disqualifying team)
      verdict: 'approved',
      message:
        "As a Lutheran with impeccable food opinions, they can join the family! We'll work on converting them to Steelers fans.",
      emoji: '✝️',
      priority: 85,
    },

    // LOTR superfan with good overall score
    {
      id: 'lotr-superfan',
      description: 'LOTR superfan with strong overall score',
      conditions: [{ questionId: 'lotr', value: 'yes-second-breakfast' }],
      minScore: 60,
      verdict: 'approved',
      message:
        'A true scholar and person of culture! Their love of second breakfast and strong character make them worthy.',
      emoji: '📖',
      priority: 75,
    },

    // LOTR reader with good score
    {
      id: 'lotr-reader',
      description: 'LOTR reader with good score',
      conditions: [{ questionId: 'lotr', value: 'yes' }],
      minScore: 55,
      verdict: 'approved',
      message:
        'They have read the books and made other good choices. A person of taste and wisdom!',
      emoji: '📚',
      priority: 70,
    },

    // Good food opinions, not Lutheran and not a Steelers fan
    {
      id: 'good-food-opinions',
      description: 'Excellent food opinions, room for spiritual and team improvement',
      conditions: [
        { questionId: 'pineapple_pizza', value: 'no' },
        { questionId: 'ketchup_hotdog', value: 'no' },
      ],
      minScore: 50, // 25+25 = 50
      verdict: 'conditional',
      message:
        'They have excellent food opinions, which is redeeming. The team choice could be better.',
      emoji: '👍',
      priority: 55,
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
      emoji: '🤔',
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
      emoji: '😬',
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
      emoji: '🚫',
      priority: 40,
    },

    // Catch-all fallback
    {
      id: 'default-fallback',
      description: 'Fallback rule',
      verdict: 'conditional',
      message: 'They could be worse.',
      emoji: '🤷',
      priority: 1,
    },
  ],
}
