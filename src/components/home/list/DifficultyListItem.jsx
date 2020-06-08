import React from 'react'
import c from 'classnames'
import { getAtCoderUrl, getAOJUrl } from '../../../utils/Url'
import levelColorStyle from '../../common/LevelColor.scss'
import styles from './DifficultyListItem.scss'

class DifficultyListItem extends React.Component {
  render() {
    const { task, isSolved, isSolvedByRival, hideLevel, score } = this.props
    const { level, name, atcoder, aoj, source, type, judge } = task

    const atcoderUrl = getAtCoderUrl(atcoder.contest, atcoder.id)
    const aojUrl = getAOJUrl('JOI', aoj.classification, aoj.id)

    const displayLevel = !hideLevel ? level : 0

    const className = !judge
      ? styles.notExist
      : isSolved && isSolvedByRival
      ? styles.solvedByBoth
      : isSolved
      ? styles.solved
      : isSolvedByRival
      ? styles.solvedByRival
      : null

    const getOutputOnlyStyle = (score) => {
      const border = Math.round(score)
      return {
        background: `linear-gradient(0deg,#E0EFF9 0%, #E0EFF9 ${border}%, white ${border}%, white 100%)`,
      }
    }

    const OutputOnlyStyle =
      type === 'OutputOnly' && !isSolved ? getOutputOnlyStyle(score) : null

    return (
      <tr className={className} style={OutputOnlyStyle}>
        <td
          className={c(levelColorStyle[`level${displayLevel}`], styles.level)}
        >
          {displayLevel !== 0 ? level : '?'}
        </td>
        <td className={styles.taskname}>
          <a href={atcoderUrl} target='_blank' rel='noreferrer'>
            {name}
          </a>
        </td>
        <td className={styles.aojstar}>
          {aojUrl && (
            <a href={aojUrl} target='_blank' rel='noreferrer'>
              ★
            </a>
          )}
        </td>
        <td className={styles.source}>{source}</td>
        <td className={styles.tasktype}>{type}</td>
      </tr>
    )
  }
}

export default DifficultyListItem
