import React from 'react'
import DisplayTime from '../../../components/info/DisplayTime'

export default {
  component: DisplayTime,
  title: 'Components/info/DisplayTime',
}

const Template = (args) => <DisplayTime {...args} />

//Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Invalid Input
export const Invalid = Template.bind({})
Invalid.args = {
  startTime: 'ASCD',
  endTime: 'ABC123',
}
Invalid.storyName = 'With Invalid Input'

// With Valid Input
export const ValidInput = Template.bind({})
ValidInput.args = {
  startTime: '2021-11-23T18:00:00.000-05:00',
  endTime: '2021-11-23T18:00:00.000-10:00',
}
ValidInput.storyName = 'With Valid Input'

// With One Valid Input
export const oneValidInput = Template.bind({})
oneValidInput.args = {
  startTime: '2021-11-23T18:00:00.000-05:00',
}
oneValidInput.storyName = 'With One Valid Input'

// With Valid Input and different Variant
export const VariantValid = Template.bind({})
VariantValid.args = {
  startTime: '2021-11-23T18:00:00.000-05:00',
  endTime: '2021-11-23T18:00:00.000-10:00',
  variant: 'h1',
}
VariantValid.storyName = 'With Valid Input and different Variant'
