import { ElementType, useMemo } from 'react'
import { getAizuOnlineJudgeUrl } from '../../helpers/url'
import { useTask } from '../../hooks/contexts/TaskContext'
import { ExternalLink } from '../../components/common/ExternalLink'

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
      <ExternalLink
        color='teal.500'
        _hover={{ textDecoration: 'none' }}
        href={url}
      >
        {'★'}
      </ExternalLink>
    </Tag>
  )
}
