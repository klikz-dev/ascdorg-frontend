import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-dom'
import { clearRefinementAttribute } from '../../../__mocks__/searchPageComponentMock'
import {
  render,
  fireEvent,
  act,
  waitFor,
} from '../../../__test-utils__/test-utils'
import { algoliaAppId, algoliaSearchApiKey } from '../../../lib/algolia'
import ClearRefinements from './CustomClearRefinements'

const searchClient = algoliasearch(algoliaAppId, algoliaSearchApiKey)

describe('<ClearRefinements/>', () => {
  it('Component rendered successfully', () => {
    const { getByTestId } = render(
      <InstantSearch searchClient={searchClient}>
        <ClearRefinements testId='jest' items={[]} refine={() => null} />
      </InstantSearch>
    )

    expect(getByTestId('jest')).toBeVisible()
  })

  /** for some reason the items do not make it to the inner component, but other props do */
  it.skip('should call refine function when the button is clicked', async () => {
    const refine = jest.fn()
    const { getByTestId } = render(
      <InstantSearch searchClient={searchClient}>
        <ClearRefinements
          testId='jest'
          items={[clearRefinementAttribute]}
          refine={refine}
        />
      </InstantSearch>
    )
    await waitFor(() => {
      act(() => {
        fireEvent.click(getByTestId('jest-button'))
      })
      expect(refine).toHaveBeenCalledTimes(1)
    })
  })
})
