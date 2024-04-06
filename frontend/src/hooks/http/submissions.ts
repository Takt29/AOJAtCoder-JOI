import { useQuery } from '@tanstack/react-query'
import { fetchSiteSubmissions } from '../../api/submission'

export const useSiteSubmissions = (
  atcoderUserId: string | undefined,
  aojUserId: string | undefined,
) =>
  useQuery({
    queryKey: ['fetchSiteSubmissions', atcoderUserId, aojUserId],
    queryFn: () => fetchSiteSubmissions(atcoderUserId, aojUserId),
  })
