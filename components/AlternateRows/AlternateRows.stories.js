import React from 'react'
import AlternateRows from '.'

export default {
  component: AlternateRows,
  title: 'Components/AlternateRows',
}

const Template = (args) => <AlternateRows {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Title and Rows
export const TitleRows = Template.bind({})
TitleRows.args = {
  title: 'Test Title',
  rows: [{ 'Test-Key': 'Test-Value' }, { 'Test-Key-2': 'Test-Value-2' }],
}
TitleRows.storyName = 'With Title & Rows'
