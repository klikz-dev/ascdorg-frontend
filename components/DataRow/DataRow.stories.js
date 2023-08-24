import React from 'react'
import DataRow from '.'

export default {
  component: DataRow,
  title: 'Components/DataRow',
}

const Template = (args) => <DataRow {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Key and value
export const KeyValue = Template.bind({})
KeyValue.args = {
  keyPair: 'Test  Key',
  value: 'Test Value',
  backgroundColor: 'none',
}
KeyValue.storyName = 'With Key and Value'

// With BackgroundColor
export const BgColor = Template.bind({})
BgColor.args = {
  keyPair: 'Test  Key',
  value: 'Test Value',
  backgroundColor: 'pink',
}
BgColor.storyName = 'With background color'
