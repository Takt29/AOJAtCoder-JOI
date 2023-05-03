import { fetchAizuOnlineJudgeSubmissions } from './aojSubmission'
import { AizuOnlineJudgeOriginalSubmission } from '../types/submission'

test.runIf(import.meta.env.VITE_TEST_ALL)(
  '取得したデータの型が正しいか',
  async () => {
    const submissions = await fetchAizuOnlineJudgeSubmissions('TKT29')

    expect(submissions.length).toBeGreaterThan(0)
    expectTypeOf(submissions).toEqualTypeOf<
      AizuOnlineJudgeOriginalSubmission[]
    >()
  },
)
