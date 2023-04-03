import { Task } from '../types/task'

export const getAizuOnlineJudgeUrl = (task: Task): string | null => {
  const { aoj: { taskId } = {} } = task
  if (taskId) {
    return `https://onlinejudge.u-aizu.ac.jp/problems/${taskId}`
  } else {
    return null
  }
}

export const getAtcoderUrl = (task: Task): string | null => {
  const { atcoder: { taskId, contestId } = {} } = task
  if (contestId) {
    return `https://atcoder.jp/contests/${contestId}/tasks/${taskId}`
  } else {
    return null
  }
}
