import { SiteSubmission, Submission } from '../types/submission'
import { Task } from '../types/task'

const toSubmission = (
  siteSubmissions: SiteSubmission,
  task: Task,
): Submission | null => {
  if (siteSubmissions.site === 'aoj') {
    return {
      taskId: task.id,
      score: siteSubmissions.score,
      isPerfectScore: !!siteSubmissions.score,
      timestamp: siteSubmissions.timestamp,
    }
  } else {
    if (task.atcoder?.taskIds) {
      const subTaskIndex = task.atcoder.taskIds.findIndex(
        (id) => id === siteSubmissions.problemId,
      )

      if (subTaskIndex === -1) return null

      return {
        taskId: task.id,
        subTaskIndex,
        score: siteSubmissions.score,
        isPerfectScore: false,
        timestamp: siteSubmissions.timestamp,
      }
    } else {
      const perfectScore = task.atcoder?.perfectScore ?? 100

      return {
        taskId: task.id,
        score: siteSubmissions.score,
        isPerfectScore: siteSubmissions.score === perfectScore,
        timestamp: siteSubmissions.timestamp,
      }
    }
  }
}

export const toSubmissions = (
  siteSubmissions: SiteSubmission[],
  tasks: Task[],
): Submission[] => {
  const atcoderDict = Object.fromEntries(
    tasks
      .map((task): [string, Task] | null =>
        task.atcoder
          ? [`${task.atcoder.contestId}/${task.atcoder.taskId}`, task]
          : null,
      )
      .filter((arg): arg is [string, Task] => Boolean(arg)),
  )

  const aojDict = Object.fromEntries(
    tasks
      .map((task): [string, Task] | null =>
        task.aoj ? [task.aoj.taskId, task] : null,
      )
      .filter((arg): arg is [string, Task] => Boolean(arg)),
  )

  return siteSubmissions
    .map((submission) => {
      const task =
        submission.site === 'aoj'
          ? aojDict[submission.problemId]
          : atcoderDict[`${submission.contestId}/${submission.problemId}`]

      if (!task) return null

      return toSubmission(submission, task)
    })
    .filter((arg: Submission | null): arg is Submission => Boolean(arg))
}
