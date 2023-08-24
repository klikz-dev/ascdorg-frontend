import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../../../__test-utils__/test-utils'
import SearchGridSection from './SearchGridSection'

const title = 'test'
const indexName = 'ascd_stage'
const contentTypes = ['blog', 'article', 'pubissue']
const topics = ['Engagement']
const keywords = ['Student engagement and motivation']
const lowerDate = '2021-02-11'
const upperDate = '2022-02-11'
const featured = false
const ctaLink = '/'
const ctaLabel = 'TEST'
const ctaTarget = '_blank'

describe('<SearchGridSection />', () => {
  it('component renders when blank', () => {
    const { getByTestId } = render(<SearchGridSection testId='jest' />)
    expect(getByTestId('jest')).toBeVisible()
  })
  it('component renders when populated', () => {
    const { getByTestId } = render(
      <SearchGridSection
        testId='jest'
        title={title}
        indexName={indexName}
        contentTypes={contentTypes}
        topics={topics}
        keywords={keywords}
        lowerDate={lowerDate}
        upperDate={upperDate}
        featured={featured}
        ctaLink={ctaLink}
        ctaLabel={ctaLabel}
        ctaTarget={ctaTarget}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toHaveTextContent(title)
    expect(getByTestId('jest-cta-link')).toBeVisible()
    expect(getByTestId('jest-cta-link').getAttribute('href')).toBe(ctaLink)
    expect(
      getByTestId('jest-cta-link').querySelector('span')
    ).toHaveTextContent(ctaLabel)
  })
})
