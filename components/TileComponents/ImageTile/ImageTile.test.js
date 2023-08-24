import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../../__test-utils__/test-utils'
import ImageTile from './ImageTile'

const testId = 'jest'
const slug = '/'
const imageUrl = '/images/ASCDImageFiller.png'
const title = 'Test Title'

describe('Custom ImageTile component', () => {
  it('component renders when populated', () => {
    const { getByTestId } = render(<ImageTile testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('component renders when populated', () => {
    const { getByTestId } = render(
      <ImageTile
        testId={testId}
        title={title}
        slug={slug}
        imageUrl={imageUrl}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-image')).toHaveAttribute('alt', title)
    expect(getByTestId('jest-image')).toHaveAttribute(
      'src',
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    )
    expect(getByTestId('jest-image')).toBeVisible()
  })
})
