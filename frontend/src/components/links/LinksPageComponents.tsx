import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  title: string
  href: string
}

export const LinksPageComponent = (props: Props) => {
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
