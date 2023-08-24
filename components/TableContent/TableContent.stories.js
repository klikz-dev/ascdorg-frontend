import React from 'react'
import { item } from '../../__mocks__/contentfulTableMock'
import TableContent from './TableContent'

export default {
  component: TableContent,
  title: 'components/TableContent',
}

const Template = (args) => <TableContent {...args} />

const { title, tableRowContent } = item
const item1 = tableRowContent?.items?.[0]?.tableColumnContent?.items
const item2 = tableRowContent?.items

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  title,
  item1,
  item2,
}
ValidInput.storyName = 'With Valid Inputs'
