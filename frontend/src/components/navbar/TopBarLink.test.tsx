import { TopBarLink } from './TopBarLink'
import { render } from '../../test/testUtils'
import { MemoryRouter } from 'react-router-dom'

test('現在のページと一致している場合には色が変化し下線が付く', () => {
  const { getByRole } = render(
    <MemoryRouter initialEntries={['/foo']}>
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
    <MemoryRouter initialEntries={['/bar']}>
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
    <MemoryRouter initialEntries={['/bar']}>
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

test('現在のページのリンクをhover時には現在のページの表示のまま変換しない', async () => {
  const { getByRole } = render(
    <MemoryRouter initialEntries={['/foo']}>
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
