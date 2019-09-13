import axios from 'axios'

const TASKTYPES = {
  BATCH: 'Batch',
  COMMUNICATION: 'Communication',
  OUTPUTONLY: 'OutputOnly',
}

const getTaskList = async () => {
  const res = await axios({
    method: 'get',
    url: './data/tasks.json',
    responseType: 'json',
    timeout: 5000,
  }).catch(e => console.log(e))

  if (!res) return null

  const tasks = res.data.map(task => ({
    level: parseInt(task.level),
    name: task.name,
    id: task.problem_id,
    atcoder: {
      contest: task.atcoder_contest,
      id: task.atcoder_id,
    },
    aoj: {
      source: 'JOI',
      classification: task.source && task.source.match(/予選/) ? 'Prelim' : 'Final',
      id: task.aoj_id,
    },
    source: task.source,
    type: task.tasktype,
  }))

  return tasks
}

const applyFilter = (tasks, filter) => {
  const { taskType, contestType, year, hideFilter } = filter

  const filteredTasks = tasks
    .filter(task => !taskType || taskType.batch || task.type !== TASKTYPES.BATCH)
    .filter(task => !taskType || taskType.communication || task.type !== TASKTYPES.COMMUNICATION)
    .filter(task => !taskType || taskType.outputOnly || task.type !== TASKTYPES.OUTPUTONLY)
    .filter(task => !contestType || contestType.prelim || !task.source.match(/予選/))
    .filter(task => !contestType || contestType.final || !task.source.match(/本選/))
    .filter(task => !contestType || contestType.springCamp || !task.source.match(/春合宿/))
    .filter(task => !contestType || contestType.open || !task.source.match(/Open/))
    .filter(task => !year || !parseInt(year.begin) || parseInt("20" + task.source.substr(0, 2)) >= year.begin)
    .filter(task => !year || !parseInt(year.end) || parseInt("20" + task.source.substr(0, 2)) <= year.end)
    .filter(task => !hideFilter || !hideFilter.hideNotExistTask || task.atcoder.id || task.aoj.id)

  return filteredTasks
}

export {
  getTaskList,
  applyFilter,
}