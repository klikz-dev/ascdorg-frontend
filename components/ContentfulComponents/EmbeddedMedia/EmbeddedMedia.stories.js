import React from 'react'
import EmbeddedMedia from './EmbeddedMedia'

export default {
  component: EmbeddedMedia,
  title: 'components/EmbeddedMedia',
}

const Template = (args) => <EmbeddedMedia {...args} />
const item = {
  displayTitle: 'Test Title',
  wistiaId: '123456',
  radio: 'Video',
}

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  ...item,
}
ValidInput.storyName = 'With Valid Inputs'
