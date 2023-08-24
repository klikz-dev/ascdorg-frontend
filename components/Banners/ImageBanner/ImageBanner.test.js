import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { imageBannerItem } from '../../../__mocks__/imageBannerMock'
import { render } from '../../../__test-utils__/test-utils'
import ImageBanner from './ImageBanner'

const body = imageBannerItem?.body
const image = imageBannerItem?.imageContent?.imageContentful?.url
const displayTitle = imageBannerItem?.displayTitle

describe('<ImageBanner />', () => {
  it('component renders when blank', () => {
    const { getByTestId } = render(<ImageBanner testId='jest' />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('component renders various elements', () => {
    const { getByTestId } = render(
      <ImageBanner
        testId='jest'
        body={body}
        image={image}
        displayTitle={displayTitle}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-image')).toBeVisible()
    expect(getByTestId('jest-displayTitle')).toBeVisible()
    expect(getByTestId('jest-body')).toBeVisible()
  })
})
