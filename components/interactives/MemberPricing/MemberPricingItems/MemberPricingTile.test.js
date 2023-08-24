import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../../../__test-utils__/test-utils'
import MemberPricingTile from './MemberPricingTile'

const popular = true
const popularLabel = 'TEST'
const price = '15'
const title = 'TEST TITLE'
const body = [
  'Student engagement and motivation',
  'Student engagement and motivation',
  'Student engagement and motivation',
]
const priceSymbol = true

describe('<MemberPricingTile />', () => {
  it('component renders when blank', () => {
    const { getByTestId } = render(<MemberPricingTile testId='jest' />)
    expect(getByTestId('jest')).toBeVisible()
  })
  it('component renders when populated', () => {
    const { getByTestId } = render(
      <MemberPricingTile
        testId='jest'
        popular={popular}
        popularLabel={popularLabel}
        price={price}
        title={title}
        body={body}
        priceSymbol={priceSymbol}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-popular')).toBeVisible()
    expect(getByTestId('jest-price')).toBeVisible()
    expect(getByTestId('jest-priceSymbol')).toBeVisible()
    expect(getByTestId('jest-title')).toHaveTextContent(title)
    expect(getByTestId('jest-body')).toBeVisible()
  })
})
