import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, screen } from '../../../../../__test-utils__/test-utils'
import BlogTile from './BlogTile'

const slug = '/'
const imageUrl = '/_next/image?url=%2Fimages%2FASCDImageFiller.png&w=3840&q=75'
const title = 'This is a Test Title'
const topic = 'Equity'
const authorName = 'J'
const issueDate = '2021-07-27T00:00-04:00'

describe('Custom BlogTile component', () => {
  test('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(
      <BlogTile
        testId='jest'
        slug={slug}
        imageUrl={imageUrl}
        title={title}
        topic={topic}
        authorName={authorName}
        issueDate={issueDate}
      />
    )

    expect(getByTestId('jest')).toBeVisible()
    expect(screen.getByText('Equity')).toBeInTheDocument()
    expect(screen.getByText('This is a Test Title')).toBeInTheDocument()
    expect(getByTestId('jest-authorName')).toHaveTextContent(authorName)
  })
})
