export type TaskType = 'Batch' | 'Communication' | 'OutputOnly'

export type Task = {
  id: string
  level: number
  name: string
  source: string
  type: TaskType
  atcoder?: {
    contestId: string
    taskId?: string
    taskIds?: string[]
    perfectScore?: number
  }
  aoj?: {
    taskId: string
  }
}
