import React from 'react'
import SearchFilters from '.'
import { searchRefinementsArray } from '../../../__mocks__/searchPageComponentMock'

export default {
  component: SearchFilters,
  title: 'Components/SearchPageComponents/SearchFilters',
}

const Template = (args) => <SearchFilters {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Search Filters
export const Filters = Template.bind({})
Filters.args = {
  searchRefinementsArray,
}
Filters.storyName = 'With Search Filters'
