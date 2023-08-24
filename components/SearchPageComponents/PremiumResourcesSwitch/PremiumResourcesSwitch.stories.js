import React from 'react'
import PremiumResourcesSwitch from '.'

export default {
  component: PremiumResourcesSwitch,
  title: 'Components/SearchPageComponents/PremiumResourcesSwitch',
}

const Template = (args) => <PremiumResourcesSwitch {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Checked
export const Checked = Template.bind({})
Checked.args = {
  checked: true,
  onChange: () => null,
}
Checked.storyName = 'Checked'
