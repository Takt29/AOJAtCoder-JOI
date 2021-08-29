import { VFC } from 'react'
import { HistoryStatistics } from './HistoryStatistics'
import { useContests } from '../../hooks/http/contest'

export const HistoryStatisticsList: VFC = () => {
  const { data: contests } = useContests()

  return (
    <div>
      {(contests || []).map((contest) => (
        <HistoryStatistics key={contest.id} contest={contest} />
      ))}
    </div>
  )
}
