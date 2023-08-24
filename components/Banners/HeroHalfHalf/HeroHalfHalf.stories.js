import React from 'react'
import HeroHalfHalf from './HeroHalfHalf'

export default {
  component: HeroHalfHalf,
  title: 'components/HeroHalfHalf',
}

const Template = (args) => <HeroHalfHalf {...args} />

const testId = 'jest'
const label = 'test label'
const title = 'test title'
const description = 'test description'
const date = 'test date'
const time = 'test time'
const ctaLabel1 = 'test cta label'
const ctaLink1 = '/'
const ctaTarget1 = ''
const image = ''
const imageAlt = 'image'
const imagePos = 'center'
const snipcart = ''
const backgroundColor = ''
const imageBorderCornerPosition = ''

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
  date,
  time,
  ctaLabel1,
  ctaLink1,
  ctaTarget1,
  image,
  imageAlt,
  imagePos,
  snipcart,
  backgroundColor,
  imageBorderCornerPosition,
}
ValidInput.storyName = 'With Valid Inputs'
