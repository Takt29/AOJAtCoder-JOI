import React from 'react'
import { Table } from 'react-bootstrap'
import c from 'classnames'
import { getAtCoderUrl, getAOJUrl } from '../../utils/Url'
import styles from './DifficultyList.scss'

class DifficultyList extends React.Component {
  static Item(props) {
    const { task, isSolved } = props
    const { level, name, atcoder, aoj, source } = task

    const atcoderUrl = getAtCoderUrl(atcoder.contest, atcoder.id)
    const aojUrl = getAOJUrl('JOI', aoj.classification, aoj.id)
    const notExist = !atcoderUrl && !aojUrl

    if (notExist) console.log(task, styles.notexist)

    return (
      <tr className={notExist ? styles.notexist : isSolved ? styles.solved : null}>
        <td className={c(styles[`level${level}`], styles.level)}>
          {level}
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
    const { tasks, solves } = this.props

    return (
      <Table>
        <thead className={styles.header}>
          <tr>
            <th>難易度</th>
            <th>問題名(AtCoder)</th>
            <th>AOJ</th>
            <th>出典</th>
          </tr>
        </thead>
        <tbody>
          {tasks && tasks.map(task => (
            <DifficultyList.Item
              key={task.id}
              task={task}
              isSolved={false}
            />
          ))}
        </tbody>
      </Table>
    )
  }
}

export default DifficultyList