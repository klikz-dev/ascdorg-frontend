import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import {
  bookHit,
  collectionHit,
  eventHit,
  pageHit,
  pressReleaseHit,
  podcastHit,
  videoHit,
  articleHit,
} from '../../../__mocks__/searchPageComponentMock'
import { render } from '../../../__test-utils__/test-utils'
import HitComponent from './HitComponent'

describe('<HitComponent />', () => {
  /** Checking all hit types */
  for (const hit in [
    bookHit,
    collectionHit,
    eventHit,
    pageHit,
    pressReleaseHit,
    podcastHit,
    videoHit,
    articleHit,
  ]) {
    it('component renders with hit', () => {
      const { getByTestId } = render(<HitComponent testId='jest' hit={hit} />)
      expect(getByTestId('jest')).toBeVisible()
    })
  }
})
