import React from 'react'
import { Table } from 'react-bootstrap'
import c from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { getAtCoderUrl, getAOJUrl } from '../../utils/Url'
import levelColorStyle from '../common/LevelColor.scss'
import styles from './DifficultyList.scss'

class DifficultyList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { sort: 'level' }
  }

  static Item(props) {
    const { task, isSolved, hideLevel } = props
    const { level, name, atcoder, aoj, source } = task

    const atcoderUrl = getAtCoderUrl(atcoder.contest, atcoder.id)
    const aojUrl = getAOJUrl('JOI', aoj.classification, aoj.id)
    const notExist = !atcoderUrl && !aojUrl

    const displayLevel = !hideLevel ? level : 0

    return (
      <tr className={notExist ? styles.notexist : isSolved ? styles.solved : null}>
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
    const { tasks, isSolved, filter: { hideFilter } } = this.props
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