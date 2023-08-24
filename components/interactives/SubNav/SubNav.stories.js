import React from 'react'
import SubNav from './SubNav'

export default {
  component: SubNav,
  title: 'components/interactives/SubNav',
}

const Template = (args) => <SubNav {...args} />

const items = [
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
  items,
}
ValidInput.storyName = 'With Valid Inputs'
