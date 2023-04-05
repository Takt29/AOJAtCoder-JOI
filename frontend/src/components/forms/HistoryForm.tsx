import { Stack } from '@chakra-ui/react'
import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  AccountData,
  ContestTypeData,
  TaskTypeData,
  YearData,
} from '../../types/form'
import { AccountForm } from './parts/AccountForm'
import { ContestTypeForm } from './parts/ContestTypeForm'
import { SubmitButton } from './parts/SubmitButton'
import { TaskTypeForm } from './parts/TaskTypeForm'
import { YearForm } from './parts/YearForm'

type HistoryFormData = {
  myAccount: AccountData
  taskType: TaskTypeData
  contestType: ContestTypeData
  year: YearData
  historyContestType: ContestTypeData
}

const defaultValues: HistoryFormData = {
  myAccount: { atcoder: '', aoj: '' },
  taskType: { batch: true, communication: true, outputOnly: false },
  contestType: {
    prelim1: true,
    prelim2: true,
    final: true,
    springCamp: true,
    joig: true,
    joigSpring: true,
    open: false,
  },
  year: {
    begin: 2007,
    end: 9999,
  },
  historyContestType: {
    prelim1: true,
    prelim2: true,
    final: true,
    springCamp: true,
    joig: true,
    joigSpring: false,
    open: false,
  },
}

export const HistoryForm = () => {
  const methods = useForm<HistoryFormData>({
    defaultValues,
  })

  const onSubmit = useCallback((data: HistoryFormData) => {
    console.log(data)
  }, [])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <AccountForm name='myAccount' />
          <TaskTypeForm name='taskType' />
          <ContestTypeForm name='contestType' title='カウント対象大会' />
          <YearForm name='year' />
          <ContestTypeForm name='historyContestType' title='表示対象大会' />
          <SubmitButton>表示</SubmitButton>
        </Stack>
      </form>
    </FormProvider>
  )
}
