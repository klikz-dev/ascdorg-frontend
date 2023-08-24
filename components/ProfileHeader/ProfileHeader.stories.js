import React from 'react'
import ProfileHeader from './ProfileHeader'

export default {
  component: ProfileHeader,
  title: 'components/ProfileHeader',
}

const Template = (args) => <ProfileHeader {...args} />

const testId = 'jest'
const profile = {
  thumbnail: {
    title: 'Test Thumbnail Title',
  },
  firstName: 'First Name',
  lastName: 'Last Name',
  role: 'role',
  experience: 'experience',
  position: 'position',
  email: 'email',
  linkedIn: '/',
  youTube: '/',
  facebook: '/',
  twitter: '/',
  instagram: '/',
}

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  ...profile,
}
ValidInput.storyName = 'With Valid Inputs'
