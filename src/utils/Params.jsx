import qs from 'query-string'

const DefaultParams = {
  myAccount: {
    atcoder: '',
    aoj: '',
  },
  rivalAccount: {
    atcoder: '',
    aoj: '',
  },
  taskType: {
    batch: true,
    communication: true,
    outputOnly: false,
  },
  hideFilter: {
    hideACTask: false,
    hideNotExistTask: false,
    hideLevel: false,
  },
  contestType: {
    prelim1: true,
    prelim2: true,
    final: true,
    springCamp: true,
    open: false,
  },
  year: {
    begin: '2007',
    end: 'latest',
  },
}

const cleanup = (obj) => {
  const res = {}
  for (const key in obj) {
    if (obj[key]) {
      res[key] = obj[key]
    }
  }
  return res
}

const parseParams = (search = '') => {
  const params = qs.parse(search, {parseBooleans: true})

  const { atcoder_id, aoj_id, rival_atcoder_id, rival_aoj_id } = params

  const { batch, communication, outputOnly } = params
  const { hideACTask, hideNotExsitTask, hideLevel } = params
  const { prelim1, prelim2, final, springCamp, open } = params
  const { begin, end } = params

  const res = {
    myAccount: {
      atcoder: atcoder_id ?? DefaultParams.myAccount.atcoder,
      aoj: aoj_id ?? DefaultParams.myAccount.aoj,
    },
    rivalAccount: {
      atcoder: rival_atcoder_id ?? DefaultParams.rivalAccount.atcoder,
      aoj: rival_aoj_id ?? DefaultParams.rivalAccount.aoj,
    },
    taskType: {
      batch: batch ?? DefaultParams.taskType.batch,
      communication: communication ?? DefaultParams.taskType.communication,
      outputOnly: outputOnly ?? DefaultParams.taskType.outputOnly,
    },
    hideFilter: {
      hideACTask: hideACTask ?? DefaultParams.hideFilter.hideACTask,
      hideNotExsitTask: hideNotExsitTask ?? DefaultParams.hideFilter.hideNotExsitTask,
      hideLevel: hideLevel ?? DefaultParams.hideFilter.hideLevel,
    },
    contestType: {
      prelim1: prelim1 ?? DefaultParams.contestType.prelim1,
      prelim2: prelim2 ?? DefaultParams.contestType.prelim2,
      final: final ?? DefaultParams.contestType.final,
      springCamp: springCamp ?? DefaultParams.contestType.springCamp,
      open: open ?? DefaultParams.contestType.open,
    },
    year: {
      begin: begin ?? DefaultParams.year.begin,
      end: end ?? DefaultParams.year.end,
    },
  }

  return res
}

const createParams = ({ myAccount, rivalAccount, taskType, hideFilter, contestType, year } = {}) => {
  const params = {}

  if (myAccount) {
    if (myAccount.atcoder) params.atcoder_id = myAccount.atcoder
    if (myAccount.aoj) params.aoj_id = myAccount.aoj
  }

  if (rivalAccount) {
    if (rivalAccount.atcoder) params.rival_atcoder_id = rivalAccount.atcoder
    if (rivalAccount.aoj) params.rival_aoj_id = rivalAccount.aoj
  }


  return qs.stringify({
    ...params,
    ...taskType,
    ...hideFilter,
    ...contestType,
    ...year,
  })
}

export { parseParams, createParams }
