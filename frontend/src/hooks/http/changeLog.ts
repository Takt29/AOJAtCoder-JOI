import { AxiosError } from 'axios'
import { SWRResponse } from 'swr'
import useSWRImmutable from 'swr/immutable'
import { fetchChangeLog } from '../../repositories/changeLog'
import { ChangeLogRecord } from '../../types/changeLog'

export const useChangeLog = (): SWRResponse<ChangeLogRecord[], AxiosError> =>
  useSWRImmutable('fetchChangeLog', () => fetchChangeLog())
