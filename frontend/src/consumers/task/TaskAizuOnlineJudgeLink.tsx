import { ComponentProps, ElementType, useMemo } from 'react'
import { getAizuOnlineJudgeUrl } from '../../helpers/url'
import { useTask } from '../../hooks/contexts/TaskContext'
import { ExternalLink } from '../../components/common/ExternalLink'

type Props<T extends ElementType> = {
  as?: T
} & ComponentProps<T>

export const TaskAizuOnlineJudgeLink = <T extends ElementType>(
  props: Props<T>,
) => {
  const { as: Tag = 'span', ...others } = props

  const task = useTask()
  const url = useMemo(() => getAizuOnlineJudgeUrl(task), [task])

  if (!url) {
    return <Tag {...others} />
  }

  return (
    <Tag {...others}>
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
