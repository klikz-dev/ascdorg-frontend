import React from 'react'
import ComponentButton from '.'

export default {
  component: ComponentButton,
  title: 'Components/ContentfulComponents/ComponentButton',
}

const Template = (args) => <ComponentButton {...args} />

const label = 'Learn About the Whole Child'
const url =
  'https://professional-development.ascd.org/whole-child-implementations'

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Item
export const Item = Template.bind({})
Item.args = {
  label,
  url,
}
Item.storyName = 'With Item'
