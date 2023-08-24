import React from 'react'
import { searchPopoverItemMock } from '../../../__mocks__/SearchPopoverItemMock'
import SearchPopoverTopicsList from './SearchPopoverTopicsList'

export default {
  component: SearchPopoverTopicsList,
  title: 'components/SearchPopoverTopicsList',
}

const Template = (args) => <SearchPopoverTopicsList {...args} />

const testId = 'search-popover'
const closeSearchPopover = () => null

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  closeSearchPopover,
  searchPopoverItemMock,
}
ValidInput.storyName = 'With Valid Inputs'
