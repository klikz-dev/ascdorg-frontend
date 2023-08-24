import React from 'react'
import VideoPlayer from './VideoPlayer'

export default {
  component: VideoPlayer,
  title: 'components/VideoPlayer',
}

const Template = (args) => <VideoPlayer {...args} />

const sectionTitle = 'Test Title'
const ctaLink = '/'
const video = {
  videoId: 'r7ukx3ez9x',
  topic: 'Assessment',
  title: 'Test Title',
  date: '2021-05-19T00:00-07:00',
}
const autoplay = false
const variant = 'green'
const noTruncate = true

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  sectionTitle,
  ctaLink,
  ...video,
  autoplay,
  variant,
  noTruncate,
}
ValidInput.storyName = 'With Valid Inputs'
