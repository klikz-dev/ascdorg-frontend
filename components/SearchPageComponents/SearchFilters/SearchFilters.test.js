import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-dom'
import { searchRefinementsArray } from '../../../__mocks__/searchPageComponentMock'
import { render, within } from '../../../__test-utils__/test-utils'
import { algoliaAppId, algoliaSearchApiKey } from '../../../lib/algolia'
import SearchFilters from './SearchFilters'

const searchClient = algoliasearch(algoliaAppId, algoliaSearchApiKey)

describe('<SearchFilters />', () => {
  it('component renders with all search refinements', () => {
    const { getByTestId } = render(
      <InstantSearch searchClient={searchClient}>
        <SearchFilters
          testId='jest'
          searchRefinementsArray={searchRefinementsArray}
        />
      </InstantSearch>
    )
    const component = getByTestId('jest')
    expect(component).toBeVisible()
    const refinements = within(component).getAllByTestId('jest-refinement')
    expect(refinements.length).toBe(5)
  })
})
