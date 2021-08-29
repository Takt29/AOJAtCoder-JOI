import axios, { AxiosResponse } from 'axios'
import {
  AtcoderOriginalSubmission,
  AizuOnlineJudgeOriginalSubmission,
  AtcoderSubmission,
  AizuOnlineJudgeSubmission,
  SiteSubmission,
} from '../types/submission'

export const fetchAtCoderSubmissions = async (
  atcoderUserId: string | undefined,
): Promise<AtcoderOriginalSubmission[]> => {
  if (!atcoderUserId) return []

  const res: AxiosResponse<AtcoderOriginalSubmission[]> = await axios.get(
    'https://kenkoooo.com/atcoder/atcoder-api/results',
    {
      params: { user: atcoderUserId },
    },
  )
  return res.data
}

export const fetchAizuOnlineJudgeSubmissions = async (
  aojUserId: string | undefined,
): Promise<AizuOnlineJudgeOriginalSubmission[]> => {
  if (!aojUserId) return []

  const res: AxiosResponse<AizuOnlineJudgeOriginalSubmission[]> =
    await axios.get(
      `https://judgeapi.u-aizu.ac.jp/solutions/users/${aojUserId}`,
      {
        params: {
          size: 9999,
        },
      },
    )

  return res.data
}

export const fetchSiteSubmissions = async (
  atcoderUserId: string | undefined,
  aojUserId: string | undefined,
): Promise<SiteSubmission[]> => {
  const atcoderSubmissions = await fetchAtCoderSubmissions(atcoderUserId)
  const aojSubmissions = await fetchAizuOnlineJudgeSubmissions(aojUserId)

  return [
    ...atcoderSubmissions.map(
      (submission): AtcoderSubmission => ({
        site: 'atcoder',
        contestId: submission['contest_id'],
        problemId: submission['problem_id'],
        score: submission['point'],
        timestamp: submission['epoch_second'] * 1000,
      }),
    ),
    ...aojSubmissions.map(
      (submission): AizuOnlineJudgeSubmission => ({
        site: 'aoj',
        problemId: submission['problemId'],
        score: 1,
        timestamp: submission['judgeDate'],
      }),
    ),
  ]
}
