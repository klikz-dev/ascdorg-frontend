import React from 'react'
import PdfIframe from './PdfIframe'

export default {
  component: PdfIframe,
  title: 'components/PdfIframe',
}

const Template = (args) => <PdfIframe {...args} />

const testId = 'jest'
const title = 'Test Title '
const pdf = ''

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  title,
  pdf,
}
ValidInput.storyName = 'With Valid Inputs'
