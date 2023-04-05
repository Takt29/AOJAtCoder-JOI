import { HistoryForm } from '../components/forms/HistoryForm'
import { HistoryStatisticsList } from '../components/history/HistoryStatisticsList'

export const HistoryPage = () => {
  return (
    <div>
      <h3>過去の記録</h3>
      <HistoryForm />
      <HistoryStatisticsList />
    </div>
  )
}
