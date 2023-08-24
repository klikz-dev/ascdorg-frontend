import React from 'react'
import Toggle from './Toggle'

export default {
  component: Toggle,
  title: 'components/Toggle',
}

const Template = (args) => {
  const leftTitle = 'EL Digital + Print'
  const rightTitle = 'Digital - Only'
  return <Toggle {...args} leftTitle={leftTitle} rightTitle={rightTitle} />
}

export const Default = Template.bind({})
Default.args = {}
