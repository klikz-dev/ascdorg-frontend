import React from 'react'
import HorizontalCarousel from './HorizontalCarousel'

export default {
  component: HorizontalCarousel,
  title: 'components/interactives/Carousel/variant/HorizontalCarousel',
}

const Template = (args) => <HorizontalCarousel {...args} />

const content = []
const title = 'test title'
const ctaLink = '/'
const ctaLabel = 'Test'
const ctaTarget = '_blank'
const scrollByAmount = 4
const type = 'books'

// Blank
export const Default = Template.bind({})
Default.args = {
  content,
}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  content,
  title,
  scrollByAmount,
  ctaLink,
  ctaLabel,
  ctaTarget,
  type,
}
ValidInput.storyName = 'With Valid Inputs'
