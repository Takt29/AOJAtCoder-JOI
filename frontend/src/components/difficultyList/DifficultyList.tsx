import { useMemo } from 'react'
import { createColumnHelper, TableFeature } from '@tanstack/react-table'
import { match } from 'ts-pattern'
import { TableContainer } from '@chakra-ui/react'
import { useTasks } from '../../hooks/http/task'
import { mergeTaskAndSubmissions } from '../../helpers/submission'
import { TaskFilter, TaskWithResult } from '../../types/task'
import { filterTask } from '../../helpers/task'
import { Submission } from '../../types/submission'
import { ExternalLink } from '../common/ExternalLink'
import { DataTable } from '../common/DataTable'
import { getAizuOnlineJudgeUrl, getAtcoderUrl } from '../../helpers/url'

type Props = {
  submissions?: Submission[]
  rivalSubmissions?: Submission[]
  taskFilter?: TaskFilter
}

export const DifficultyList = (props: Props) => {
  const { submissions, rivalSubmissions, taskFilter } = props

  const { data: tasks } = useTasks()

  const filteredTasks = useMemo(
    () => (taskFilter ? filterTask(tasks || [], taskFilter) : tasks || []),
    [tasks, taskFilter],
  )

  const tasksWithResult = useMemo(() => {
    const A = mergeTaskAndSubmissions(filteredTasks, submissions || [])
    const B = mergeTaskAndSubmissions(A, rivalSubmissions || [], true)
    return B
  }, [rivalSubmissions, submissions, filteredTasks])

  return (
    <TableContainer>
      <DataTable
        size={'sm'}
        data={tasksWithResult}
        columns={columns}
        _features={difficultyListTableFeatures}
      />
    </TableContainer>
  )
}

const columnHelper = createColumnHelper<TaskWithResult>()

const columns = [
  columnHelper.accessor('level', {
    id: 'level',
    header: '難易度',
    cell: (info) => info.getValue() || '?',
    meta: {
      textAlign: 'center',
    },
  }),
  columnHelper.accessor('name', {
    header: '問題名(AtCoder)',
    cell: (info) => {
      const url = getAtcoderUrl(info.row.original)
      const name = info.getValue()
      return url ? <ExternalLink href={url}>{name}</ExternalLink> : name
    },
    enableSorting: false,
  }),
  columnHelper.accessor('aoj', {
    header: 'AOJ',
    cell: (info) => {
      const url = getAizuOnlineJudgeUrl(info.row.original)
      return url ? <ExternalLink href={url}>★</ExternalLink> : ''
    },
    enableSorting: false,
    meta: {
      textAlign: 'center',
    },
  }),
  columnHelper.accessor('source', {
    header: '出典',
    cell: (info) => info.getValue(),
    sortingFn: ({ original: dataA }, { original: dataB }) =>
      dataA.id < dataB.id ? -1 : dataA.id == dataB.id ? 0 : 1,
  }),
  columnHelper.accessor('type', {
    header: '問題タイプ',
    cell: (info) => info.getValue(),
  }),
]

const difficultyListTableFeatures: TableFeature<TaskWithResult>[] = [
  {
    createCell: (cell, _, row) => {
      if (cell.column.id === 'level') {
        const { level } = row.original
        cell.custom = {
          ...cell.custom,
          color: `level-text.${level}`,
          backgroundColor: `level-background.${level}`,
        }
      }
    },
    createRow: (row) => {
      const backgroundColor = match(row.original)
        .with(
          {
            result: { isPerfectScore: true },
            rivalResult: { isPerfectScore: true },
          },
          () => '#faddb1',
        )
        .with({ result: { isPerfectScore: true } }, () => '#d7fbd7')
        .with({ rivalResult: { isPerfectScore: true } }, () => '#f8ccc8')
        .otherwise(() => '')

      row.custom = {
        ...row.custom,
        backgroundColor: backgroundColor,
      }
    },
  },
]
