import { Heading } from '@chakra-ui/react'
import { HistoryForm } from '../components/forms/HistoryForm'
import { HistoryStatisticsList } from '../components/history/HistoryStatisticsList'

export const HistoryPage = () => {
  return (
    <div>
      <Heading as='h3' size='lg'>
        過去の記録
      </Heading>
      <HistoryForm />
      <HistoryStatisticsList />
    </div>
  )
}
