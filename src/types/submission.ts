import { Task } from './task'

type AtcoderSubmissionResult = string

export type AtcoderOriginalSubmission = {
  id: number
  epoch_second: number
  problem_id: string
  contest_id: string
  user_id: string
  language: string
  point: number
  length: number
  result: AtcoderSubmissionResult
  execution_time: number
}

export type AizuOnlineJudgeOriginalSubmission = {
  judgeId: number
  userId: string
  problemId: string
  language: string
  version: string
  submissionDate: number
  judgeDate: number
  cpuTime: number
  memory: number
  codeSize: number
  server: number
  policy: string
  rating: number
  review: number
}

export type AtcoderSubmission = {
  site: 'atcoder'
  contestId: string
  problemId: string
  score: number
  timestamp: number //msec
}

export type AizuOnlineJudgeSubmission = {
  site: 'aoj'
  problemId: string
  score: number // 0 or 1
  timestamp: number //msec
}

export type SiteSubmission = AtcoderSubmission | AizuOnlineJudgeSubmission

export type Submission = {
  taskId: Task['id']
  subTaskIndex?: number // OutputOnly用
  score: number
  isPerfectScore: boolean
  timestamp: number // msec
}
