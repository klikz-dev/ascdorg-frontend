import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../../__test-utils__/test-utils'
import MemberPrice from './MemberPrice'

const testId = 'jest'
const title = 'Digital + Print Basic'
const price = '59*'
const priceCaption = 'annual'
const button = {
  linkLabel: 'label',
  linkUrl: '/',
  id: '123456789',
  linkTarget: '',
}
const memberPriceItems = [
  {
    title: 'Print issues of EL magazine.',
  },
  { title: 'Exclusive content, discounts, and more' },
]
const popular = true
const popularTitle = 'MOST POPULAR'

describe('<MemberPrice />', () => {
  it('component renders when blank', () => {
    const { getByTestId } = render(<MemberPrice testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })
  it('component renders when populated', () => {
    const { getByTestId } = render(
      <MemberPrice
        testId={testId}
        title={title}
        price={price}
        priceCaption={priceCaption}
        button={button}
        memberPriceItems={memberPriceItems}
        popular={popular}
        popularTitle={popularTitle}
      />
    )

    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-popularTitle')).toBeVisible()
    expect(getByTestId('jest-title')).toBeVisible()
    expect(getByTestId('jest-price')).toBeVisible()
    expect(getByTestId('jest-priceCaption')).toBeVisible()
    expect(getByTestId('jest-memberPrice')).toBeVisible()
  })
})
