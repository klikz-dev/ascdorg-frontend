import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-dom'
import {
  render,
  fireEvent,
  waitFor,
  act,
} from '../../../__test-utils__/test-utils'
import { algoliaAppId, algoliaSearchApiKey } from '../../../lib/algolia'
import SearchBox from './CustomSearchBox'

const searchClient = algoliasearch(algoliaAppId, algoliaSearchApiKey)

describe('<SearchBox>', () => {
  it('Component rendered successfully', () => {
    const { getByTestId } = render(
      <InstantSearch searchClient={searchClient}>
        <SearchBox
          testId='jest'
          currentRefinement={'currentRefinement'}
          refine={() => null}
        />
      </InstantSearch>
    )

    expect(getByTestId('jest')).toBeVisible()
  })

  it('should call refine function when the user types', () => {
    const refine = jest.fn()
    const { getByTestId } = render(
      <InstantSearch searchClient={searchClient}>
        <SearchBox testId='jest' currentRefinement={''} refine={refine} />
      </InstantSearch>
    )
    expect(refine).toHaveBeenCalledTimes(0)
    const input = getByTestId('jest-custom-searchbox')
    waitFor(() => {
      act(() => {
        fireEvent.change(input, { target: { value: 'test' } })
      })
      expect(input.value).toBe('test')
      expect(refine).toHaveBeenCalledTimes(4)
    })
  })
})
