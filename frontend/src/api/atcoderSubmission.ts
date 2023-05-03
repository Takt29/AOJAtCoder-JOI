import axios, { AxiosResponse } from 'axios'
import { AtcoderOriginalSubmission } from '../types/submission'
import { sleep, unique } from 'src/helpers/utils'
import {
  loadAtcoderSubmissionsFromCache,
  saveAtcoderSubmissionsToCache,
} from './atcoderSubmissionsCache'

/** AtCoder提出取得時にキャッシュと重複して取得する秒数 */
const BUFFER_SECONDS = 60 * 60 * 24

const getMaxEpochSecond = (submissions: AtcoderOriginalSubmission[]) =>
  submissions.reduce((a, b) => (a.epoch_second > b.epoch_second ? a : b))
    .epoch_second

/** AtCoderUserIdからその人の提出を全て取得する */
export const fetchAtCoderSubmissions = async (
  atcoderUserId: string,
): Promise<AtcoderOriginalSubmission[]> => {
  if (atcoderUserId.length === 0) return []

  const cachedSubmissions = await loadAtcoderSubmissionsFromCache(atcoderUserId)

  const lastSubmissionsSecond =
    cachedSubmissions.length > 0 ? getMaxEpochSecond(cachedSubmissions) : 0

  let fromSecond = Math.max(0, lastSubmissionsSecond - BUFFER_SECONDS)

  const fetchedSubmissions: AtcoderOriginalSubmission[] = []

  for (;;) {
    const res = await fetchPartialAtCoderSubmissions(atcoderUserId, fromSecond)
    if (!res || res.length === 0) break

    fetchedSubmissions.push(...res)
    fromSecond = getMaxEpochSecond(res) + 1

    await sleep(1000)
  }

  saveAtcoderSubmissionsToCache(atcoderUserId, fetchedSubmissions)

  return unique(
    [...fetchedSubmissions, ...cachedSubmissions],
    (submission) => submission.id,
  )
}

/** UnixTimeがfromSecond以降の提出を取得する最大500件取得する */
export const fetchPartialAtCoderSubmissions = async (
  atcoderUserId: string,
  fromSecond: number,
) => {
  const res: AxiosResponse<AtcoderOriginalSubmission[]> = await axios.get(
    'https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions',
    {
      responseType: 'json',
      timeout: 5000,
      params: {
        user: atcoderUserId,
        from_second: fromSecond,
      },
    },
  )

  return res.data
}
