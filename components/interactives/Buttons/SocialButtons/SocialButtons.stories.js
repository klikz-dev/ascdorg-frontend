import React from 'react'
import SocialButtons from './SocialButtons'

export default {
  component: SocialButtons,
  title: 'components/SocialButtons',
}

const Template = (args) => <SocialButtons {...args} />

const testId = 'jest'

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
}
ValidInput.storyName = 'With Valid Inputs'
