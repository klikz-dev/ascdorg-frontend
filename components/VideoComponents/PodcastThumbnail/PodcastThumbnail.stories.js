import React from 'react'
import PodcastThumbnail from './PodcastThumbnail'

export default {
  component: PodcastThumbnail,
  title: 'components/PodcastThumbnail',
}

const Template = (args) => <PodcastThumbnail {...args} />

const testId = 'jest'
const podcast = {}

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  podcast,
}
ValidInput.storyName = 'With Valid Inputs'
