import {
  Icon,
  Table,
  TableProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  chakra,
} from '@chakra-ui/react'
import {
  TableOptions,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa6'

type Props<T> = Pick<TableOptions<T>, '_features' | 'data' | 'columns'> &
  TableProps

// reference: https://chakra-ui.com/getting-started/with-react-table
export const DataTable = <T,>(props: Props<T>) => {
  const { data, columns, _features, ...tableProps } = props

  const table = useReactTable({
    _features,
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    sortDescFirst: false,
  })

  return (
    <Table {...tableProps}>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Th
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                cursor={header.column.getCanSort() ? 'pointer' : 'default'}
                userSelect={'none'}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
                {header.column.getCanSort() ? (
                  <chakra.span pl='4'>
                    {header.column.getIsSorted() === 'desc' ? (
                      <Icon as={FaSortDown} aria-label='sorted descending' />
                    ) : header.column.getIsSorted() === 'asc' ? (
                      <Icon as={FaSortUp} aria-label='sorted ascending' />
                    ) : (
                      <Icon as={FaSort} aria-label='sortable' />
                    )}
                  </chakra.span>
                ) : null}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr
            key={row.id}
            color={row.custom?.color}
            backgroundColor={row.custom?.backgroundColor}
          >
            {row.getVisibleCells().map((cell) => (
              <Td
                key={cell.id}
                color={cell.custom?.color}
                backgroundColor={cell.custom?.backgroundColor}
                textAlign={cell.column.columnDef.meta?.textAlign}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
