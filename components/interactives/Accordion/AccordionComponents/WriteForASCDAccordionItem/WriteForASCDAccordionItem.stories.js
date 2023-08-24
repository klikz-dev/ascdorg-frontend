import React from 'react'
import WriteForASCDAccordionItem from '.'
import { writeForASCDItem } from '../../../../../__mocks__/accordionMock'

export default {
  title: 'WriteForASCDAccordionItem',
  component: WriteForASCDAccordionItem,
}

const Template = (args) => <WriteForASCDAccordionItem {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

export const WithHits = Template.bind({})
WithHits.args = {
  ...Default.args,
  item: writeForASCDItem,
}
WithHits.storyName = 'With Item'
