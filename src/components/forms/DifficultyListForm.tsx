import { useCallback, VFC } from 'react'
import { Form } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import {
  AccountData,
  ContestTypeData,
  HideFilterData,
  TaskTypeData,
  YearData,
} from '../../types/form'
import { AccountForm } from './parts/AccountForm'
import { ContestTypeForm } from './parts/ContestTypeForm'
import { HideFilterForm } from './parts/HideFilterForm'
import { SubmitButton } from './parts/SubmitButton'
import { TaskTypeForm } from './parts/TaskTypeForm'
import { YearForm } from './parts/YearForm'

type DifficultyListFormData = {
  myAccount: AccountData
  rivalAccount: AccountData
  taskType: TaskTypeData
  hideFilter: HideFilterData
  contestType: ContestTypeData
  year: YearData
}

const defaultValues: DifficultyListFormData = {
  myAccount: { atcoder: '', aoj: '' },
  rivalAccount: { atcoder: '', aoj: '' },
  taskType: { batch: true, communication: true, outputOnly: false },
  hideFilter: { solvedTask: false, notExistTask: false, level: false },
  contestType: {
    prelim1: true,
    prelim2: true,
    final: true,
    springCamp: true,
    joig: true,
    open: false,
  },
  year: {
    begin: 2007,
    end: 9999,
  },
}

export const DifficultyListForm: VFC = () => {
  const methods = useForm<DifficultyListFormData>({
    defaultValues,
  })

  const onSubmit = useCallback((data: DifficultyListFormData) => {
    console.log(data)
  }, [])

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <AccountForm name='myAccount' title='自分' />
        <AccountForm name='rivalAccount' title='ライバル' />
        <TaskTypeForm name='taskType' />
        <HideFilterForm name='hideFilter' />
        <ContestTypeForm name='contestType' />
        <YearForm name='year' />
        <SubmitButton>送信</SubmitButton>
      </Form>
    </FormProvider>
  )
}
