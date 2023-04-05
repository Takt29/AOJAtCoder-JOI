import { ElementType, useMemo } from 'react'
import { getAizuOnlineJudgeUrl } from '../../helpers/url'
import { useTask } from '../../hooks/contexts/TaskContext'

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
      <a href={url} target='_blank' rel='noopener noreferrer'>
        {'★'}
      </a>
    </Tag>
  )
}
