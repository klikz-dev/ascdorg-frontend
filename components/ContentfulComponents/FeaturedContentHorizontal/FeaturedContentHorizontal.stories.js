import React from 'react'
import FeaturedContentHorizontal from '.'
import { featuredContentHorizontalItem } from '../../../__mocks__/featuredContentHorizontal'
export default {
  component: FeaturedContentHorizontal,
  title: 'Components/ContentfulComponents/FeaturedContentHorizontal',
}

const Template = (args) => <FeaturedContentHorizontal {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Item
export const Item = Template.bind({})
Item.args = {
  ...featuredContentHorizontalItem,
}
Item.storyName = 'With Item'
