import React from 'react'
import SvgIcon from '.'

export default {
  component: SvgIcon,
  title: 'components/interactives/SvgIcon',
}

const Template = (args) => <SvgIcon {...args} />

const icon = 'MembershipCheckSvg'

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Pricing Item Tile
export const Icon = Template.bind({})
Icon.args = {
  icon,
}
Icon.storyName = 'With Default Inputs'
