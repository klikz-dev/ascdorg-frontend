import React from 'react'
import ProfileSocialButtons from './ProfileSocialButtons'

export default {
  component: ProfileSocialButtons,
  title: 'components/ProfileSocialButtons',
}

const Template = (args) => <ProfileSocialButtons {...args} />

const testId = 'jest'
const instagram = 'Instagram'
const facebook = 'Facebook'
const youtube = 'YouTube'
const linkedin = 'LinkedIn'
const email = 'Email'
const twitter = 'Twitter'
const href = '/'

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInstagramInputs = Template.bind({})
ValidInstagramInputs.args = {
  testId,
  name: instagram,
  href,
}
ValidInstagramInputs.storyName = 'With Valid Instagram Inputs'

// Valid Inputs Labels
export const ValidFacebookInput = Template.bind({})
ValidFacebookInput.args = {
  testId,
  name: facebook,
  href,
}
ValidFacebookInput.storyName = 'With Valid Facebook Inputs'

// Valid Inputs Labels
export const ValidYoutubeInput = Template.bind({})
ValidYoutubeInput.args = {
  testId,
  name: youtube,
  href,
}
ValidYoutubeInput.storyName = 'With Valid YouTube Inputs'

// Valid Inputs Labels
export const ValidLinkedInInput = Template.bind({})
ValidLinkedInInput.args = {
  testId,
  name: linkedin,
  href,
}
ValidLinkedInInput.storyName = 'With Valid LinkedIn Inputs'

// Valid Inputs Labels
export const ValidEmailInput = Template.bind({})
ValidEmailInput.args = {
  testId,
  name: email,
  href,
}
ValidEmailInput.storyName = 'With Valid Email Inputs'

// Valid Inputs Labels
export const ValidTwitterInput = Template.bind({})
ValidTwitterInput.args = {
  testId,
  name: twitter,
  href,
}
ValidTwitterInput.storyName = 'With Valid Twitter Inputs'
