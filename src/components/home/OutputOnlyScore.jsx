import React from 'react'
import styles from './OutputOnlyScore.scss'

class OutputOnlyScoreSum extends React.Component {
  render() {
    const { tasks = [], score } = this.props

    if (!score) return null

    let sumScore = 0
    let maxScore = 0

    for (const task of tasks) {
      if (task.type === 'OutputOnly' && task.judge) {
        console.log(task, score[task.id])
        sumScore += score[task.id] ?? 0
        maxScore += 100
      }
    }

    if (maxScore === 0) return null

    return (
      <div className={styles.self}>
        <span className={styles.title}>{'OutputOnlyScore:'}</span>
        <div className={styles.score}>
          <span className={styles.sum}>{sumScore.toFixed(2)}</span>
          {'/'}
          <span className={styles.max}>{maxScore}</span>
        </div>
      </div>
    )
  }
}

export default OutputOnlyScoreSum
