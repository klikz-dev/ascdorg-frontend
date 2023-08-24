import React from 'react'
import ComponentTwoColumnContentList from '.'
import { item } from '../../../__mocks__/componentTwoColContentListMock'
export default {
  component: ComponentTwoColumnContentList,
  title: 'Components/ContentfulComponents/ComponentTwoColumnContentList',
}

const Template = (args) => <ComponentTwoColumnContentList {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Item
export const Item = Template.bind({})
Item.args = {
  ...item,
}
Item.storyName = 'With Item'
