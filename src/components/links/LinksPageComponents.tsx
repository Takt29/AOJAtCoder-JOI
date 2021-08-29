import { FC } from 'react'

type Props = {
  title: string
  href: string
}

export const LinksPageComponent: FC<Props> = (props) => {
  const { title, href, children } = props

  return (
    <div>
      <h4>
        <a href={href} target='_blank' rel='noopener noreferrer'>
          {title}
        </a>
      </h4>
      <p>{children}</p>
    </div>
  )
}
