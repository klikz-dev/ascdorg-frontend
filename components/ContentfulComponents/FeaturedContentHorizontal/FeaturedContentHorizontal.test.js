import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { featuredContentHorizontalItem } from '../../../__mocks__/featuredContentHorizontal'
import { render } from '../../../__test-utils__/test-utils'
import FeaturedContentHorizontal from './FeaturedContentHorizontal'

describe('<FeaturedContentHorizontal />', () => {
  it('component renders', () => {
    const { getByTestId } = render(
      <FeaturedContentHorizontal
        testId='jest'
        {...featuredContentHorizontalItem}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
  })
})
