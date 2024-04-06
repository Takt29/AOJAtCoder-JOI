import { fetchChangeLog } from '../../api/changeLog'
import { useQuery } from '@tanstack/react-query'

export const useChangeLog = () =>
  useQuery({
    queryKey: ['changelog'],
    queryFn: fetchChangeLog,
    staleTime: 24 * 60 * 60 * 1000, // 1 day
  })
