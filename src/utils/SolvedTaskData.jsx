import axios from './axios-cache'

const getSolvedTaskList = async (tasks, { atcoder, aoj } = {}) => {
  const atcoderRes = await getAtCoderSolvedTaskList(tasks, atcoder)
  const aojRes = await getAOJSolvedTaskList(tasks, aoj)

  return {
    success: { aoj: aojRes.success, atcoder: atcoderRes.success },
    res: atcoderRes.list.concat(aojRes.list)
  }
}

const getAtCoderProblemIdDict = (tasks) => {
  const dict = {}

  for (const task of tasks) {
    if (task.atcoder && task.atcoder.id) {
      dict[task.atcoder.id] = task
    }
  }

  return dict
}

const getAOJProblemIdDict = (tasks) => {
  const dict = {}

  for (const task of tasks) {
    if (task.aoj && task.aoj.id) {
      dict[task.aoj.id] = task
    }
  }

  return dict
}

const getAtCoderSolvedTaskList = async (tasks, id) => {
  if (!id) return { success: false, list: [] }

  const res = await axios({
    method: 'get',
    url: 'https://kenkoooo.com/atcoder/atcoder-api/results',
    responseType: 'json',
    timeout: 15000,
    params: {
      user: id,
    },
  }).catch(e => console.log(e))

  if (!res) return { success: false, list: [] }

  const dict = getAtCoderProblemIdDict(tasks)

  const list = res.data
    .filter(item => item.result === 'AC')
    .filter(item => Math.round(item.point) === 100)
    .filter(item => dict[item.problem_id])
    .map(item => ({
      id: dict[item.problem_id].id,
      timestamp: item.epoch_second * 1000, //msec
    }))

  return { success: true, list }
}

const getAOJSolvedTaskList = async (tasks, id) => {
  if (!id) return { success: false, list: [] }

  const res = await axios({
    method: 'get',
    url: `https://judgeapi.u-aizu.ac.jp/solutions/users/${id}`,
    responseType: 'json',
    timeout: 3000,
    params: {
      size: 9999
    },
  }).catch(e => console.log(e))

  console.log(await axios.cache)

  if (!res) return { success: false, list: [] }

  const dict = getAOJProblemIdDict(tasks)

  const list = res.data
    .filter(item => dict[item.problemId])
    .map(item => ({
      id: dict[item.problemId].id,
      timestamp: item.submissionDate, //msec
    }))

  return { success: true, list }
}

export {
  getSolvedTaskList,
}