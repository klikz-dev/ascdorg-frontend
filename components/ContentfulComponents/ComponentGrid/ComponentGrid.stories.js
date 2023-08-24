import React from 'react'
import ComponentGrid from '.'
import { gridMock } from '../../../__mocks__/componentGridMock'

export default {
  component: ComponentGrid,
  title: 'Components/ContentfulComponents/ComponentGrid',
}

const Template = (args) => <ComponentGrid {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Item
export const Item = Template.bind({})
Item.args = {
  ...gridMock,
}
Item.storyName = 'With Item'
