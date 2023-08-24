import React from 'react'
import MediaTabs from './MediaTabs'

export default {
  component: MediaTabs,
  title: 'components/MediaTabs',
}

const Template = (args) => <MediaTabs {...args} />

const tabValue = ''
const testId = 'jest'

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  tabValue,
  testId,
}
ValidInput.storyName = 'With Valid Inputs'
