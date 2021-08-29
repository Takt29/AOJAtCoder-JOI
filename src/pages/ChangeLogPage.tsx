import { VFC } from 'react'
import { ChangeLog } from '../components/changelog/ChangeLog'

export const ChangeLogPage: VFC = () => {
  return (
    <div>
      <h3>難易度変更履歴</h3>
      <ChangeLog />
    </div>
  )
}
