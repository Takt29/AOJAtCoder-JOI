import { useCallback, useState } from 'react'
import { AccountData } from '../types/form'
import { TaskFilter } from '../types/task'
import { DifficultyList } from '../components/difficultyList/DifficultyList'
import {
  DifficultyListForm,
  DifficultyListFormData,
} from '../components/forms/DifficultyListForm'
import { Statistics } from '../components/statistics/Statistics'

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
    <div>
      <h3>検索</h3>
      <DifficultyListForm onSubmit={onSubmit} />
      <h3>統計</h3>
      <Statistics />
      <h3>難易度表</h3>
      <DifficultyList
        myAccount={myAccount}
        rivalAccount={rivalAccount}
        taskFilter={taskFilter}
      />
    </div>
  )
}
