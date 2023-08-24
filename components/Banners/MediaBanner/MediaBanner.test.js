import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../../__test-utils__/test-utils'
import MediaBanner from './MediaBanner'

const testId = 'jest'
const title = 'Test Title'
const subTitle = 'Test Subtitle'

describe('Custom MediaBanner component', () => {
  it('component renders when populated', () => {
    const { getByTestId } = render(<MediaBanner testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('component renders when populated', () => {
    const { getByTestId } = render(
      <MediaBanner testId={testId} title={title} subTitle={subTitle} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toBeVisible()
    expect(getByTestId('jest-subTitle')).toBeVisible()
  })
})
