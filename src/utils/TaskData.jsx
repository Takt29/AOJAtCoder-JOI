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
  }).catch((e) => console.log(e))

  if (!res) return null

  const tasks = res.data.map((task) => ({
    level: parseInt(task.level),
    name: task.name,
    id: task.problem_id,
    atcoder: {
      contest: task.atcoder_contest,
      id: task.atcoder_id || task.atcoder_ids?.[0],
      ids: task.atcoder_ids,
      perfect_score: Number(task.atcoder_perfect_score || '100'),
    },
    aoj: {
      source: 'JOI',
      classification:
        task.source && task.source.match(/予選/) ? 'Prelim' : 'Final',
      id: task.aoj_id,
    },
    source: task.source,
    type: task.tasktype,
    judge:
      (task.atcoder_contest && (task.atcoder_id || task.atcoder_ids?.length)) ||
      task.aoj_id,
  }))

  return tasks
}

const applyFilter = (tasks, filter) => {
  const { taskType, contestType, year, hideFilter } = filter

  const filteredTasks = tasks
    .filter(
      (task) => !taskType || taskType.batch || task.type !== TASKTYPES.BATCH,
    )
    .filter(
      (task) =>
        !taskType ||
        taskType.communication ||
        task.type !== TASKTYPES.COMMUNICATION,
    )
    .filter(
      (task) =>
        !taskType || taskType.outputOnly || task.type !== TASKTYPES.OUTPUTONLY,
    )
    .filter(
      (task) =>
        !contestType || contestType.prelim1 || !task.source.match(/一次予選/),
    )
    .filter(
      (task) =>
        !contestType ||
        contestType.prelim2 ||
        !task.source.match(/二次予選|[^次]予選/),
    )
    .filter(
      (task) => !contestType || contestType.final || !task.source.match(/本選/),
    )
    .filter(
      (task) =>
        !contestType || contestType.springCamp || !task.source.match(/[^G](春合宿|春トレ)/),
    )
    .filter(
      (task) => !contestType || contestType.open || !task.source.match(/Open/),
    )
    .filter(
      (task) => !contestType || contestType.joig || !task.source.match(/JOIG[^春]/),
    )
    .filter(
      (task) => !contestType || contestType.joigSpring || !task.source.match(/JOIG春/),
    )
    .filter(
      (task) =>
        !year ||
        !parseInt(year.begin) ||
        parseInt('20' + task.source.substr(0, 2)) >= year.begin,
    )
    .filter(
      (task) =>
        !year ||
        !parseInt(year.end) ||
        parseInt('20' + task.source.substr(0, 2)) <= year.end,
    )
    .filter(
      (task) =>
        !hideFilter ||
        !hideFilter.hideNotExistTask ||
        task.atcoder.id ||
        task.aoj.id,
    )

  return filteredTasks
}

export { getTaskList, applyFilter }
