import { ElementType, useMemo } from 'react'
import { getAizuOnlineJudgeUrl } from '../../helpers/url'
import { useTask } from '../../hooks/contexts/TaskContext'
import { Link } from '@chakra-ui/react'

type Props = {
  as?: ElementType
  className?: string
}

export const TaskAizuOnlineJudgeLink = (props: Props) => {
  const { as: Tag = 'span', className } = props

  const task = useTask()
  const url = useMemo(() => getAizuOnlineJudgeUrl(task), [task])

  if (!url) {
    return <Tag className={className} />
  }

  return (
    <Tag className={className}>
      <Link
        color='teal.500'
        _hover={{ textDecoration: 'none' }}
        href={url}
        target='_blank'
        rel='noopener noreferrer'
      >
        {'★'}
      </Link>
    </Tag>
  )
}
