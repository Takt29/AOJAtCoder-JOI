import axios from './axios-cache'

const getSubmissions = async (tasks, { atcoder, aoj } = {}) => {
  const atcoderRes = await getAtCoderSubmissions(tasks, atcoder)
  const aojRes = await getAOJSubmissions(tasks, aoj)

  return {
    success: { aoj: aojRes.success, atcoder: atcoderRes.success },
    res: atcoderRes.list.concat(aojRes.list),
  }
}

const getAtCoderProblemIdDict = (tasks) => {
  const dict = {}

  for (const task of tasks) {
    if (task.atcoder) {
      if (task.atcoder.id) {
        dict[task.atcoder.id] = task
      }
      if (task.atcoder.ids) {
        for (const id of task.atcoder.ids) {
          dict[id] = task
        }
      }
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

const getAtCoderSubmissions = async (tasks, id) => {
  if (!id) return { success: true, list: [] }

  const res = await axios({
    method: 'get',
    url: 'https://kenkoooo.com/atcoder/atcoder-api/results',
    responseType: 'json',
    timeout: 15000,
    params: {
      user: id,
    },
  }).catch((e) => console.log(e))

  if (!res) return { success: false, list: [] }

  const dict = getAtCoderProblemIdDict(tasks)

  const list = res.data
    .filter((item) => dict[item.problem_id])
    .map((item) => ({
      id: dict[item.problem_id].id,
      atcoder_problem_id: item.problem_id,
      isPerfectScore:
        Math.round(item.point * 10) ===
        dict[item.problem_id].atcoder.perfect_score * 10,
      score: item.point,
      timestamp: item.epoch_second * 1000, //msec
    }))

  return { success: true, list }
}

const getAOJSubmissions = async (tasks, id) => {
  if (!id) return { success: true, list: [] }

  const res = await axios({
    method: 'get',
    url: `https://judgeapi.u-aizu.ac.jp/solutions/users/${id}`,
    responseType: 'json',
    timeout: 3000,
    params: {
      size: 9999,
    },
  }).catch((e) => console.log(e))

  if (!res) return { success: false, list: [] }

  const dict = getAOJProblemIdDict(tasks)

  const list = res.data
    .filter((item) => dict[item.problemId])
    .map((item) => ({
      id: dict[item.problemId].id,
      isPerfectScore: true,
      score: 1,
      timestamp: item.submissionDate, //msec
    }))

  return { success: true, list }
}

export { getSubmissions }
