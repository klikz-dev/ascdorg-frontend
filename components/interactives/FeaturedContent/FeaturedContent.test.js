import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { featuredContentHorizontalItem } from '../../../__mocks__/featuredContentHorizontal'
import { render } from '../../../__test-utils__/test-utils'
import FeaturedContent from './FeaturedContent'

const title = featuredContentHorizontalItem.displayTitle
const indexName = featuredContentHorizontalItem.indexName
const contentTypes = featuredContentHorizontalItem.contentTypes
const topics = featuredContentHorizontalItem.topics
const keywords = featuredContentHorizontalItem.keywords
const featuredAuthors = featuredContentHorizontalItem.authors
const lowerDate = featuredContentHorizontalItem.dateLowerRange
const upperDate = featuredContentHorizontalItem.dateUpperRange
const featured = featuredContentHorizontalItem.featured

describe('<FeaturedContent />', () => {
  it('component renders when blank', () => {
    const { getByTestId } = render(<FeaturedContent testId='jest' />)
    expect(getByTestId('jest')).toBeVisible()
  })
  it('component renders when populated', () => {
    const { getByTestId } = render(
      <FeaturedContent
        testId='jest'
        title={title}
        indexName={indexName}
        contentTypes={contentTypes}
        topics={topics}
        keywords={keywords}
        featuredAuthors={featuredAuthors}
        lowerDate={lowerDate}
        upperDate={upperDate}
        featured={featured}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
  })
})
