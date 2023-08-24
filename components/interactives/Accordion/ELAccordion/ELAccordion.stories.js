import React from 'react'
import ELAccordion from '.'
import AccordionItem from '../AccordionComponents/AccordionItem'

export default {
  title: 'ELAccordion',
  component: ELAccordion,
}

const Template = (args) => <ELAccordion {...args} />

/* Can make future stories that involve other Search Items */
export const Default = Template.bind({})
Default.args = {
  indexName: process.env.NEXT_PUBLIC_ALGOLIA_FAQ_INDEX_ID,
  SearchItem: AccordionItem,
}
Default.storyName = 'Default'
