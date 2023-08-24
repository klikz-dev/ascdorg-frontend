import React from 'react'
import EventCard from './EventCard'

export default {
  component: EventCard,
  title: 'components/EventCard',
}

const Template = (args) => <EventCard {...args} />

const image = '/images/ASCDImageFiller.png'
const alt = ''
const title = 'Test'
const body = ' Test body'
const ctaLabel = 'Test Label'
const ctaLink = '/'
const ctaTarget = ''

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  image,
  alt,
  title,
  body,
  ctaLabel,
  ctaLink,
  ctaTarget,
}
ValidInput.storyName = 'With Valid Inputs'
