import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, screen } from '../../../../../__test-utils__/test-utils'
import SpotlightAuthorWorkshopTile from './SpotlightAuthorWorkshopTile'

const slug = '/'
const imageUrl = '/_next/image?url=%2Fimages%2FASCDImageFiller.png&w=3840&q=75'
const details = 'This is a Test Title'
const topicType = 'Equity'
const authorName = [
  {
    firstName: 'Amy',
    lastName: 'Whinehouse',
  },
]
const title = 'This is a Test Title'

describe('Custom SpotlightAuthorWorkshopTile component', () => {
  test('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(
      <SpotlightAuthorWorkshopTile
        testId='jest'
        slug={slug}
        imageUrl={imageUrl}
        details={details}
        topicType={topicType}
        authorName={authorName}
        title={title}
      />
    )

    expect(getByTestId('jest')).toBeVisible()
    expect(screen.getByText('Equity')).toBeInTheDocument()
    expect(getByTestId('jest-title')).toHaveTextContent(title)
    expect(getByTestId('jest-topic')).toHaveTextContent(topicType)
    expect(getByTestId('jest-author')).toHaveTextContent('Amy Whinehouse')
    expect(getByTestId('jest-details')).toHaveTextContent(details)
  })
})
