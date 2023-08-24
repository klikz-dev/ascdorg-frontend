import React from 'react'
import AccountBanner from '../AccountBanner'

export default {
  component: AccountBanner,
  title: 'Components/molecules/Banners/AccountBanner',
}

const Template = (args) => <AccountBanner {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Title
export const Title = Template.bind({})
Title.args = {
  title: 'David Ryan',
}
Title.storyName = 'With Title'

// With Title and Tab
export const Tab = Template.bind({})
Tab.args = {
  title: 'David Ryan',
  tab: 'account_settings',
}
Tab.storyName = 'With Tab'
