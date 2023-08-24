import React from 'react'
import ComponentTwoColumnCta from '.'
import { item } from '../../../__mocks__/componentTwoColumnCtaMock'

export default {
  component: ComponentTwoColumnCta,
  title: 'Components/ContentfulComponents/ComponentTwoColumnCta',
}

const Template = (args) => <ComponentTwoColumnCta {...args} />

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
