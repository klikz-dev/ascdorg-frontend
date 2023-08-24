import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, within } from '../../__test-utils__/test-utils'
import AlternateRows from './AlternateRows'

describe('<AlternateRows />', () => {
  it('component renders when blank', () => {
    const { getByTestId } = render(
      <AlternateRows testId='jest' title='' rows={[]} />
    )
    expect(getByTestId('jest')).toBeVisible()
  })
  it('component renders title when included', () => {
    const { getByTestId } = render(
      <AlternateRows testId='jest' title='TEST' rows={[]} />
    )
    expect(getByTestId('jest-title')).toHaveTextContent('TEST')
  })
  it('component renders correct number of rows', () => {
    const { getByTestId } = render(
      <AlternateRows
        testId='jest'
        title='TEST'
        rows={[{ TestOne: 'Test-One' }, { TestTwo: 'Test-Two' }]}
      />
    )
    const component = getByTestId('jest-rows')
    const cards = within(component).getAllByTestId('jest-data-row')
    expect(cards.length).toBe(2)
  })
})
