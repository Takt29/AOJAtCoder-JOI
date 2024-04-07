import { Stack } from '@chakra-ui/react'
import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  AccountData,
  ContestTypeData,
  HideFilterData,
  LevelData,
  TaskTypeData,
  YearData,
} from '../../types/form'
import { AccountForm } from './parts/AccountForm'
import { ContestTypeForm } from './parts/ContestTypeForm'
import { HideFilterForm } from './parts/HideFilterForm'
import { SubmitButton } from './parts/SubmitButton'
import { TaskTypeForm } from './parts/TaskTypeForm'
import { YearForm } from './parts/YearForm'
import { LevelForm } from './parts/LevelForm'

export type DifficultyListFormData = {
  myAccount: AccountData
  rivalAccount: AccountData
  taskType: TaskTypeData
  hideFilter: HideFilterData
  contestType: ContestTypeData
  year: YearData
  level: LevelData
}

type Props = {
  onSubmit?: (data: DifficultyListFormData) => void
  defaultValues?: DifficultyListFormData
  loading?: boolean
}

export const DifficultyListForm = (props: Props) => {
  const { onSubmit, loading = false, defaultValues } = props

  const methods = useForm<DifficultyListFormData>({
    defaultValues,
  })

  const onSubmitForm = useCallback(
    (data: DifficultyListFormData) => {
      onSubmit?.(data)
    },
    [onSubmit],
  )

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitForm)}>
        <Stack spacing={4}>
          <AccountForm name='myAccount' title='自分' />
          <AccountForm name='rivalAccount' title='ライバル' />
          <TaskTypeForm name='taskType' />
          <HideFilterForm name='hideFilter' />
          <ContestTypeForm name='contestType' />
          <YearForm name='year' />
          <LevelForm name='level' />
          <SubmitButton loading={loading}>表示</SubmitButton>
        </Stack>
      </form>
    </FormProvider>
  )
}
