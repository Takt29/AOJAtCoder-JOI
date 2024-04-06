import { within } from '@testing-library/react'
import { Box } from '@chakra-ui/react'
import { render } from '../../test/testUtils'
import { ColoredLevel } from './ColoredLevel'

test('levelが3の時、3が難易度3の色で表示される', () => {
  const { getByTestId } = render(
    <ColoredLevel level={3} data-testid={'level'} as={Box} />,
  )

  const target = getByTestId('level')
  expect(target).toBeInTheDocument()
  expect(within(target).getByText('3')).toBeInTheDocument()

  expect(target).toHaveStyleRule('color', 'var(--chakra-colors-level-text-3)')
  expect(target).toHaveStyleRule(
    'background-color',
    'var(--chakra-colors-level-background-3)',
  )
})

test('levelが0の時、?が難易度0の色で表示される', () => {
  const { getByTestId } = render(
    <ColoredLevel level={0} data-testid={'level'} as={Box} />,
  )

  const target = getByTestId('level')
  expect(target).toBeInTheDocument()
  expect(within(target).getByText('?')).toBeInTheDocument()

  expect(target).toHaveStyleRule('color', 'var(--chakra-colors-level-text-0)')
  expect(target).toHaveStyleRule(
    'background-color',
    'var(--chakra-colors-level-background-0)',
  )
})

test('levelがallの時、allが難易度allの色で表示される', () => {
  const { getByTestId } = render(
    <ColoredLevel level={'all'} data-testid={'level'} as={Box} />,
  )

  const target = getByTestId('level')
  expect(target).toBeInTheDocument()
  expect(within(target).getByText('all')).toBeInTheDocument()

  expect(target).toHaveStyleRule('color', 'var(--chakra-colors-level-text-all)')
  expect(target).toHaveStyleRule(
    'background-color',
    'var(--chakra-colors-level-background-all)',
  )
})
