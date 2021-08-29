import { VFC } from 'react'
import { Table } from 'react-bootstrap'
import { useChangeLog } from '../../hooks/http/changeLog'
import { useTasks } from '../../hooks/http/task'
import styles from './ChangeLog.module.scss'
import { ChangeLogItem } from './ChangeLogItem'

export const ChangeLog: VFC = () => {
  const { data: changelog } = useChangeLog()

  return (
    <Table className={styles.root} size='sm' responsive>
      <thead>
        <th>変更前</th>
        <th>変更後</th>
        <th>問題</th>
        <th>更新日</th>
      </thead>
      <tbody>
        {(changelog || []).map((item, i) => (
          <ChangeLogItem key={i} record={item} />
        ))}
      </tbody>
    </Table>
  )
}
