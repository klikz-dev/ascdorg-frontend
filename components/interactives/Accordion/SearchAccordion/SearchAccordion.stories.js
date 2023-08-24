import React from 'react'
import SearchAccordion from '.'
import AccordionItem from '../AccordionComponents/AccordionItem'

export default {
  title: 'SearchAccordion',
  component: SearchAccordion,
}

const hits = [
  {
    date: 2022,
    type: 'futureIssues',
    title: 'February 2022: Equity Every Day',
    deadline: 'September 1, 2021',
    details: {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              marks: [
                {
                  type: 'bold',
                },
              ],
              value: 'Equity Every Day',
              nodeType: 'text',
            },
          ],
          nodeType: 'paragraph',
        },
      ],
    },
    __position: 1,
  },
  {
    date: 2021,
    type: 'futureIssues',
    title: 'May 2022: Ready for the Real World?',
    deadline: 'December 1, 2021',
    details: {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              marks: [
                {
                  type: 'bold',
                },
              ],
              value: 'Ready for the Real World?',
              nodeType: 'text',
            },
          ],
          nodeType: 'paragraph',
        },
      ],
    },
    __position: 2,
  },
]

const Template = (args) => <SearchAccordion {...args} />

/* Can make future stories that involve other Search Items */
export const Default = Template.bind({})
Default.args = { SearchItem: AccordionItem }
Default.storyName = 'Blank'

export const WithHits = Template.bind({})
WithHits.args = {
  ...Default.args,
  hits: hits,
}
WithHits.storyName = "With 'Hits'"
