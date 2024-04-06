import { MemoryRouter, Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { render } from '../../test/testUtils'
import { TopBarLink } from './TopBarLink'

test('titleで指定した文字列が表示されている', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <TopBarLink title={'タイトル'} to={'/'} />
    </MemoryRouter>,
  )

  const link = getByRole('link', { name: 'タイトル' })
  expect(link).toBeInTheDocument()
  expect(link).toHaveTextContent('タイトル')
})

test('クリックするとtoで指定した先に移動する', async () => {
  const history = createBrowserHistory()
  const { getByRole, user } = render(
    <Router location={history.location} navigator={history}>
      <TopBarLink to={'/bar'} title={'Page'} />
    </Router>,
  )

  const link = getByRole('link')
  await user.click(link)

  expect(history.location.pathname).toBe('/bar')
})

test('現在のページと一致している場合には色が変化し下線が付く', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <TopBarLink to={'/foo'} title={'Page'} />
    </MemoryRouter>,
  )
  const styleRule = { target: '[aria-current=page]' }

  const link = getByRole('link')
  expect(link).toHaveStyleRule(
    'color',
    'var(--chakra-colors-green-500)',
    styleRule,
  )
  expect(link).toHaveStyleRule('border-bottom', 'solid', styleRule)
})

test('現在のページと異なる場合は変化しない', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <TopBarLink to={'/foo'} title={'Page'} />
    </MemoryRouter>,
  )
  const styleRule = {}

  const link = getByRole('link')
  expect(link).toHaveStyleRule('color', 'inherit', styleRule)
  expect(link).not.toHaveStyleRule('border-bottom', 'solid', styleRule)
})

test('現在のページではないリンクをhover時に色が変化し下線が付く', async () => {
  const { getByRole } = render(
    <MemoryRouter>
      <TopBarLink to={'/foo'} title={'Page'} />
    </MemoryRouter>,
  )
  const styleRule = { target: ':hover' }

  const link = getByRole('link')
  expect(link).toHaveStyleRule(
    'color',
    'var(--chakra-colors-green-700)',
    styleRule,
  )
  expect(link).toHaveStyleRule('border-bottom', 'solid', styleRule)
})

test('現在のページのリンクをhover時には現在のページの表示のまま変換しない', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <TopBarLink to={'/foo'} title={'Page'} />
    </MemoryRouter>,
  )
  const styleRule = { target: /\[aria-current=page\]|:hover/ }

  const link = getByRole('link')
  expect(link).toHaveStyleRule(
    'color',
    'var(--chakra-colors-green-500)',
    styleRule,
  )
  expect(link).toHaveStyleRule('border-bottom', 'solid', styleRule)
})
