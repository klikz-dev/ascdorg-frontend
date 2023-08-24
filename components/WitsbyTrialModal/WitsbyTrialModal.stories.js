import React from 'react'
import WitsbyTrialModal from './WitsbyTrialModal'

export default {
  component: WitsbyTrialModal,
  title: 'Components/WitsbyTrialModal/WitsbyTrialModal',
}

const Template = (args) => <WitsbyTrialModal {...args} />

// Default
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Default'

// With Fields
export const Fields = Template.bind({})
Fields.args = {
  title: 'Test Title',
  text: 'Test text',
  showButton: true,
}
Fields.storyName = 'With Fields'
