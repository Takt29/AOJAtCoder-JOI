import axios from 'axios'

const getTaskList = async () => {
  const res = await axios({
    method: 'get',
    url: './data/tasks.json',
    responseType: 'json',
    timeout: 5000,
  })

  if (!res) return null

  const tasks = res.data.map(task => ({
    level: task.level,
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

export {
  getTaskList,
}