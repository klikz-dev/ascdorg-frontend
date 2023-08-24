import React from 'react'
import PdfTitleBar from './PdfTitleBar'

export default {
  component: PdfTitleBar,
  title: 'components/PdfTitleBar',
}

const Template = (args) => <PdfTitleBar {...args} />

const testId = 'jest'
const title = 'Test Title '
const volume = ''
const number = ''
const issueDate = ''

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  title,
  volume,
  number,
  issueDate,
}
ValidInput.storyName = 'With Valid Inputs'
