import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { bannerMock } from '../../../__mocks__/componentBannerMock'
import { render } from '../../../__test-utils__/test-utils'
import ComponentBanner from './ComponentBanner'

describe('<ComponentBanner />', () => {
  it('component renders', () => {
    const { getByTestId } = render(
      <ComponentBanner testId='jest' {...bannerMock} />
    )
    expect(getByTestId('jest')).toBeVisible()
  })
})
