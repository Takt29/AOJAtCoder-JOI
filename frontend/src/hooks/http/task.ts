import { useQuery } from '@tanstack/react-query'
import { fetchTasks } from '../../api/task'

export const useTasks = () =>
  useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    staleTime: 24 * 60 * 60 * 1000, // 1 day
  })
