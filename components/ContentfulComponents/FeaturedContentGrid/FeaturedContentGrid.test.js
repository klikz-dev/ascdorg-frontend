import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { featuredContentGridItem } from '../../../__mocks__/featuredContentGridMock'
import { render } from '../../../__test-utils__/test-utils'
import FeaturedContentGrid from './FeaturedContentGrid'

describe('<FeaturedContentGrid />', () => {
  it('component renders', () => {
    const { getByTestId } = render(
      <FeaturedContentGrid testId='jest' {...featuredContentGridItem} />
    )
    expect(getByTestId('jest')).toBeVisible()
  })
})
