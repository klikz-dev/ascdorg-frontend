import React from 'react'
import HubSpotForm from './HubSpotForm'

export default {
  component: HubSpotForm,
  title: 'components/HubSpotForm',
}

const Template = (args) => <HubSpotForm {...args} />

const formId = '02900e4d-c6eb-4056-b5a1-e98dc24949e3'
const testId = 'hubspot-form'

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  formId,
  testId,
}
ValidInput.storyName = 'With Valid Inputs'
