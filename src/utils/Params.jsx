import qs from 'query-string'

const parseParams = (search = '') => {
  console.log(search)
  const params = qs.parse(search)

  const { atcoder_id, aoj_id, rival_atcoder_id, rival_aoj_id } = params

  const res = {
    myAccount: { atcoder: '', aoj: '' },
    rivalAccount: { atcoder: '', aoj: '' },
  }

  if (atcoder_id) res.myAccount.atcoder = atcoder_id
  if (aoj_id) res.myAccount.aoj = aoj_id
  if (rival_atcoder_id) res.rivalAccount.atcoder = rival_atcoder_id
  if (rival_aoj_id) res.rivalAccount.aoj = rival_aoj_id

  return res
}

const createParams = ({ myAccount, rivalAccount } = {}) => {
  const params = {}

  if (myAccount) {
    if (myAccount.atcoder) params.atcoder_id = myAccount.atcoder
    if (myAccount.aoj) params.aoj_id = myAccount.aoj
  }

  if (rivalAccount) {
    if (rivalAccount.atcoder) params.rival_atcoder_id = rivalAccount.atcoder
    if (rivalAccount.aoj) params.rival_aoj_id = rivalAccount.aoj
  }

  return qs.stringify(params)
}

export {
  parseParams,
  createParams,
}