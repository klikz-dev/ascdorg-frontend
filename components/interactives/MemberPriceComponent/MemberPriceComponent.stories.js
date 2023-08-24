import React from 'react'
import MemberPriceComponent from './MemberPriceComponent'

export default {
  component: MemberPriceComponent,
  title: 'components/interactives/MemberPriceComponent',
}

const Template = (args) => <MemberPriceComponent {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Pricing Item Tile
export const MemberPriceDefault = Template.bind({})
MemberPriceDefault.args = {}
MemberPriceDefault.storyName = 'With Default Inputs'
