import React from 'react'
import SpotlightCarousel from './SpotlightCarousel'

export default {
  component: SpotlightCarousel,
  title: 'components/interactives/Carousel/variant/SpotlightCarousel',
}

const Template = (args) => <SpotlightCarousel {...args} />

const content = []
const type = 'blog'
const title = 'test'
const autoAdvanceFrequency = 8
const autoAdvance = ''

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  content,
  type,
  title,
  autoAdvanceFrequency,
  autoAdvance,
}
ValidInput.storyName = 'With Valid Inputs'
