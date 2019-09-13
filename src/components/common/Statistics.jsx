import React from 'react'
import { Table } from 'react-bootstrap'
import levelColorStyles from '../common/LevelColor.scss'
import styles from './Statistics.scss'

class Statistics extends React.Component {
  render() {
    const { tasks = [], isSolved = {} } = this.props

    const levelList = [...[...Array(12).keys()].map(i => i + 1), 0, 'ALL']

    const taskCounter = {}
    const acCounter = {}

    for (const level of levelList) {
      taskCounter[level] = 0
      acCounter[level] = 0
    }

    for (const task of tasks) {
      if ((!task.atcoder || !task.atcoder.id) && (!task.aoj || !task.aoj.id)) {
        continue
      }

      taskCounter[task.level] += 1
      taskCounter['ALL'] += 1

      if (isSolved[task.id]) {
        acCounter[task.level] += 1
        acCounter['ALL'] += 1
      }
    }

    return (
      <Table responsive className={styles.self} size='sm'>
        <thead>
          <tr>
            {levelList.map(level => (
              <th key={level} className={levelColorStyles[`level${level}`]}>
                {level === 0 ? '?' : level}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {levelList.map(level => (
              <td key={level}>
                {acCounter[level]} / {taskCounter[level]}
              </td>
            ))}
          </tr>
          <tr>
            {levelList.map(level => (
              <td key={level}>
                {
                  taskCounter[level] ?
                    Math.floor(acCounter[level] / taskCounter[level] * 100) : '--'
                }％
                </td>
            ))}
          </tr>
        </tbody>
      </Table>
    )
  }
}

export default Statistics