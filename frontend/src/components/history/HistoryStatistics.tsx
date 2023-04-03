import { VFC } from 'react'
import { Contest } from '../../types/contest'
import { Statistics } from '../statistics/Statistics'

type Props = {
  contest: Contest
}

export const HistoryStatistics: VFC<Props> = (props) => {
  const { contest } = props

  return (
    <div>
      <h4>{contest.name}</h4>
      <Statistics />
    </div>
  )
}
