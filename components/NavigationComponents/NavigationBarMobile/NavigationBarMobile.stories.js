import React from 'react'
import { ApolloProvider } from '@apollo/client'
import NavigationBarMobile from '.'
import { client } from '../../../lib/apollo-client'

export default {
  component: NavigationBarMobile,
  title: 'Components/NavigationBarMobile',
}

const Template = (args) => (
  <ApolloProvider client={client}>
    <NavigationBarMobile {...args} />
  </ApolloProvider>
)

const openSearchPopover = () => null
const closeSearchPopover = () => null
const triggerSearch = () => null
const onEnterKeyPress = () => null
const setSearchPopoverValue = () => null
const setDrawerOpen = () => null

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Props
export const WithProps = Template.bind({})
WithProps.args = {
  openSearchPopover,
  closeSearchPopover,
  triggerSearch,
  onEnterKeyPress,
  setSearchPopoverValue,
  setDrawerOpen,
  drawerOpen: true,
  searchPopover: null,
  searchPopoverValue: '',
  selectedTopics: [{ fields: { title: 'topics' } }],
  grades: [{ fields: { title: 'grades' } }],
  subjects: [{ fields: { title: 'subjects' } }],
}
WithProps.args = 'With Props'
