import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import ProfileSearch from '.'
import { searchState } from '../../../__mocks__/searchPageComponentMock'
import { algoliaAppId, algoliaSearchApiKey } from '../../../lib/algolia'

const searchClient = algoliasearch(algoliaAppId, algoliaSearchApiKey)

export default {
  component: ProfileSearch,
  title: 'Components/SearchPageComponents/ProfileSearch',
}

const Template = (args) => <ProfileSearch {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// ProfileSearch State
export const SearchState = Template.bind({})
SearchState.args = {
  searchState,
  onSearchStateChange: () => null,
  createURL: () => null,
  indexName: 'ascd_stage',
  searchClient,
}
SearchState.storyName = 'SearchState'
