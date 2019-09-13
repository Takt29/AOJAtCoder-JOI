import React from 'react'
import Statistics from '../common/Statistics'
import { formatDate } from '../../utils/Date'
import styles from './HistoryStatistics.scss'

class HistoryStatistics extends React.Component {
  render() {
    const { contest = {}, tasks = [], solvedList = [] } = this.props

    const isSolved = {}
    if (solvedList) {
      for (const item of solvedList) {
        if (item.timestamp < contest.timestamp) {
          isSolved[item.id] = true
        }
      }
    }

    return (
      <div>
        <h4 className={styles.name}>
          {contest.name}
          <span className={styles.timestamp}>
            {formatDate(contest.timestamp)}
          </span>
        </h4>
        <Statistics
          tasks={tasks}
          isSolved={isSolved}
        />
      </div>
    )
  }
}

export default HistoryStatistics