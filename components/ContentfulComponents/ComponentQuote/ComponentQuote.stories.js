import React from 'react'
import ComponentQuote from '.'
import { quoteMock } from '../../../__mocks__/componentQuoteMock'
export default {
  component: ComponentQuote,
  title: 'Components/ContentfulComponents/ComponentQuote',
}

const Template = (args) => <ComponentQuote {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Item
export const Item = Template.bind({})
Item.args = {
  ...quoteMock,
}
Item.storyName = 'With Item'
