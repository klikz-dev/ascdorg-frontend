import React from 'react'
import ButtonLinkComponent from '.'

export default {
  component: ButtonLinkComponent,
  title: 'Components/ContentfulComponents/ButtonLinkComponent',
}

const Template = (args) => <ButtonLinkComponent {...args} />

const buttonStyle = ['Button (default)']
const linkUrl = 'mailto:communications@ascd.org'
const linkLabel = 'Contact'
const linkTarget = '_blank'

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Item
export const Item = Template.bind({})
Item.args = {
  buttonStyle,
  linkUrl,
  linkLabel,
  linkTarget,
}
Item.storyName = 'With Item'

export const buttonStyleColorGray = Template.bind({})
buttonStyleColorGray.args = {
  buttonStyle: ['Color: White w/gray border and black text'],
  linkUrl,
  linkLabel,
  linkTarget,
}
buttonStyleColorGray.storyName = 'With Color Gray'

export const buttonStyleColorPrimary = Template.bind({})
buttonStyleColorPrimary.args = {
  linkUrl,
  linkLabel,
  linkTarget,
  color: 'primary',
}
buttonStyleColorPrimary.storyName = 'With Color Primary'
