import React from 'react'
import MemberCard from './MemberCard'

export default {
  component: MemberCard,
  title: 'components/MemberCard',
}

const Template = (args) => <MemberCard {...args} />

const testId = 'jest'
const free = ''
const popular = true
const price = 1
const title = ''
const points = []
const id = ''
const ps = ''

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  title,
  free,
  popular,
  price,
  points,
  id,
  ps,
}
ValidInput.storyName = 'With Valid Inputs'
