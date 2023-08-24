import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../../__test-utils__/test-utils'
import IssueBannerTitle from './IssueBannerTitle'

const testId = 'jest'
const tag = 'test tag'
const title = 'issue title'
const slug = '/'
const imgUrl = '/'
const description = 'test description'
const issueNo = 'test issueNo'
const volumeNo = '67890'
const bookVersion = {
  priceMember: '1234',
}
const landing = {
  title: 'landing title',
  subtitle: 'landing subtitle',
}
const ctaLabel = 'Test Label'
const ctaLink = '/'
const ctaTarget = ''
const authors = {
  images: [],
  ctaLabel: 'authors-label',
  ctaLink: '/',
}

describe('Custom IssueBannerTitle component', () => {
  it('component renders when populated', () => {
    const { getByTestId } = render(
      <IssueBannerTitle
        testId={testId}
        tag={tag}
        title={title}
        slug={slug}
        imgUrl={imgUrl}
        landing={landing}
        ctaLabel={ctaLabel}
        ctaLink={ctaLink}
        ctaTarget={ctaTarget}
        authors={authors}
        description={description}
        issueNo={issueNo}
        volumeNo={volumeNo}
        bookVersion={bookVersion}
      />
    )

    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toBeVisible()
    expect(getByTestId('jest-subtitle')).toBeVisible()
    expect(getByTestId('jest-issue-title')).toBeVisible()
    expect(getByTestId('jest-description')).toBeVisible()
    expect(getByTestId('jest-volume')).toBeVisible()
    expect(getByTestId('jest-issueNo')).toBeVisible()
    expect(getByTestId('jest-price')).toBeVisible()
    expect(getByTestId('jest-cta')).toBeVisible()
    expect(getByTestId('jest-authors')).toBeVisible()
    expect(getByTestId('jest-sharebutton')).toBeVisible()
  })

  it('component renders the content when populated', () => {
    const screen = render(
      <IssueBannerTitle
        testId={testId}
        tag={tag}
        landing={landing}
        ctaLabel={ctaLabel}
        ctaLink={ctaLink}
        ctaTarget={ctaTarget}
        authors={authors}
        description={description}
        issueNo={issueNo}
        volumeNo={volumeNo}
        bookVersion={bookVersion}
        title={title}
        slug={slug}
        imgUrl={imgUrl}
      />
    )

    expect(screen.getByText('Educational Leadership')).toBeInTheDocument()
    expect(screen.getByText('landing title')).toBeInTheDocument()
    expect(screen.getByText('landing subtitle')).toBeInTheDocument()
    expect(screen.getByText('issue title')).toBeInTheDocument()
    expect(screen.getByText('test description')).toBeInTheDocument()
    expect(screen.getByText('Volume 67890')).toBeInTheDocument()
    expect(screen.getByText('Number test issueNo')).toBeInTheDocument()
    expect(screen.getByText('$1234')).toBeInTheDocument()
    expect(screen.getByText('Single Print Issue')).toBeInTheDocument()
    expect(screen.getByText('⚠ Preorder')).toBeInTheDocument()
    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByText('authors-label')).toBeInTheDocument()
  })
})
