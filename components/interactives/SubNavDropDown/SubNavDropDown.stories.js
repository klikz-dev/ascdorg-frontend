import React from 'react'
import SubNavDropDown from './SubNavDropDown'

export default {
  component: SubNavDropDown,
  title: 'components/interactives/SubNavDropDown',
}

const Template = (args) => <SubNavDropDown {...args} />

const subNav = [
  {
    linkUrl: '/',
    linkTarget: '_',
    linkLabel: 'Button1',
  },
  {
    linkUrl: '/',
    linkTarget: '_',
    linkLabel: 'Button2',
  },
]

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  subNav,
}
ValidInput.storyName = 'With Valid Inputs'
