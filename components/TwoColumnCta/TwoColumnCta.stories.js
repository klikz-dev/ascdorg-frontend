import React from 'react'
import TwoColumnCta from './TwoColumnCta'

export default {
  component: TwoColumnCta,
  title: 'components/TwoColumnCta',
}

const Template = (args) => <TwoColumnCta {...args} />

const testId = 'jest'
const label = 'test label'
const title = 'test title'
const description = 'test description'
const descriptionLineNumbers = 1
const date = ''
const ctaLabel1 = 'button label 1'
const ctaLink1 = '/'
const ctaTarget1 = ''
const ctaLabel2 = 'button label 2'
const ctaTarget2 = '/'
const ctaLink2 = ''
const image = ''
const imageAlt = 'image alt test'
const imagePos = 'left'
const snipcart = {}
const variant = 'grey'
const backgroundColor = ''
const imageFrameStyle = 'avatar'

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  label,
  title,
  description,
  descriptionLineNumbers,
  date,
  ctaLabel1,
  ctaLink1,
  ctaTarget1,
  ctaLabel2,
  ctaTarget2,
  ctaLink2,
  image,
  imageAlt,
  imagePos,
  snipcart,
  variant,
  backgroundColor,
  imageFrameStyle,
}
ValidInput.storyName = 'With Valid Inputs'
