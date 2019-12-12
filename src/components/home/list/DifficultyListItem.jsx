import React from 'react'
import c from 'classnames'
import { getAtCoderUrl, getAOJUrl } from '../../../utils/Url'
import levelColorStyle from '../../common/LevelColor.scss'
import styles from './DifficultyListItem.scss'

class DifficultyListItem extends React.Component {
  render() {
    const { task, isSolved, isSolvedByRival, hideLevel } = this.props
    const { level, name, atcoder, aoj, source } = task

    const atcoderUrl = getAtCoderUrl(atcoder.contest, atcoder.id)
    const aojUrl = getAOJUrl('JOI', aoj.classification, aoj.id)
    const notExist = !atcoderUrl && !aojUrl

    const displayLevel = !hideLevel ? level : 0

    const className =
      notExist ? styles.notExist :
        isSolved && isSolvedByRival ? styles.solvedByBoth :
          isSolved ? styles.solved :
            isSolvedByRival ? styles.solvedByRival : null

    return (
      <tr className={className}>
        <td className={c(levelColorStyle[`level${displayLevel}`], styles.level)}>
          {displayLevel !== 0 ? level : '?'}
        </td>
        <td className={styles.taskname}>
          <a href={atcoderUrl} target='_blank'>{name}</a>
        </td>
        <td className={styles.aojstar}>
          {aojUrl && (<a href={aojUrl} target='_blank'>★</a>)}
        </td>
        <td className={styles.source}>
          {source}
        </td>
      </tr >
    )
  }
}

export default DifficultyListItem