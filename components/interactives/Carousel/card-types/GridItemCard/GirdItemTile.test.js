import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, screen } from '../../../../../__test-utils__/test-utils'
import GridItemTile from './GridItemTile'

const slug = '/'
const thumbnail = '/_next/image?url=%2Fimages%2FASCDImageFiller.png&w=3840&q=75'
const title = 'This is a Test Title'

describe('Custom GridItemTile component', () => {
  test('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(
      <GridItemTile
        testId='jest'
        slug={slug}
        thumbnail={thumbnail}
        title={title}
      />
    )

    expect(getByTestId('jest')).toBeVisible()
    expect(screen.getByText('This is a Test Title')).toBeInTheDocument()
    expect(getByTestId('jest-title')).toHaveTextContent(title)
    expect(getByTestId('jest-thumbnail')).toBeInTheDocument()
  })
})
