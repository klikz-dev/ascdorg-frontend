import React from 'react'
import HorizontalCard from './HorizontalCard'

export default {
  component: HorizontalCard,
  title: 'components/HorizontalCard',
}

const Template = (args) => <HorizontalCard {...args} />

const premium = true
const label = 'TEST'
const title = 'TEST'
const authorName = 'TEST'
const date = ''
const price = ''
const image = ''
const ctaLink = '/'
const body = 'TEST'
const reverse = false
const variant = 'event'
const noImage = false
const lines = 2

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  premium,
  label,
  title,
  authorName,
  date,
  price,
  image,
  ctaLink,
  body,
  reverse,
  variant,
  noImage,
  lines,
}
ValidInput.storyName = 'With Valid Inputs'
