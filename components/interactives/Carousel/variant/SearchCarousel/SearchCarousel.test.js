import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../../../../__test-utils__/test-utils'
import SearchCarousel from './SearchCarousel'

const indexName = 'ascd_stage'
const topics = ['Engagement']
const type = 'blog'
const dateLowerRange = '2021-02-11'
const dateUpperRange = '2022-02-11'
const keywords = ['Student engagement and motivation']
const title = 'test'
const ctaLink = '/'
const ctaLabel = 'TEST'

describe('Custom SearchCarousel component', () => {
  it('component renders when populated', () => {
    const { getByTestId } = render(
      <SearchCarousel
        testId='jest'
        title={title}
        indexName={indexName}
        type={type}
        topics={topics}
        keywords={keywords}
        dateLowerRange={dateLowerRange}
        dateUpperRange={dateUpperRange}
        ctaLink={ctaLink}
        ctaLabel={ctaLabel}
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
