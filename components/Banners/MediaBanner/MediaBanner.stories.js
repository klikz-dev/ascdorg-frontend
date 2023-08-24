import React from 'react'
import MediaBanner from './MediaBanner'

export default {
  component: MediaBanner,
  title: 'components/MediaBanner',
}

const Template = (args) => <MediaBanner {...args} />

const testId = 'jest'
const title = 'Test Title'
const subTitle = 'Test Subtitle'

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  title,
  subTitle,
}
ValidInput.storyName = 'With Valid Inputs'
