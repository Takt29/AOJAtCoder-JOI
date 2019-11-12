import axios from 'axios'

const getContestList = async () => {
  const res = await axios({
    method: 'get',
    url: './data/contests.json',
    responseType: 'json',
    timeout: 5000,
  }).catch(e => console.log(e))

  if (!res) return null

  const contests = res.data.map(contest => ({
    id: contest.id,
    name: contest.name,
    timestamp: (new Date(contest.timestamp)).getTime(),
  }))

  return contests
}

const applyFilter = (contests, solved) => {
  const filteredContests = [{
    id: '9999',
    name: '現在',
    timestamp: (new Date()).getTime(),
  },]

  if (!solved) return []

  const oldestTimestamp = solved.reduce((value, item) =>
    item.timestamp ? Math.min(item.timestamp, value) : value,
    (new Date()).getTime()
  )

  const currentTimestamp = (new Date()).getTime()

  for (const contest of contests) {
    if (contest.timestamp && contest.timestamp > oldestTimestamp && contest.timestamp <= currentTimestamp) {
      const copiedContest = Object.assign({}, contest)
      filteredContests.push(copiedContest)
    }
  }

  filteredContests.sort((a, b) => b.timestamp - a.timestamp)


  return filteredContests
}

export {
  getContestList,
  applyFilter,
}