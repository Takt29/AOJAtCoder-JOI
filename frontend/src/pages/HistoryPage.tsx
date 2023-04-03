import { VFC } from 'react'
import { HistoryForm } from '../components/forms/HistoryForm'
import { HistoryStatisticsList } from '../components/history/HistoryStatisticsList'

export const HistoryPage: VFC = () => {
  return (
    <div>
      <h3>過去の記録</h3>
      <HistoryForm />
      <HistoryStatisticsList />
    </div>
  )
}
