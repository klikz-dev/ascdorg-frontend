import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-dom'
import { render } from '../../../__test-utils__/test-utils'
import { algoliaAppId, algoliaSearchApiKey } from '../../../lib/algolia'
import CurrentRefinements from './CustomCurrentRefinements'

const searchClient = algoliasearch(algoliaAppId, algoliaSearchApiKey)

describe('<CurrentRefinements/>', () => {
  it('Component rendered successfully', () => {
    const { getByTestId } = render(
      <InstantSearch searchClient={searchClient}>
        <CurrentRefinements
          testId='jest'
          items={[]}
          refine={() => null}
          createURL={() => null}
        />
      </InstantSearch>
    )

    expect(getByTestId('jest')).toBeVisible()
  })
})
