import React from 'react'
import { Badge } from 'react-bootstrap'
import Statistics from '../common/Statistics'
import OutputOnlyScore from './OutputOnlyScore'

class HomeStatistics extends React.Component {
  render() {
    const {
      account = {},
      tasks = [],
      isSolved = [],
      variant,
      score,
    } = this.props

    return (
      <div>
        <h5>
          <Badge variant={variant || 'success'}>
            {account.atcoder}/{account.aoj}
          </Badge>
        </h5>
        <Statistics tasks={tasks} isSolved={isSolved} />
        <OutputOnlyScore tasks={tasks} score={score} />
      </div>
    )
  }
}

export default HomeStatistics
