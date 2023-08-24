import React from 'react'
import FAQAccordion from '.'
import AccordionItem from '../AccordionComponents/AccordionItem'

export default {
  title: 'FAQAccordion',
  component: FAQAccordion,
}

const Template = (args) => <FAQAccordion {...args} />

/* Can make future stories that involve other Search Items */
export const Default = Template.bind({})
Default.args = {
  indexName: process.env.NEXT_PUBLIC_ALGOLIA_FAQ_INDEX_ID,
  SearchItem: AccordionItem,
}
Default.storyName = 'Blank'
