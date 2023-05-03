import axios, { AxiosResponse } from 'axios'
import { sleep, unique } from '../helpers/utils'
import { AizuOnlineJudgeOriginalSubmission } from '../types/submission'

/** AOJUserIdからその人の提出を全て取得する */
export const fetchAizuOnlineJudgeSubmissions = async (
  aojUserId: string,
): Promise<AizuOnlineJudgeOriginalSubmission[]> => {
  if (aojUserId.length === 0) return []

  const submissions = []

  for (let i = 0; ; i++) {
    const res = await fetchPartialAizuOnlineJudgeSubmissions(aojUserId, i, 9999)
    submissions.push(...res)

    if (res.length !== 9999) break

    await sleep(1000)
  }

  return unique(
    submissions,
    (submission: AizuOnlineJudgeOriginalSubmission) => submission.judgeId,
  )
}

const fetchPartialAizuOnlineJudgeSubmissions = async (
  aojUserId: string,
  page: number,
  size: number,
) => {
  const res: AxiosResponse<AizuOnlineJudgeOriginalSubmission[]> =
    await axios.get(
      `https://judgeapi.u-aizu.ac.jp/solutions/users/${aojUserId}`,
      {
        responseType: 'json',
        timeout: 5000,
        params: {
          size,
          page,
        },
      },
    )

  return res.data
}
