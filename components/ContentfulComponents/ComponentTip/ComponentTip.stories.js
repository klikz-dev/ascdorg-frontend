import React from 'react'
import ComponentTip from '.'
import { componentTipItem } from '../../../__mocks__/componentTipMock'

export default {
  component: ComponentTip,
  title: 'Components/ContentfulComponents/ComponentTip',
}

const Template = (args) => <ComponentTip {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Item
export const Item = Template.bind({})
Item.args = {
  ...componentTipItem,
}
Item.storyName = 'With Item'
