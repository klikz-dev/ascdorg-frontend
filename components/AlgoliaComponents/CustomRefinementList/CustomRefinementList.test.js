import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-dom'
import { render } from '../../../__test-utils__/test-utils'
import { algoliaAppId, algoliaSearchApiKey } from '../../../lib/algolia'
import RefinementList from './CustomRefinementList'

const searchClient = algoliasearch(algoliaAppId, algoliaSearchApiKey)

describe('<ClearRefinements/>', () => {
  it('Component rendered successfully', () => {
    const { getByTestId } = render(
      <InstantSearch searchClient={searchClient}>
        <RefinementList testId='jest' items={[]} refine={() => null} />
      </InstantSearch>
    )

    expect(getByTestId('jest')).toBeVisible()
  })
  /** @todo: testing is not working for other aspects, finish tests in the future */
})
