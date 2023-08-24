import React from 'react'
import MemberPricing from '.'

export default {
  component: MemberPricing,
  title: 'components/interactives/MemberPricing',
}

const Template = (args) => <MemberPricing {...args} />

const title = 'test'
const items = [
  {
    popular: true,
    popularLabel: 'TEST',
    price: '15',
    title: 'Test title',
    bulletPoints: ['TEST1', 'TEST2', 'TEST3'],
    priceSymbol: true,
    ctaButton1: null,
    ctaButton2: null,
    titleCentered: true,
    bulletPointCentered: true,
  },
  {
    popular: false,
    popularLabel: false,
    price: '15',
    title: 'TEST TITLE',
    bulletPoints: ['TEST1', 'TEST2', 'TEST3'],
    priceSymbol: true,
    ctaButton1: null,
    ctaButton2: null,
    titleCentered: true,
    bulletPointCentered: true,
  },
]

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Pricing Item Tile
export const PricingItem = Template.bind({})
PricingItem.args = {
  title,
  items,
}
PricingItem.storyName = 'With Valid Items'
