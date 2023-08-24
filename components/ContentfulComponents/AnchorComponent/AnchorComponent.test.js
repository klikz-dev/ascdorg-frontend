import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../../__test-utils__/test-utils'
import AnchorComponent from './AnchorComponent'

describe('<AnchorComponent />', () => {
  const id = 'test'
  it('component renders', () => {
    const { getByTestId } = render(<AnchorComponent testId='jest' id={id} />)
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest')).toHaveAttribute('id', 'test')
  })
})
