import React from 'react'
import TextCta from './TextCta'

export default {
  component: TextCta,
  title: 'components/TextCta',
}

const Template = (args) => <TextCta {...args} />

const testId = 'jest'
const title = 'Test Title'
const titleAlignment = ''
const description = []
const descriptionAlignment = ''
const button = false
const ctaLabel = 'Test Label'
const ctaLink = '/'
const target = ''
const ctaLinks = []
const bgColor = 'primary'
const bgImage = ''
const rounded = ''

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  title,
  titleAlignment,
  description,
  descriptionAlignment,
  button,
  ctaLabel,
  ctaLink,
  target,
  ctaLinks,
  bgColor,
  bgImage,
  rounded,
}
ValidInput.storyName = 'With Valid Inputs'
