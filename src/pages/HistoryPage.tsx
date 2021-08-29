import { VFC } from 'react'
import { HistoryStatisticsList } from '../components/history/HistoryStatisticsList'

export const HistoryPage: VFC = () => {
  return (
    <div>
      <h3>過去の記録</h3>
      <HistoryStatisticsList />
    </div>
  )
}
