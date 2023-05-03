import { AxiosError } from 'axios'
import { SWRResponse } from 'swr'
import useSWRImmutable from 'swr/immutable'
import { fetchContests } from '../../api/contest'
import { Contest } from '../../types/contest'

export const useContests = (): SWRResponse<Contest[], AxiosError> =>
  useSWRImmutable('fetchContests', () => fetchContests())
