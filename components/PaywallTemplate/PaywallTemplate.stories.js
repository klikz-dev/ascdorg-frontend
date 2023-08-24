import React from 'react'
import PaywallTemplate from './PaywallTemplate'

export default {
  component: PaywallTemplate,
  title: 'components/PaywallTemplate',
}

const Template = (args) => <PaywallTemplate {...args} />
const articleCount = 0
const isLoggedIn = true

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  articleCount,
  isLoggedIn,
}
ValidInput.storyName = 'With Valid Inputs'

// For logged in user
export const LoggedInInput = Template.bind({})
LoggedInInput.args = {
  articleCount,
  isLoggedIn: true,
}
LoggedInInput.storyName = 'For logged in user'

// For non-logged in user
export const NonLoggedInInput = Template.bind({})
NonLoggedInInput.args = {
  articleCount,
  isLoggedIn: false,
}
NonLoggedInInput.storyName = 'For non logged in user'
