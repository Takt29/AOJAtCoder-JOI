import { Task, TaskFilter } from '../types/task'

export const filterTask = (tasks: Task[], filter: TaskFilter): Task[] => {
  const { taskType, contestType, year, hideFilter } = filter

  return tasks.filter((task) => {
    let ng: boolean = false

    // Task Type
    ng ||= !taskType.batch && task.type === 'Batch'
    ng ||= !taskType.communication && task.type === 'Communication'
    ng ||= !taskType.outputOnly && task.type === 'OutputOnly'

    // Contest Type
    ng ||= !contestType.prelim1 && /一次予選/.test(task.source)
    ng ||= !contestType.prelim2 && /二次予選|[^次]予選/.test(task.source)
    ng ||= !contestType.final && /本選/.test(task.source)
    ng ||= !contestType.spring && /(^|[^G])(春合宿|春トレ)/.test(task.source)
    ng ||= !contestType.open && /Open/.test(task.source)
    ng ||= !contestType.joig && /JOIG($|[^春])/.test(task.source)
    ng ||= !contestType.joigSpring && /JOIG春/.test(task.source)

    // Year
    const sourceYear = parseInt('20' + task.source.substr(0, 2))
    ng ||= sourceYear < year.begin
    ng ||= year.end < sourceYear

    // Hide Filter
    ng ||=
      hideFilter.notExistTask && !(task.aoj?.taskId || task.atcoder?.taskId)

    return !ng
  })
}
