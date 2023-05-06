import { MemoryRouter } from 'react-router-dom'
import { TopBar } from './TopBar'
import { render } from '../../test/testUtils'
import { within } from '@testing-library/react'
import 'mock-match-media/polyfill'
import { setMedia } from 'mock-match-media'
import { createSerializer } from '@emotion/jest'

expect.addSnapshotSerializer(createSerializer())

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
])('PCで${name}ページへのリンクが表示されている', async ({ name, to }) => {
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

test.each([
  { name: 'List', to: '/' },
  { name: 'History', to: '/history' },
  { name: 'ChangeLog', to: '/changelog' },
  { name: 'Links', to: '/links' },
])(
  'モバイルでボタンをクリックすると${name}ページへのリンクが表示される',
  async ({ name, to }) => {
    setMedia({ width: '400px' })
    const { getByRole, user } = render(
      <MemoryRouter>
        <TopBar />
      </MemoryRouter>,
    )

    const button = getByRole('button')
    await user.click(button)

    const link = within(getByRole('navigation')).getByRole('link', {
      name,
    })
    expect(link).toBeInTheDocument()
    expect(link).toHaveTextContent(name)
    expect(link).toHaveAttribute('href', to)
  },
)
