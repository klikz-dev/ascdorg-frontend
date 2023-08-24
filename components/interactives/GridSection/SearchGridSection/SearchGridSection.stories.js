import React from 'react'
import SearchGridSection from '.'

export default {
  component: SearchGridSection,
  title: 'components/interactives/GridSection/SearchGridSection',
}

const Template = (args) => <SearchGridSection {...args} />

const title = 'test'
const indexName = 'ascd_stage'
const contentTypes = ['blog', 'article', 'pubissue']
const topics = ['Engagement']
const keywords = ['Student engagement and motivation']
const authors = ['Educational Leadership Staff']
const lowerDate = '2021-02-11'
const upperDate = '2022-02-11'
const featured = false
const ctaLink = '/'
const ctaLabel = 'TEST'
const ctaTarget = '_blank'

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Text Labels
export const TextLabels = Template.bind({})
TextLabels.args = {
  title,
  indexName,
  ctaLink,
  ctaLabel,
  ctaTarget,
}
TextLabels.storyName = 'With Text Labels'

// Search Values
export const SearchValues = Template.bind({})
SearchValues.args = {
  ...TextLabels.args,
  contentTypes,
  topics,
  keywords,
  lowerDate,
  upperDate,
  featured,
}
SearchValues.storyName = 'With Search Values but no author'

// With Author
export const WithAuthor = Template.bind({})
WithAuthor.args = {
  ...TextLabels.args,
  authors,
}
WithAuthor.storyName = 'NO Values but with author'

// No dates
export const NoDates = Template.bind({})
NoDates.args = {
  ...SearchValues.args,
  lowerDate: undefined,
  upperDate: undefined,
}
NoDates.storyName = 'No Dates'

// No featured
export const NoFeatured = Template.bind({})
NoFeatured.args = {
  ...SearchValues.args,
  featured: undefined,
}
NoFeatured.storyName = 'No Featured'

// No link
export const NoLink = Template.bind({})
NoLink.args = {
  ...SearchValues.args,
  ctaLink: undefined,
}
NoLink.storyName = 'No Link'
