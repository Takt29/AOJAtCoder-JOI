import { MemoryRouter } from 'react-router-dom'
import { TopBar } from './TopBar'
import { render } from '../../test/testUtils'
import { waitFor, within } from '@testing-library/react'
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
])('${name}ページへのリンクが表示されている', async ({ name, to }) => {
  setMedia({ width: '1000px' })
  const { getByRole } = render(
    <MemoryRouter>
      <TopBar />
    </MemoryRouter>,
  )

  await waitFor(() => expect(getByRole('navigation')).toBeInTheDocument())

  const link = within(getByRole('navigation', { hidden: true })).getByRole(
    'link',
    { name, hidden: true },
  )
  expect(link).toBeInTheDocument()
  expect(link).toHaveTextContent(name)
  expect(link).toHaveAttribute('href', to)
})
