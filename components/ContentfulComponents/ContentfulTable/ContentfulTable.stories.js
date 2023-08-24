import React from 'react'
import { item } from '../../../__mocks__/contentfulTableMock'
import ContentfulTable from './ContentfulTable'
export default {
  component: ContentfulTable,
  title: 'components/ContentfulTable',
}

const Template = (args) => <ContentfulTable {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  ...item,
}
ValidInput.storyName = 'With Valid Inputs'
