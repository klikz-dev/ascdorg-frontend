import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { searchState } from '../../../__mocks__/searchPageComponentMock'
import { render } from '../../../__test-utils__/test-utils'
import { algoliaAppId, algoliaSearchApiKey } from '../../../lib/algolia'
import Search from './Search'

const searchClient = algoliasearch(algoliaAppId, algoliaSearchApiKey)

describe('<Search/>', () => {
  it('Component rendered successfully', () => {
    const { getByTestId } = render(
      <Search
        testId='jest'
        searchState={searchState}
        onSearchStateChange={() => null}
        createURL={() => null}
        indexName='ascd_stage'
        searchClient={searchClient}
      />
    )

    expect(getByTestId('jest')).toBeVisible()
  })
})
