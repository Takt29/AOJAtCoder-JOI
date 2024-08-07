export type AccountData = {
  atcoder: string
  aoj: string
}

export type TaskTypeData = {
  batch: boolean
  communication: boolean
  outputOnly: boolean
}

export type HideFilterData = {
  solvedTask: boolean
  notExistTask: boolean
  level: boolean
}

export type ContestTypeData = {
  prelim1: boolean
  prelim2: boolean
  final: boolean
  spring: boolean
  joig: boolean
  joigSpring: boolean
  open: boolean
}

export type YearData = {
  begin: number
  end: number
}

export type LevelData = {
  min: number | undefined
  max: number | undefined
}
