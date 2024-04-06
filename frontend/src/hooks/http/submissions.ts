import { fetchSiteSubmissions } from '../../api/submission'
import { useQuery } from '@tanstack/react-query'

export const useSiteSubmissions = (
  atcoderUserId: string | undefined,
  aojUserId: string | undefined,
) =>
  useQuery({
    queryKey: ['fetchSiteSubmissions', atcoderUserId, aojUserId],
    queryFn: () => fetchSiteSubmissions(atcoderUserId, aojUserId),
  })
