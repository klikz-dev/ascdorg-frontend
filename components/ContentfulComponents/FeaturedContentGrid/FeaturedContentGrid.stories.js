import React from 'react'
import FeaturedContentGrid from '.'
import { featuredContentGridItem } from '../../../__mocks__/featuredContentGridMock'
export default {
  component: FeaturedContentGrid,
  title: 'Components/ContentfulComponents/FeaturedContentGrid',
}

const Template = (args) => <FeaturedContentGrid {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Item
export const Item = Template.bind({})
Item.args = {
  ...featuredContentGridItem,
}
Item.storyName = 'With Item'
