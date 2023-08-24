import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import dateFormat from 'dateformat'
import {
  bookHit,
  collectionHit,
  eventHit,
  pageHit,
  pressReleaseHit,
  podcastHit,
  videoHit,
  articleHit,
  bookChapterHit,
  pubissueHit,
  blogHit,
  webinarHit,
  workshopHit,
} from '../../../__mocks__/searchPageComponentMock'
import { render } from '../../../__test-utils__/test-utils'
import { imageoptimization } from '../../../const'
import SearchItem from './SearchItem'

describe('<SearchItem />', () => {
  for (const hit of [
    bookHit,
    collectionHit,
    eventHit,
    pageHit,
    pressReleaseHit,
    podcastHit,
    videoHit,
    articleHit,
    bookChapterHit,
    pubissueHit,
    blogHit,
    webinarHit,
    workshopHit,
  ]) {
    it(`component ${hit.type} renders with hit, title, type, date, thumbnail image`, () => {
      const { getByTestId } = render(<SearchItem testId='jest' hit={hit} />)
      expect(getByTestId('jest')).toBeVisible()
      expect(getByTestId('jest-title')).toHaveTextContent(`${hit.title}`)
      expect(getByTestId('jest-type')).toHaveTextContent(
        `${hit.type === 'pubissue' ? 'Publication' : hit.type}`
      )
      expect(getByTestId('jest-thumbnail')).toHaveAttribute(
        'src',
        `${
          hit.thumbnail
            ? hit.thumbnail +
              '?' +
              imageoptimization.qualityParameter +
              '=' +
              imageoptimization.qualityValue
            : '/images/ASCDImageFiller.png'
        }`
      )
    })
  }

  for (const hit of [
    bookHit,
    collectionHit,
    eventHit,
    pageHit,
    pressReleaseHit,
    podcastHit,
    videoHit,
    articleHit,
    bookChapterHit,
    pubissueHit,
    blogHit,
    webinarHit,
    workshopHit,
  ]) {
    it(`component ${hit.type} link href is correct`, () => {
      const { getByTestId } = render(<SearchItem testId='jest' hit={hit} />)

      expect(getByTestId('jest-link')).toHaveAttribute(
        'href',
        hit.type === 'book'
          ? `${hit.url}?variant=${hit.productNumber}`
          : hit.url
      )
    })
  }

  for (const hit of [
    bookHit,
    collectionHit,
    eventHit,
    podcastHit,
    videoHit,
    articleHit,
    bookChapterHit,
    blogHit,
    webinarHit,
    workshopHit,
  ]) {
    it(`component ${hit.type} renders topic when present in the hit`, () => {
      const { getByTestId } = render(<SearchItem testId='jest' hit={hit} />)
      expect(getByTestId('jest-topic')).toHaveTextContent(
        `${hit.topic[hit.topic.length - 1]}`
      )
    })
  }

  it(`component renders premium when present in the hit`, () => {
    const { getByTestId } = render(<SearchItem testId='jest' hit={bookHit} />)
    expect(getByTestId('jest-premium')).toBeVisible()
  })

  it(`component renders author when present in the hit`, () => {
    const { getByTestId } = render(<SearchItem testId='jest' hit={bookHit} />)
    expect(getByTestId('jest-author')).toHaveTextContent(
      `${bookHit.author.join(', ')}`
    )
  })

  for (const hit of [bookHit, collectionHit]) {
    it(`component ${hit.type} renders special details section`, () => {
      const { getByTestId } = render(<SearchItem testId='jest' hit={hit} />)
      expect(getByTestId('jest-details-section')).toBeVisible()
    })
  }

  it('collection price details tests:', () => {
    const { getByTestId } = render(
      <SearchItem testId='jest' hit={collectionHit} />
    )
    expect(getByTestId('jest-collection-only')).toBeVisible()
    expect(getByTestId('jest-collection-strikethrough')).toHaveTextContent(
      '$117.75'
    )
    expect(getByTestId('jest-collection-discounted')).toHaveTextContent(
      '$105.95'
    )
    expect(
      getByTestId('jest-collection-original-strikethrough')
    ).toHaveTextContent('$93.98')
    expect(
      getByTestId('jest-collection-original-discounted')
    ).toHaveTextContent('$84.02')
    expect(getByTestId('jest-collection-join-now')).toHaveAttribute(
      'href',
      '/memberships'
    )
  })

  it('book price details tests:', () => {
    const { getByTestId } = render(<SearchItem testId='jest' hit={bookHit} />)
    expect(getByTestId('jest-non-collection')).toBeVisible()
    expect(getByTestId('jest-non-collection-other-price')).toHaveTextContent(
      '29.95'
    )
    expect(getByTestId('jest-non-collection-price')).toHaveTextContent(
      '$23.96 member price'
    )
    expect(getByTestId('jest-non-collection-join-now')).toHaveAttribute(
      'href',
      '/memberships'
    )
  })

  for (const hit of [
    bookHit,
    collectionHit,
    eventHit,
    pageHit,
    pressReleaseHit,
    podcastHit,
    articleHit,
    pubissueHit,
    blogHit,
    webinarHit,
  ]) {
    it(`component ${hit.type} renders card date when present`, () => {
      const { getByTestId } = render(<SearchItem testId='jest' hit={hit} />)

      expect(getByTestId('jest-card-date')).toHaveTextContent(
        `${
          !!hit?.dateTimeStamp &&
          dateFormat(
            dateFormat(new Date(hit.dateTimeStamp), 'isoDateTime'),
            'mmmm d, yyyy'
          )
        }`
      )
    })
  }

  for (const hit of [podcastHit, videoHit]) {
    it(`component ${hit.type} renders playbutton`, () => {
      const { getByTestId } = render(<SearchItem testId='jest' hit={hit} />)
      expect(getByTestId('jest-playbutton')).toBeVisible()
    })
  }
})
