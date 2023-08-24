import React from 'react'
import SingleItemCarousel from './SingleItemCarousel'

export default {
  component: SingleItemCarousel,
  title: 'components/interactives/Carousel/variant/SingleItemCarousel',
}

const Template = (args) => <SingleItemCarousel {...args} />

const items = [
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
]

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  items,
}
ValidInput.storyName = 'With Valid Inputs'
