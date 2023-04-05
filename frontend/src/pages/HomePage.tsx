import { useCallback, useState } from 'react'
import { AccountData } from '../types/form'
import { TaskFilter } from '../types/task'
import { DifficultyList } from '../components/difficultyList/DifficultyList'
import {
  DifficultyListForm,
  DifficultyListFormData,
} from '../components/forms/DifficultyListForm'
import { Statistics } from '../components/statistics/Statistics'
import { Heading, Stack } from '@chakra-ui/react'

export const HomePage = () => {
  const [myAccount, setMyAccount] = useState<AccountData>()
  const [rivalAccount, setRivalAccount] = useState<AccountData>()
  const [taskFilter, setTaskFilter] = useState<TaskFilter>()

  const onSubmit = useCallback((data: DifficultyListFormData) => {
    const { myAccount, rivalAccount, ...taskFilter } = data
    setMyAccount(myAccount)
    setRivalAccount(rivalAccount)
    setTaskFilter(taskFilter)
  }, [])

  return (
    <Stack spacing={4}>
      <Heading as='h3' size='lg'>
        検索
      </Heading>
      <DifficultyListForm onSubmit={onSubmit} />
      <Heading as='h3' size='lg'>
        統計
      </Heading>
      <Statistics />
      <Heading as='h3' size='lg'>
        難易度表
      </Heading>
      <DifficultyList
        myAccount={myAccount}
        rivalAccount={rivalAccount}
        taskFilter={taskFilter}
      />
    </Stack>
  )
}
