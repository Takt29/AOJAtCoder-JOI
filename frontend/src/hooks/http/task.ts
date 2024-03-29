import { AxiosError } from 'axios'
import { SWRResponse } from 'swr'
import useSWRImmutable from 'swr/immutable'
import { fetchTasks } from '../../api/task'
import { Task } from '../../types/task'

export const useTasks = (): SWRResponse<Task[], AxiosError> =>
  useSWRImmutable('fetchTasks', () => fetchTasks())
