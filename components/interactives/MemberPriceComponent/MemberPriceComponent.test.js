import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../../__test-utils__/test-utils'
import MemberPriceComponent from './MemberPriceComponent'

const testId = 'jest'

describe('<MemberPriceComponent />', () => {
  it('component renders when blank', () => {
    const { getByTestId } = render(<MemberPriceComponent testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })
  it('component renders when populated', () => {
    const { getByTestId } = render(<MemberPriceComponent testId={testId} />)

    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-memberPricePlan')).toBeVisible()
  })
})
