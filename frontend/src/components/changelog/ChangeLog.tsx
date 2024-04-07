import { createColumnHelper, TableFeature } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useChangeLog } from '../../hooks/http/changeLog'
import { ChangeLogRecord } from '../../types/changeLog'
import { useTasks } from '../../hooks/http/task'
import { Task } from '../../types/task'
import { getAtcoderUrl } from '../../helpers/url'
import { ExternalLink } from '../common/ExternalLink'
import { DataTable } from '../common/DataTable'
import { TableContainer } from '@chakra-ui/react'

export const ChangeLog = () => {
  const { data: originalChangelog } = useChangeLog()
  const { data: tasks } = useTasks()

  const changelog = useMemo(
    () =>
      tasks &&
      originalChangelog?.map((original) => ({
        ...original,
        task: tasks.find((task) => task.id === original.taskId),
      })),
    [originalChangelog, tasks],
  )

  if (!changelog) {
    return null
  }

  return (
    <TableContainer>
      <DataTable
        size='sm'
        data={changelog}
        columns={columns}
        _features={changelogTableFeatures}
      />
    </TableContainer>
  )
}

const columnHelper = createColumnHelper<
  ChangeLogRecord & { task: Task | undefined }
>()
const columns = [
  columnHelper.accessor('oldLevel', {
    id: 'oldLevel',
    header: '変更前',
    cell: (info) => info.getValue() || '?',
    meta: {
      textAlign: 'center',
    },
  }),
  columnHelper.accessor('newLevel', {
    id: 'newLevel',
    header: '変更後',
    cell: (info) => info.getValue() || '?',
    meta: {
      textAlign: 'center',
    },
  }),
  columnHelper.accessor('task', {
    header: '問題名(AtCoder)',
    cell: (info) => {
      const task = info.getValue()
      const url = task && getAtcoderUrl(task)
      const name = task?.name
      return url ? <ExternalLink href={url}>{name}</ExternalLink> : name
    },
    enableSorting: false,
  }),
  columnHelper.accessor('updatedAt', {
    header: '更新日時',
    cell: (info) => info.getValue(),
  }),
]

const changelogTableFeatures: TableFeature<
  ChangeLogRecord & { task: Task | undefined }
>[] = [
  {
    createCell: (cell, _, row) => {
      if (cell.column.id === 'oldLevel') {
        const { oldLevel } = row.original
        cell.custom = {
          ...cell.custom,
          color: `level-text.${oldLevel}`,
          backgroundColor: `level-background.${oldLevel}`,
        }
      }
      if (cell.column.id === 'newLevel') {
        const { newLevel } = row.original
        cell.custom = {
          ...cell.custom,
          color: `level-text.${newLevel}`,
          backgroundColor: `level-background.${newLevel}`,
        }
      }
    },
  },
]
