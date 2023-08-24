import React from 'react'
import RegisterNowButton from '.'

export default {
  component: RegisterNowButton,
  title: 'Components/ContentfulComponents/RegisterNowButton',
}

const Template = (args) => <RegisterNowButton {...args} />

const item = {
  buttonAdministrativeTitle: 'Media contact',
  buttonStyle: ['Button (default)'],
  linkUrl: 'mailto:communications@ascd.org',
  linkLabel: 'Contact',
  linkTarget: 'piano',
  id: 'Digital-Premium',
}

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Item
export const Item = Template.bind({})
Item.args = {
  ...item,
}
Item.storyName = 'With Item'
