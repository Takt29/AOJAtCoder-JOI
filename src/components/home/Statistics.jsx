import React from 'react'
import { Badge, Table } from 'react-bootstrap'
import levelColorStyles from '../common/LevelColor.scss'
import styles from './Statistics.scss'

class Statistics extends React.Component {
  render() {
    const { account = {}, tasks, solved } = this.props

    const levelList = [...[...Array(12).keys()].map(i => i + 1), 0, 'ALL']

    return (
      <div>
        <Badge variant="success">
          {account.atcoder}/{account.aoj}
        </Badge>
        <Table responsive className={styles.self} size='sm'>
          <thead>
            <tr>
              {levelList.map(level => (
                <th className={levelColorStyles[`level${level}`]}>
                  {level}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {levelList.map(level => (
                <td>0 / 0</td>
              ))}
            </tr>
            <tr>
              {levelList.map(level => (
                <td>0％</td>
              ))}
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Statistics