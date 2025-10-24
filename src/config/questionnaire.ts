import type { QuestionnaireConfig } from '../types/questions'

const NFL_TEAMS = [
  { value: '', label: 'Select a team...' },
  { value: 'cardinals', label: 'Arizona Cardinals' },
  { value: 'falcons', label: 'Atlanta Falcons' },
  { value: 'ravens', label: 'Baltimore Ravens' },
  { value: 'bills', label: 'Buffalo Bills' },
  { value: 'panthers', label: 'Carolina Panthers' },
  { value: 'bears', label: 'Chicago Bears' },
  { value: 'bengals', label: 'Cincinnati Bengals' },
  { value: 'browns', label: 'Cleveland Browns', immediateDisqualifier: true },
  { value: 'cowboys', label: 'Dallas Cowboys' },
  { value: 'broncos', label: 'Denver Broncos' },
  { value: 'lions', label: 'Detroit Lions' },
  { value: 'packers', label: 'Green Bay Packers' },
  { value: 'texans', label: 'Houston Texans' },
  { value: 'colts', label: 'Indianapolis Colts' },
  { value: 'jaguars', label: 'Jacksonville Jaguars' },
  { value: 'chiefs', label: 'Kansas City Chiefs' },
  { value: 'raiders', label: 'Las Vegas Raiders' },
  { value: 'chargers', label: 'Los Angeles Chargers' },
  { value: 'rams', label: 'Los Angeles Rams' },
  { value: 'dolphins', label: 'Miami Dolphins' },
  { value: 'vikings', label: 'Minnesota Vikings' },
  { value: 'patriots', label: 'New England Patriots' },
  { value: 'saints', label: 'New Orleans Saints' },
  { value: 'giants', label: 'New York Giants' },
  { value: 'jets', label: 'New York Jets' },
  { value: 'eagles', label: 'Philadelphia Eagles' },
  { value: 'steelers', label: 'Pittsburgh Steelers', tags: ['steelers'] },
  { value: '49ers', label: 'San Francisco 49ers' },
  { value: 'seahawks', label: 'Seattle Seahawks' },
  { value: 'buccaneers', label: 'Tampa Bay Buccaneers' },
  { value: 'titans', label: 'Tennessee Titans' },
  { value: 'commanders', label: 'Washington Commanders' },
]

export const questionnaireConfig: QuestionnaireConfig = {
  questions: [
    {
      id: 'football_team',
      text: 'They root for ___ in football',
      type: 'select',
      options: NFL_TEAMS,
    },
    {
      id: 'pineapple_pizza',
      text: 'Pineapple belongs on pizza',
      type: 'radio',
      options: [
        { value: 'yes', label: 'Yes', immediateDisqualifier: true, tags: ['pineapple-yes'] },
        { value: 'no', label: 'No', tags: ['pineapple-no'] },
        {
          value: 'can-live-without',
          label: 'I can live with never having it again',
          tags: ['pineapple-neutral'],
        },
      ],
    },
    {
      id: 'ketchup_hotdog',
      text: 'Ketchup belongs on a hot dog',
      type: 'radio',
      options: [
        { value: 'yes', label: 'Yes', tags: ['ketchup-yes'] },
        { value: 'no', label: 'No', tags: ['ketchup-no'] },
        {
          value: 'can-live-without',
          label: 'I can live with never having it again',
          tags: ['ketchup-neutral'],
        },
      ],
    },
    {
      id: 'lutheran',
      text: 'Are they Lutheran?',
      type: 'radio',
      options: [
        { value: 'yes', label: 'Yes', tags: ['lutheran'] },
        { value: 'no', label: 'No', tags: ['not-lutheran'] },
      ],
    },
  ],

  rules: [
    // Combination rule: Steelers + pineapple + ketchup = NO
    {
      id: 'steelers-pineapple-ketchup',
      description: 'Steelers fan who likes both pineapple and ketchup',
      conditions: [
        { questionId: 'football_team', hasTag: 'steelers' },
        { questionId: 'pineapple_pizza', hasTag: 'pineapple-yes' },
        { questionId: 'ketchup_hotdog', hasTag: 'ketchup-yes' },
      ],
      verdict: 'rejected',
      message:
        'Even as a Steelers fan, liking both pineapple on pizza AND ketchup on hot dogs is unforgivable.',
      priority: 100, // High priority - check this before the "forgiveness" rule
    },

    // Combination rule: Steelers + pineapple might be forgiven
    {
      id: 'steelers-pineapple-forgiven',
      description: 'Steelers fan who likes pineapple but not ketchup',
      conditions: [
        { questionId: 'football_team', hasTag: 'steelers' },
        { questionId: 'pineapple_pizza', hasTag: 'pineapple-yes' },
        { questionId: 'ketchup_hotdog', hasTag: 'ketchup-no' },
      ],
      verdict: 'conditional',
      message:
        'As a Steelers fan, the pineapple pizza preference might be forgiven. They need to prove themselves in other ways.',
      priority: 90,
    },

    // Ketchup on hot dog alone is problematic
    {
      id: 'ketchup-yes',
      description: 'Likes ketchup on hot dogs',
      conditions: [{ questionId: 'ketchup_hotdog', hasTag: 'ketchup-yes' }],
      verdict: 'conditional',
      message:
        'Ketchup on hot dogs is questionable. They need to make major changes to be considered a viable candidate.',
      priority: 50,
    },

    // Perfect candidate
    {
      id: 'perfect-candidate',
      description: 'Steelers fan, no pineapple, no ketchup, Lutheran',
      conditions: [
        { questionId: 'football_team', hasTag: 'steelers' },
        { questionId: 'pineapple_pizza', hasTag: 'pineapple-no' },
        { questionId: 'ketchup_hotdog', hasTag: 'ketchup-no' },
        { questionId: 'lutheran', hasTag: 'lutheran' },
      ],
      verdict: 'approved',
      message:
        'As a Lutheran Steelers fan who does not like pineapple on pizza or ketchup on hot dogs, they have my full approval!',
      priority: 80,
    },

    // Good candidate - Steelers, no bad food takes
    {
      id: 'steelers-good-food-takes',
      description: 'Steelers fan with good food opinions',
      conditions: [
        { questionId: 'football_team', hasTag: 'steelers' },
        { questionId: 'pineapple_pizza', hasTag: 'pineapple-no' },
        { questionId: 'ketchup_hotdog', hasTag: 'ketchup-no' },
      ],
      verdict: 'approved',
      message:
        'As a Steelers fan who does not like pineapple on pizza or ketchup on hot dogs, they stand a chance at approval.',
      priority: 70,
    },

    // Default approval - no major red flags
    {
      id: 'default-approval',
      description: 'No major red flags',
      conditions: [
        { questionId: 'pineapple_pizza', hasTag: 'pineapple-no' },
        { questionId: 'ketchup_hotdog', hasTag: 'ketchup-no' },
      ],
      verdict: 'approved',
      message: 'No major red flags detected. They seem like a reasonable person.',
      priority: 10,
    },

    // Default conditional - some concerns
    {
      id: 'default-conditional',
      description: 'Some concerns but not disqualifying',
      conditions: [],
      verdict: 'conditional',
      message:
        'There are some concerns. They need to make changes to be considered a viable candidate.',
      priority: 1,
    },
  ],
}
