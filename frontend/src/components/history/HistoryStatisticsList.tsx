import { useContests } from '../../hooks/http/contest'
import { HistoryStatistics } from './HistoryStatistics'

export const HistoryStatisticsList = () => {
  const { data: contests } = useContests()

  return (
    <div>
      {(contests || []).map((contest) => (
        <HistoryStatistics key={contest.id} contest={contest} />
      ))}
    </div>
  )
}
