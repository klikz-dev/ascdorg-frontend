import React from 'react'
import IssueBannerTitle from './IssueBannerTitle'

export default {
  component: IssueBannerTitle,
  title: 'components/IssueBannerTitle',
}

const Template = (args) => <IssueBannerTitle {...args} />

const testId = 'jest'
const tag = 'test tag'
const issue = {
  title: 'issue title',
  slug: '/',
  imgUrl: '/',
  description: 'test description',
  metadata: {
    issueNo: 'test issueNo',
    volumeNo: '67890',
  },
  bookVersion: {
    priceMember: '1234',
  },
}
const landing = {
  title: 'landing title',
  subtitle: 'landing subtitle',
}
const ctaLabel = 'Test Label'
const ctaLink = '/'
const ctaTarget = ''
const authors = {
  images: [],
  ctaLabel: 'authors-label',
  ctaLink: '/',
}

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  tag,
  issue,
  landing,
  ctaLabel,
  ctaLink,
  authors,
  ctaTarget,
}
ValidInput.storyName = 'With Valid Inputs'
