import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../../__test-utils__/test-utils'
import MemberPricing from './MemberPricing'

const title = 'TEST'
const items = [
  {
    popular: true,
    popularLabel: 'TEST',
    price: '15',
    title: 'Test title',
    bulletPoints: ['TEST1', 'TEST2', 'TEST3'],
    priceSymbol: true,
    ctaButton1: null,
    ctaButton2: null,
    titleCentered: true,
    bulletPointCentered: true,
  },
]

describe('<MemberPricing />', () => {
  it('component renders when populated', () => {
    const { getByTestId } = render(
      <MemberPricing testId='jest' title={title} items={items} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toBeInTheDocument(title)
  })
})
