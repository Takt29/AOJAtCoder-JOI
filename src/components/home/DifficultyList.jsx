import React from 'react'
import { Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import DifficultyListItem from './list/DifficultyListItem'
import styles from './DifficultyList.scss'
import DifficultyListAccount from './list/DifficultyListAccount';

class DifficultyList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { sort: 'level' }
  }

  static SortableTh(props) {
    const { name, sort, children, onChange, ...other } = props

    const up = name && `-${name}` === sort
    const down = name && name === sort
    const onClick = () => {
      if (!onChange) return

      if (!down) onChange(name)
      else onChange(`-${name}`)
    }

    return (
      <th {...other} onClick={onClick}>
        {children}
        &nbsp;
        <FontAwesomeIcon
          icon={up ? faSortUp : down ? faSortDown : faSort}
        />
      </th>
    )
  }

  render() {
    const {
      myAccount, rivalAccount, tasks,
      isSolved, isSolvedByRival, filter: { hideFilter }
    } = this.props
    const { sort } = this.state

    const onChangeSort = sort => this.setState({ sort })

    const filteredTasks = tasks && tasks
      .filter(task => !hideFilter || !hideFilter.hideACTask || !isSolved[task.id])
      .filter(task => !hideFilter || !hideFilter.hideNotExistTask || task.atcoder.id || task.aoj.id)
      .sort((a, b) => {
        let key = sort
        if (!sort) return 0
        if (sort[0] == '-') {
          [a, b] = [b, a]
          key = sort.slice(1)
        }
        return a[key] < b[key] ? -1 : 1
      })

    return (
      <div>
        <DifficultyListAccount
          className={styles.account}
          myAccount={myAccount}
          rivalAccount={rivalAccount}
        />
        <Table size='sm'>
          <thead className={styles.header}>
            <tr>
              <DifficultyList.SortableTh
                name='level'
                sort={sort}
                onChange={onChangeSort}
              >
                難易度
            </DifficultyList.SortableTh>
              <th>問題名(AtCoder)</th>
              <th>AOJ</th>
              <DifficultyList.SortableTh
                name='id'
                sort={sort}
                onChange={onChangeSort}
              >
                出典
            </DifficultyList.SortableTh>
            </tr>
          </thead>
          <tbody>
            {filteredTasks && filteredTasks.map(task => (
              <DifficultyListItem
                key={task.id}
                task={task}
                isSolved={isSolved[task.id]}
                isSolvedByRival={isSolvedByRival[task.id]}
                hideLevel={hideFilter && hideFilter.hideLevel}
              />
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default DifficultyList