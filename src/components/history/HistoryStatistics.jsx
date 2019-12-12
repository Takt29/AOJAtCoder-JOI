import React from 'react'
import Statistics from '../common/Statistics'
import DownloadImageButton from '../common/DownloadImageButton'
import { formatDate } from '../../utils/Date'
import styles from './HistoryStatistics.scss'

class HistoryStatistics extends React.Component {
  constructor(props) {
    super(props)
    this.statistics = React.createRef()
  }

  render() {
    const { contest = {}, tasks = [], solvedList = [], downloadButton } = this.props

    const filteredTasks = tasks.filter(task => task.id < contest.id)

    const isSolved = {}
    if (solvedList) {
      for (const item of solvedList) {
        if (item.timestamp < contest.timestamp) {
          isSolved[item.id] = true
        }
      }
    }

    return (
      <div ref={this.statistics}>
        <h4 className={styles.name}>
          {contest.name}
          <span className={styles.timestamp}>
            {formatDate(contest.timestamp)}
          </span>

          {
            downloadButton && (
              <DownloadImageButton
                target={this.statistics.current}
                filename={`statistice_${contest.name}.png`}
                title={`統計画像ダウンロード(${contest.name})`}
              />
            )
          }
        </h4>
        <Statistics
          tasks={filteredTasks}
          isSolved={isSolved}
        />
      </div>
    )
  }
}

export default HistoryStatistics