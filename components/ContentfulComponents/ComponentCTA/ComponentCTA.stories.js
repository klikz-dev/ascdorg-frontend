import React from 'react'
import ComponentCTA from '.'
import { componentCTAItem } from '../../../__mocks__/componentCTAMock'

export default {
  component: ComponentCTA,
  title: 'Components/ContentfulComponents/ComponentCTA',
}

const Template = (args) => <ComponentCTA {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Item
export const Item = Template.bind({})
Item.args = {
  ...componentCTAItem,
}
Item.storyName = 'With Item'
