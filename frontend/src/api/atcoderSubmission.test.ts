import { AtcoderOriginalSubmission } from '../types/submission'
import { fetchPartialAtCoderSubmissions } from './atcoderSubmission'

test.runIf(import.meta.env.VITE_TEST_ALL)(
  '取得したデータの型が正しいか',
  async () => {
    const submissions = await fetchPartialAtCoderSubmissions('goodbaton', 0)

    expect(submissions.length).toBeGreaterThan(0)
    expectTypeOf(submissions).toEqualTypeOf<AtcoderOriginalSubmission[]>()
  },
)
