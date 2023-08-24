import React from 'react'
import MemberPrice from '.'

export default {
  component: MemberPrice,
  title: 'components/interactives/MemberPrice',
}

const Template = (args) => <MemberPrice {...args} />

const title = 'Digital + Print Basic'
const price = '59*'
const priceCaption = 'annual'
const btnTitle = 'Join Now'
const memberPriceItems = [
  {
    title: 'Print issues of EL magazine.',
  },
  { title: 'Exclusive content, discounts, and more' },
]
const popular = true
const popularTitle = 'MOST POPULAR'

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Pricing Item Tile
export const MemberPriceDefault = Template.bind({})
MemberPriceDefault.args = {
  title,
  price,
  priceCaption,
  btnTitle,
  memberPriceItems,
}
MemberPriceDefault.storyName = 'With Default Inputs'

export const MemberPricePopular = Template.bind({})
MemberPricePopular.args = {
  title,
  price,
  priceCaption,
  btnTitle,
  memberPriceItems,
  popular,
  popularTitle,
}
MemberPricePopular.storyName = 'With Popular Inputs'
