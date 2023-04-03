import { SiteSubmission, Submission } from '../types/submission'
import { Task, TaskWithResult } from '../types/task'

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

export const mergeTaskAndSubmissions = (
  tasks: Task[] | TaskWithResult[],
  submissions: Submission[],
  rival: boolean = false,
): TaskWithResult[] => {
  type ResultsType = {
    [key: string]: { score: number | number[]; isPerfectScore: boolean }
  }

  const results: ResultsType = Object.fromEntries(
    tasks.map((task): [string, ResultsType[string]] => {
      const { atcoder, id } = task
      if (atcoder?.taskIds) {
        return [
          id,
          {
            score: new Array(atcoder.taskIds.length).fill(0),
            isPerfectScore: false,
          },
        ]
      }
      return [id, { score: 0, isPerfectScore: false }]
    }),
  )

  for (const submission of submissions) {
    const { taskId, subTaskIndex, score, isPerfectScore } = submission
    if (!Object.prototype.hasOwnProperty.call(results, taskId)) continue

    const targetScore = results[taskId].score

    if (subTaskIndex !== undefined) {
      if (Array.isArray(targetScore)) {
        targetScore[subTaskIndex] = Math.max(targetScore[subTaskIndex], score)
      } else {
        throw new Error('invalid data')
      }
    } else {
      if (typeof targetScore === 'number') {
        results[taskId].score = Math.max(targetScore, score)
        results[taskId].isPerfectScore ||= isPerfectScore
      } else {
        throw new Error('invalid data')
      }
    }
  }

  return tasks.map((task) => {
    const { id } = task
    const { score: resultScore, isPerfectScore } = results[id]
    const score: number = Array.isArray(resultScore)
      ? resultScore.reduce((sum, cur) => sum + cur, 0)
      : resultScore
    return {
      ...task,
      [!rival ? 'result' : 'rivalResult']: {
        score,
        isPerfectScore: isPerfectScore,
      },
    }
  })
}
