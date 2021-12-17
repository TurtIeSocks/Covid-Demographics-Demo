export interface RacialGroups {
  Total: number
  White: number
  Black: number
  Asian: number
  Latinx: number
  AIAN: number
  NHPI: number
  Multiracial: number
  Other: number
}

export interface Data {
  date: number
  state: string
  cases: RacialGroups
  deaths: RacialGroups
  hospitalized: RacialGroups
  tests: RacialGroups
}

export interface Covid19 {
  country?: string
  cases?: number
  todayCases?: number
  deaths?: number
  todayDeaths?: number
  recovered?: number
  active?: number
  critical?: number
  casesPerOneMillion?: number
  deathsPerOneMillion?: number
  totalTests?: number
  testsPerOneMillion?: number
}

export interface DataChartProps {
  data: Data[]
  tab: string
  subTab: 'cases' | 'deaths' | 'hospitalized' | 'tests'
}
