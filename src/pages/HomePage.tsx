import { VFC } from 'react'
import { DifficultyList } from '../components/difficultyList/DifficultyList'
import { DifficultyListForm } from '../components/forms/DifficultyListForm'
import { Statistics } from '../components/statistics/Statistics'

export const HomePage: VFC = () => {
  return (
    <div>
      <h3>検索</h3>
      <DifficultyListForm />
      <h3>統計</h3>
      <Statistics />
      <h3>難易度表</h3>
      <DifficultyList />
    </div>
  )
}
