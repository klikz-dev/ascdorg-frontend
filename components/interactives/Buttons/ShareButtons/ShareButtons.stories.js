import React from 'react'
import ShareButtons from './ShareButtons'

export default {
  component: ShareButtons,
  title: 'components/ShareButtons',
}

const Template = (args) => <ShareButtons {...args} />

const testId = ' jest'
const url = '/'
const title = 'Test Title'
const showEmailLink = '/'

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  url,
  title,
  showEmailLink,
}
ValidInput.storyName = 'With Valid Inputs'
