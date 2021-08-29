import { VFC } from 'react'
import { Contest } from '../../types/contest'

type Props = {
  contest: Contest
}

export const HistoryStatistics: VFC<Props> = (props) => {
  const { contest } = props

  return (
    <div>
      <h4>{contest.name}</h4>
    </div>
  )
}
