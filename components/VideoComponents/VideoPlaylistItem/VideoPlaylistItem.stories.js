import React from 'react'
import { videoItem } from '../../../__mocks__/VideoPlaylistItemMock'
import VideoPlaylistItem from './VideoPlaylistItem'

export default {
  component: VideoPlaylistItem,
  title: 'components/VideoPlaylistItem',
}

const Template = (args) => <VideoPlaylistItem {...args} />

const testId = 'jest'
const number = 1
const item = videoItem

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  item,
  number,
}
ValidInput.storyName = 'With Valid Inputs'
