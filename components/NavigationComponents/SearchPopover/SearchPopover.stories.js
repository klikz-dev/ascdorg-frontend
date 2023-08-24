import React from 'react'
import { SearchPopover } from './SearchPopover'

export default {
  component: SearchPopover,
  title: 'components/SearchPopover',
}

const Template = (args) => <SearchPopover {...args} />

const testId = 'search-popover'
const searchPopover = true
const closeSearchPopover = () => null
const searchPopoverValue = ''
const setSearchPopoverValue = () => null
const resetSearchPopoverValue = () => null
const searchPopoverPlaceholder = ''
const triggerSearch = () => null
const onEnterKeyPress = () => null
const onCancelKeyPress = () => null
const topics = [
  {
    fields: {
      title: 'test tile topic',
    },
  },
]
const grades = [
  {
    fields: {
      title: 'test tile topic',
    },
  },
]
const subjects = [
  {
    fields: {
      title: 'test tile topic',
    },
  },
]

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  searchPopover,
  closeSearchPopover,
  searchPopoverValue,
  setSearchPopoverValue,
  resetSearchPopoverValue,
  searchPopoverPlaceholder,
  triggerSearch,
  onEnterKeyPress,
  onCancelKeyPress,
  topics,
  grades,
  subjects,
}
ValidInput.storyName = 'With Valid Inputs'
