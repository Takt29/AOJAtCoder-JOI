const getAtCoderUrl = (contest, id) => {
  if (!contest || !id) return null
  else return `https://atcoder.jp/contests/${contest}/tasks/${id}`
}

const getAOJUrl = (contest, classification, id) => {
  if (!id) {
    return null
  } else {
    contest = contest || 'XXX'
    classification = classification || 'XXX'
    return `https://onlinejudge.u-aizu.ac.jp/challenges/sources/${contest}/${classification}/${id}`
  }
}

export { getAtCoderUrl, getAOJUrl }
