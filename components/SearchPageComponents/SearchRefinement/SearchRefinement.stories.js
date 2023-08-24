import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-dom'
import SearchRefinement from '.'
import { searchRefinements } from '../../../__mocks__/searchPageComponentMock'
import { algoliaAppId, algoliaSearchApiKey } from '../../../lib/algolia'

export default {
  component: SearchRefinement,
  title: 'Components/SearchPageComponents/SearchRefinement',
}

const searchClient = algoliasearch(algoliaAppId, algoliaSearchApiKey)

const Template = (args) => (
  <InstantSearch searchClient={searchClient}>
    <SearchRefinement {...args} />
  </InstantSearch>
)

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Category and Attribute
export const Regular = Template.bind({})
Regular.args = { ...searchRefinements[1] }
Regular.storyName = 'With Category and Attribute'

// With Transform item
export const TransformItem = Template.bind({})
TransformItem.args = { ...searchRefinements[0] }
TransformItem.storyName = 'With Transform item'

// With No Refinement
export const NoRefinement = Template.bind({})
NoRefinement.args = { ...searchRefinements[2] }
NoRefinement.storyName = 'With No Refinement'

// With 'Custom Refinement'
export const CustomRefinement = Template.bind({})
CustomRefinement.args = { ...searchRefinements[3] }
CustomRefinement.storyName = 'With Custom Refinement'
