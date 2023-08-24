import React from 'react'
import PodcastPlayer from './PodcastPlayer'

export default {
  component: PodcastPlayer,
  title: 'components/PodcastPlayer',
}

const Template = (args) => <PodcastPlayer {...args} />

const testId = 'jest'
const sectionTitle = 'Podcast'
const podcast = 'id'
const ctaLink = 'https://www.google.com'

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  sectionTitle,
  ctaLink,
  podcast,
}
ValidInput.storyName = 'With Valid Inputs'
