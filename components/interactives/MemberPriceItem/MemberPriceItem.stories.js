import React from 'react'
import MemberPriceItem from './MemberPriceItem'

export default {
  component: MemberPriceItem,
  description: 'components/interactives/MemberPriceItem',
}

const Template = (args) => <MemberPriceItem {...args} />

const description = ''
const checkIcon = true
const infoIcon = true
const testId = 'jest'
const popoverMessage = ''

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Pricing Item Tile
export const PriceItem = Template.bind({})
PriceItem.args = {
  description,
  checkIcon,
  infoIcon,
  testId,
  popoverMessage,
}
PriceItem.storyName = 'With Valid Inputs'
