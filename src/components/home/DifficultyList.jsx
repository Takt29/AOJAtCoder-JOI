import React from 'react'
import { Table } from 'react-bootstrap'
import c from 'classnames'
import { getAtCoderUrl, getAOJUrl } from '../../utils/Url'
import levelColorStyle from '../common/LevelColor.scss'
import styles from './DifficultyList.scss'

class DifficultyList extends React.Component {
  static Item(props) {
    const { task, isSolved, hideLevel } = props
    const { level, name, atcoder, aoj, source } = task

    const atcoderUrl = getAtCoderUrl(atcoder.contest, atcoder.id)
    const aojUrl = getAOJUrl('JOI', aoj.classification, aoj.id)
    const notExist = !atcoderUrl && !aojUrl

    const displayLevel = !hideLevel ? level : '0'

    return (
      <tr className={notExist ? styles.notexist : isSolved ? styles.solved : null}>
        <td className={c(levelColorStyle[`level${displayLevel}`], styles.level)}>
          {displayLevel !== '0' ? level : '?'}
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

  render() {
    const { tasks, isSolved, filter: { hideFilter } } = this.props

    const filteredTasks = tasks && tasks
      .filter(task => !hideFilter || !hideFilter.hideACTask || !isSolved[task.id])
      .filter(task => !hideFilter || !hideFilter.hideNotExistTask || task.atcoder.id || task.aoj.id)

    return (
      <Table size='sm'>
        <thead className={styles.header}>
          <tr>
            <th>難易度</th>
            <th>問題名(AtCoder)</th>
            <th>AOJ</th>
            <th>出典</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks && filteredTasks.map(task => (
            <DifficultyList.Item
              key={task.id}
              task={task}
              isSolved={isSolved[task.id]}
              hideLevel={hideFilter && hideFilter.hideLevel}
            />
          ))}
        </tbody>
      </Table>
    )
  }
}

export default DifficultyList