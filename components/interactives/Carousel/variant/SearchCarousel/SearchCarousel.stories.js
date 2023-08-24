import React from 'react'
import SearchCarousel from './SearchCarousel'

export default {
  component: SearchCarousel,
  title: 'components/interactives/Carousel/variant/SearchCarousel',
}

const Template = (args) => <SearchCarousel {...args} />

const indexName = 'ascd_stage'
const type = 'blog'
const topics = ''
const dateLowerRange = ''
const dateUpperRange = ''
const keywords = ''
const authors = ''
const title = 'test'
const ctaLink = '/'
const ctaLabel = 'test'
const ctaTarget = '_blank'
const featured = ''
const scrollByAmount = 1

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  indexName,
  topics,
  type,
  dateLowerRange,
  dateUpperRange,
  keywords,
  authors,
  title,
  ctaLink,
  ctaLabel,
  ctaTarget,
  featured,
  scrollByAmount,
}
ValidInput.storyName = 'With Valid Inputs'
