import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-dom'
import { searchRefinements } from '../../../__mocks__/searchPageComponentMock'
import { render, waitFor } from '../../../__test-utils__/test-utils'
import { algoliaAppId, algoliaSearchApiKey } from '../../../lib/algolia'
import SearchRefinement from './SearchRefinement'

describe('<SearchRefinement />', () => {
  const searchClient = algoliasearch(algoliaAppId, algoliaSearchApiKey)
  it('component renders when blank', () => {
    const { getByTestId } = render(
      <InstantSearch searchClient={searchClient}>
        <SearchRefinement testId='jest' />
      </InstantSearch>
    )
    expect(getByTestId('jest')).toBeVisible()
  })

  it('component renders a refinement', async () => {
    const { getByTestId, container } = render(
      <InstantSearch searchClient={searchClient} indexName={'ascd_stage'}>
        <SearchRefinement testId='jest' {...searchRefinements[0]} />
      </InstantSearch>
    )
    await waitFor(() => {
      expect(getByTestId('jest-category')).toHaveTextContent('Featured')
      expect(
        container.getElementsByClassName('ais-RefinementList')[0]
      ).toBeVisible()
    })
  })

  it('component renders no refinement when boolean present', () => {
    const { queryByTestId } = render(
      <InstantSearch searchClient={searchClient}>
        <SearchRefinement testId='jest' {...searchRefinements[2]} />
      </InstantSearch>
    )
    expect(queryByTestId('jest-refinement-list')).toBeNull()
  })

  it('component renders custom refinement', async () => {
    const { getByTestId } = render(
      <InstantSearch searchClient={searchClient}>
        <SearchRefinement testId='jest' {...searchRefinements[3]} />
      </InstantSearch>
    )
    await waitFor(() => {
      expect(getByTestId('custom-refinement')).toBeVisible()
    })
  })
})
