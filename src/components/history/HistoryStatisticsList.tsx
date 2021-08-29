import { VFC } from 'react'
import { fetchContests } from '../../repositories/contests'
import useSWRImmutable from 'swr/immutable'
import { HistoryStatistics } from './HistoryStatistics'

export const HistoryStatisticsList: VFC = () => {
  const { data: { data: contests } = {} } = useSWRImmutable(
    'fetchContests',
    () => fetchContests(),
  )

  return (
    <div>
      {(contests || []).map((contest) => (
        <HistoryStatistics key={contest.id} contest={contest} />
      ))}
    </div>
  )
}
