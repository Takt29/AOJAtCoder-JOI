import { TopBarLink } from './TopBarLink'
import { render } from '../../test/testUtils'
import { MemoryRouter } from 'react-router-dom'

test('現在のページと一致している場合には色が変化し下線が付く', () => {
  const { getByRole } = render(
    <MemoryRouter initialEntries={['/foo']}>
      <TopBarLink to={'/foo'} title={'Page'} />
    </MemoryRouter>,
  )

  const link = getByRole('link')
  expect(link).toHaveStyleRule('color', 'var(--chakra-colors-green-700)', {
    target: ':hover',
  })
  expect(window.getComputedStyle(link).borderBottom).toBe('solid')
})

test('現在のページと異なる場合は変化しない', () => {
  const { getByRole } = render(
    <MemoryRouter initialEntries={['/bar']}>
      <TopBarLink to={'/foo'} title={'Page'} />
    </MemoryRouter>,
  )

  const link = getByRole('link')
  expect(link).toHaveStyleRule('color', 'inherit', {})
  expect(window.getComputedStyle(link).borderBottom).not.toBe('solid')
})
