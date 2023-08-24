import React from 'react'
import Profile from '.'
import { profileMock } from '../../../__mocks__/profileMock'

export default {
  component: Profile,
  title: 'Components/ContentfulComponents/Profile',
}

/** @todo: get correct input */
const Template = (args) => <Profile {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Item
export const Item = Template.bind({})
Item.args = {
  ...profileMock,
}
Item.storyName = 'With Item'
