import { useMemo, VFC } from 'react'
import { Table } from 'react-bootstrap'
import { ColoredLevel } from '../common/ColoredLevel'
import styles from './Statistics.module.scss'

export const Statistics: VFC = () => {
  const levels: (number | 'ALL')[] = useMemo(
    () => [...new Array(12).fill(null).map((_, i) => i + 1), 0, 'ALL'],
    [],
  )

  return (
    <div className={styles.root}>
      <Table className={styles.table} responsive size='sm'>
        <thead>
          <tr>
            {levels.map((level) => (
              <ColoredLevel key={level} as='th' level={level} />
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {levels.map((level) => (
              <td key={level}>{'0 / 0'}</td>
            ))}
          </tr>
          <tr>
            {levels.map((level) => (
              <td key={level}>{'0 %'}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
