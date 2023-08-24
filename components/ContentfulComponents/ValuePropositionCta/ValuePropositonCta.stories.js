import React from 'react'
import ValuePropositionCta from './ValuePropositionCta'

export default {
  component: ValuePropositionCta,
  title: 'components/ValuePropositionCta',
}

const Template = (args) => <ValuePropositionCta {...args} />

const testId = 'jest'
const isHeader = false
const toggleVideoBanner = false
const valuepropositions = {}

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  isHeader,
  toggleVideoBanner,
  valuepropositions,
}
ValidInput.storyName = 'With Valid Inputs'
