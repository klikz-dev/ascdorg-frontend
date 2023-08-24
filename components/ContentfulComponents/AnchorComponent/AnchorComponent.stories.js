import React from 'react'
import AnchorComponent from './AnchorComponent'

export default {
  component: AnchorComponent,
  title: 'Components/ContentfulComponents/AnchorComponent',
}

const Template = (args) => <AnchorComponent {...args} />

const id = 'test'

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Fields
export const Fields = Template.bind({})
Fields.args = {
  id,
}
Fields.storyName = 'With Fields'
