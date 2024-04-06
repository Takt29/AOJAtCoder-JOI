import { Task, TaskFilter } from '../types/task'

export const filterTask = (tasks: Task[], filter: TaskFilter): Task[] => {
  const { taskType, contestType, year, hideFilter, level } = filter

  return tasks.filter((task) => {
    let isMatch: boolean = true

    // Task Type
    isMatch &&= taskType.batch || task.type !== 'Batch'
    isMatch &&= taskType.communication || task.type !== 'Communication'
    isMatch &&= taskType.outputOnly || task.type !== 'OutputOnly'

    // // Contest Type
    isMatch &&= contestType.prelim1 || !/一次予選/.test(task.source)
    isMatch &&= contestType.prelim2 || !/二次予選|[^次]予選/.test(task.source)
    isMatch &&= contestType.final || !/本選/.test(task.source)
    isMatch &&=
      contestType.spring || !/(^|[^G])(春合宿|春トレ)/.test(task.source)
    isMatch &&= contestType.open || !/Open/.test(task.source)
    isMatch &&= contestType.joig || !/JOIG($|[^春])/.test(task.source)
    isMatch &&= contestType.joigSpring || !/JOIG春/.test(task.source)

    // // Year
    const sourceYear = parseInt('20' + task.source.substr(0, 2))
    isMatch &&= year.begin <= sourceYear
    isMatch &&= sourceYear <= year.end

    // // Level
    if (level.min !== undefined || level.max !== undefined) {
      isMatch &&= task.level !== 0
      isMatch &&= level.min === undefined || level.min <= task.level
      isMatch &&= level.max === undefined || task.level <= level.max
    }

    // // Hide Filter
    isMatch &&=
      !hideFilter.notExistTask || !!task.aoj?.taskId || !!task.atcoder?.taskId

    return isMatch
  })
}
