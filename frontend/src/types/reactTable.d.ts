import { TableRowProps } from '@chakra-ui/react'
import { RowData } from '@tanstack/table-core'

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Row<TData extends RowData> {
    custom?: {
      color?: string
      backgroundColor?: string
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Cell<TData extends RowData, TValue> {
    custom?: {
      color?: string
      backgroundColor?: string
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    textAlign?: TableRowProps['textAlign']
  }
}
