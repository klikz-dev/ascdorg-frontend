import React from 'react'
import ComponentTwoColCTAText from '.'
import { item } from '../../../__mocks__/componentTwoColCTATextMock'

export default {
  component: ComponentTwoColCTAText,
  title: 'Components/ContentfulComponents/ComponentTwoColCTAText',
}

const Template = (args) => <ComponentTwoColCTAText {...args} />

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
