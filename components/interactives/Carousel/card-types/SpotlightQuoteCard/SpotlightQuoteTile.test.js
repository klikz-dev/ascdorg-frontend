import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../../../../__test-utils__/test-utils'
import SpotlightQuoteTile from './SpotlightQuoteTile'

const title = 'This is a Test Title'
const description = 'This is a Test Description'
const authorThumbnail = '/'
const authorName = 'This is a Test Author'
const expertise = 'This is a Test Expertise'

describe('Custom SpotlightQuoteTile component', () => {
  test('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(
      <SpotlightQuoteTile
        testId='jest'
        title={title}
        description={description}
        authorThumbnail={authorThumbnail}
        authorName={authorName}
        expertise={expertise}
      />
    )

    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toHaveTextContent(title)
    expect(getByTestId('jest-description')).toHaveTextContent(description)
    expect(getByTestId('jest-expertise')).toHaveTextContent(expertise)
    expect(getByTestId('jest-authorName')).toHaveTextContent(authorName)
  })
})
