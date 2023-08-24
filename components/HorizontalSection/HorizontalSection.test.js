import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../__test-utils__/test-utils'
import HorizontalSection from './HorizontalSection'

const testId = 'jest'
const title = 'Test Title'
const viewAllLink = '/'
const label = 'Test Label'
const linkText = 'Test Link Text'
const linkSlug = '/'
const description = 'Test Description'
const date = ''
const authorImage = ''
const authorTitle = ''
const authorSubtitle = 'Test Author Subtitle'
const imageSlug = ''
const variant = ''

describe('Custom HorizontalSection component', () => {
  it('component renders when populated', () => {
    const { getByTestId } = render(<HorizontalSection testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('component renders when populated', () => {
    const { getByTestId } = render(
      <HorizontalSection
        testId={testId}
        title={title}
        viewAllLink={viewAllLink}
        label={label}
        linkText={linkText}
        linkSlug={linkSlug}
        description={description}
        date={date}
        authorImage={authorImage}
        authorTitle={authorTitle}
        authorSubtitle={authorSubtitle}
        imageSlug={imageSlug}
        variant={variant}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toBeVisible()
    expect(getByTestId('jest-authors')).toBeVisible()
  })
})
