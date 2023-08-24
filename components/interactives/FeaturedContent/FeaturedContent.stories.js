import React from 'react'
import { featuredContentHorizontalItem } from '../../../__mocks__/featuredContentHorizontal'
import FeaturedContent from './FeaturedContent'

export default {
  component: FeaturedContent,
  title: 'components/interactives/FeaturedContent/FeaturedContent',
}

const Template = (args) => <FeaturedContent {...args} />

const title = featuredContentHorizontalItem.displayTitle
const indexName = featuredContentHorizontalItem.indexName
const contentTypes = featuredContentHorizontalItem.contentTypes
const topics = featuredContentHorizontalItem.topics
const keywords = featuredContentHorizontalItem.keywords
const featuredAuthors = featuredContentHorizontalItem.authors
const lowerDate = featuredContentHorizontalItem.dateLowerRange
const upperDate = featuredContentHorizontalItem.dateUpperRange
const featured = featuredContentHorizontalItem.featured

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Text Labels
export const TextLabels = Template.bind({})
TextLabels.args = {
  title,
  indexName,
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
  featuredAuthors,
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
