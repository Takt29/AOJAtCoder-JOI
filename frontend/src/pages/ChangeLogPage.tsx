import { Heading } from '@chakra-ui/react'
import { ChangeLog } from '../components/changelog/ChangeLog'

export const ChangeLogPage = () => {
  return (
    <div>
      <Heading as='h3' size='lg'>
        難易度変更履歴
      </Heading>
      <ChangeLog />
    </div>
  )
}
