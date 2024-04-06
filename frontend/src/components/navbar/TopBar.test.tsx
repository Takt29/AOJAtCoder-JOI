import { MemoryRouter } from 'react-router-dom'
import { within } from '@testing-library/react'
import { setMedia } from 'mock-match-media'
import { render } from '../../test/testUtils'
import { TopBar } from './TopBar'

test('サイト名が表示されている', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <TopBar />
    </MemoryRouter>,
  )

  const appTitle = getByRole('link', { name: 'AOJ/AtCoder-JOI' })
  expect(appTitle).toBeInTheDocument()
})

test.each([
  { name: 'List', to: '/' },
  { name: 'History', to: '/history' },
  { name: 'ChangeLog', to: '/changelog' },
  { name: 'Links', to: '/links' },
])('PCで$nameページへのリンクが表示されている', async ({ name, to }) => {
  setMedia({ width: '1000px' })
  const { getByRole } = render(
    <MemoryRouter>
      <TopBar />
    </MemoryRouter>,
  )

  expect(getByRole('navigation')).toBeInTheDocument()

  const link = within(getByRole('navigation')).getByRole('link', {
    name,
  })
  expect(link).toBeInTheDocument()
  expect(link).toHaveTextContent(name)
  expect(link).toHaveAttribute('href', to)
})

test('モバイルでは初期状態で各ページへのリンクは表示されていない', () => {
  setMedia({ width: '400px' })
  const { queryByRole } = render(
    <MemoryRouter>
      <TopBar />
    </MemoryRouter>,
  )

  expect(queryByRole('navigation')).not.toBeInTheDocument()
})

test.each([
  { name: 'List', to: '/' },
  { name: 'History', to: '/history' },
  { name: 'ChangeLog', to: '/changelog' },
  { name: 'Links', to: '/links' },
])(
  'モバイルでボタンをクリックすると$nameページへのリンクが表示される',
  async ({ name, to }) => {
    setMedia({ width: '400px' })
    const { getByRole, findByRole, user } = render(
      <MemoryRouter>
        <TopBar />
      </MemoryRouter>,
    )

    const button = getByRole('button')
    await user.click(button)

    const link = within(await findByRole('navigation')).getByRole('link', {
      name,
    })
    expect(link).toBeInTheDocument()
    expect(link).toHaveTextContent(name)
    expect(link).toHaveAttribute('href', to)
  },
)
