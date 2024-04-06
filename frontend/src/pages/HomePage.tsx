import { useCallback, useMemo, useState } from 'react'
import { Heading, Stack } from '@chakra-ui/react'
import { AccountData } from '../types/form'
import { TaskFilter } from '../types/task'
import { DifficultyList } from '../components/difficultyList/DifficultyList'
import {
  DifficultyListForm,
  DifficultyListFormData,
} from '../components/forms/DifficultyListForm'
import { Statistics } from '../components/statistics/Statistics'
import { useSiteSubmissions } from '../hooks/http/submissions'
import { useTasks } from '../hooks/http/task'
import { toSubmissions } from '../helpers/submission'

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

  const { data: siteSubmissions, isLoading: loadingMySubmissions } =
    useSiteSubmissions(myAccount?.atcoder, myAccount?.aoj)
  const { data: rivalSiteSubmissions, isLoading: loadingRivalSubmissions } =
    useSiteSubmissions(rivalAccount?.atcoder, rivalAccount?.aoj)

  const { data: tasks } = useTasks()

  const submissions = useMemo(
    () => siteSubmissions && tasks && toSubmissions(siteSubmissions, tasks),
    [siteSubmissions, tasks],
  )
  const rivalSubmissions = useMemo(
    () =>
      rivalSiteSubmissions &&
      tasks &&
      toSubmissions(rivalSiteSubmissions, tasks),
    [rivalSiteSubmissions, tasks],
  )

  return (
    <Stack spacing={4}>
      <Heading as='h3' size='lg'>
        検索
      </Heading>
      <DifficultyListForm
        onSubmit={onSubmit}
        loading={loadingMySubmissions || loadingRivalSubmissions}
      />
      <Heading as='h3' size='lg'>
        統計
      </Heading>
      <Statistics />
      <Heading as='h3' size='lg'>
        難易度表
      </Heading>
      <DifficultyList
        submissions={submissions}
        rivalSubmissions={rivalSubmissions}
        taskFilter={taskFilter}
      />
    </Stack>
  )
}
