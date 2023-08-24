import React from 'react'
import HorizontalSection from './HorizontalSection'

export default {
  component: HorizontalSection,
  title: 'components/HorizontalSection',
}

const Template = (args) => <HorizontalSection {...args} />

const testId = 'jest'
const title = 'Test Title '
const viewAllLink = '/'
const label = '/'
const linkText = '/'
const linkSlug = '/'
const description = 'Test Description'
const date = ''
const authorImage = ''
const authorTitle = 'Test Author Title'
const authorSubtitle = 'Test Author Subtitle '
const imageSlug = ''
const variant = ''

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  title,
  viewAllLink,
  label,
  linkText,
  linkSlug,
  description,
  date,
  authorImage,
  authorTitle,
  authorSubtitle,
  imageSlug,
  variant,
}
ValidInput.storyName = 'With Valid Inputs'
