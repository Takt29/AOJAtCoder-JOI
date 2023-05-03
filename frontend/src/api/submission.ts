import {
  AtcoderSubmission,
  AizuOnlineJudgeSubmission,
  SiteSubmission,
} from '../types/submission'
import { fetchAizuOnlineJudgeSubmissions } from './aojSubmission'
import { fetchAtCoderSubmissions } from './atcoderSubmission'

export const fetchSiteSubmissions = async (
  atcoderUserId: string | undefined,
  aojUserId: string | undefined,
): Promise<SiteSubmission[]> => {
  const atcoderSubmissions = await fetchAtCoderSubmissions(atcoderUserId ?? '')
  const aojSubmissions = await fetchAizuOnlineJudgeSubmissions(aojUserId ?? '')

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
