import { AxiosError } from 'axios'
import { useCallback, useMemo } from 'react'
import useSWR, { KeyedMutator, SWRResponse } from 'swr'
import { toSubmissions } from '../../helpers/submission'
import { fetchSiteSubmissions } from '../../repositories/submission'
import { SiteSubmission, Submission } from '../../types/submission'
import { useTasks } from './task'

export const useSiteSubmissions = (
  atcoderUserId: string | undefined,
  aojUserId: string | undefined,
): SWRResponse<SiteSubmission[], AxiosError> =>
  useSWR(['fetchSiteSubmissions', atcoderUserId, aojUserId], () =>
    fetchSiteSubmissions(atcoderUserId, aojUserId),
  )

export const useSubmissions = (
  atcoderUserId: string | undefined,
  aojUserId: string | undefined,
): SWRResponse<Submission[], AxiosError> => {
  const {
    mutate: tasksMutate,
    error: tasksError,
    isValidating: tasksIsValidating,
    isLoading: tasksIsLoading,
    data: tasks,
  } = useTasks()
  const {
    mutate: submissionsMutate,
    error: submissionsError,
    isValidating: submissionsIsValidating,
    isLoading: submissionsIsLoading,
    data: siteSubmissions,
  } = useSiteSubmissions(atcoderUserId, aojUserId)

  const mutate: KeyedMutator<Submission[]> = useCallback(
    async (data, shouldRevalidate) => {
      if (data) {
        throw new Error('unsupported data argument in mutate of useSubmissions')
      }
      if (
        shouldRevalidate !== undefined &&
        typeof shouldRevalidate !== 'boolean'
      ) {
        throw new Error(
          'unsupported shouldRevalidate argument in mutate of useSubmissions',
        )
      }

      await tasksMutate(data, shouldRevalidate)
      await submissionsMutate(data, shouldRevalidate)
      return data
    },
    [submissionsMutate, tasksMutate],
  )

  const error = useMemo(
    () => tasksError || submissionsError,
    [submissionsError, tasksError],
  )

  const isValidating = useMemo(
    () => tasksIsValidating || submissionsIsValidating,
    [submissionsIsValidating, tasksIsValidating],
  )

  const isLoading = useMemo(
    () => tasksIsLoading || submissionsIsLoading,
    [tasksIsLoading, submissionsIsLoading],
  )

  const submissions: Submission[] | undefined =
    siteSubmissions && tasks && toSubmissions(siteSubmissions, tasks)

  return { mutate, error, isValidating, isLoading, data: submissions }
}
