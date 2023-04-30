import { ElementType, useMemo } from 'react'
import { getAtcoderUrl } from '../../helpers/url'
import { useTask } from '../../hooks/contexts/TaskContext'
import { Link } from '@chakra-ui/react'

type Props = {
  as?: ElementType
  className?: string
}

export const TaskName = (props: Props) => {
  const { as: Tag = 'span', className } = props

  const task = useTask()
  const { name } = task
  const url = useMemo(() => getAtcoderUrl(task), [task])

  if (!url) {
    return <Tag>{name}</Tag>
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
        {name}
      </Link>
    </Tag>
  )
}
