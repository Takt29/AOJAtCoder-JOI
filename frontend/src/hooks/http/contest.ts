import { useQuery } from '@tanstack/react-query'
import { fetchContests } from '../../api/contest'

export const useContests = () =>
  useQuery({
    queryKey: ['contests'],
    queryFn: fetchContests,
    staleTime: 24 * 60 * 60 * 1000, // 1 day
  })
