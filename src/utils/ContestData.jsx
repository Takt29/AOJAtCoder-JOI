import axios from './axios-cache'

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

const applyFilter = (contests, solved, input) => {
  const { tableContestType: contestType } = input
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
    .filter(contest => !contestType || contestType.prelim1 || !contest.name.match(/一次予選/))
    .filter(contest => !contestType || contestType.prelim2 || !contest.name.match(/二次予選|[^次]予選/))
    .filter(contest => !contestType || contestType.final || !contest.name.match(/本選/))
    .filter(contest => !contestType || contestType.springCamp || !contest.name.match(/春合宿/))
}

export {
  getContestList,
  applyFilter,
}