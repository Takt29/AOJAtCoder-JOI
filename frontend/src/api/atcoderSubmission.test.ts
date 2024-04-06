import { AtcoderOriginalSubmission } from '../types/submission'
import { fetchPartialAtCoderSubmissions } from './atcoderSubmission'

// @ts-expect-error https://github.com/vitest-dev/vitest/blob/6797b0412ba41e27645c10e962e44ae111018ec7/docs/guide/testing-types.md?plain=1#L17
test.runIf(import.meta.env.VITE_TEST_ALL)(
  '取得したデータの型が正しいか',
  async () => {
    const submissions = await fetchPartialAtCoderSubmissions('goodbaton', 0)

    expect(submissions.length).toBeGreaterThan(0)
    expectTypeOf(submissions).toEqualTypeOf<AtcoderOriginalSubmission[]>()
  },
)
