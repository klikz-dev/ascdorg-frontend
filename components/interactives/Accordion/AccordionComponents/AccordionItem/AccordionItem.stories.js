import React from 'react'
import AccordionItem from '.'

export default {
  title: 'AccordionItem',
  component: AccordionItem,
}

const Template = (args) => <AccordionItem {...args} />
const item = {
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
      {
        data: {},
        content: [
          {
            data: {},
            marks: [],
            value:
              "College and career readiness has long been an aspirational focus of schools. But with so much variability in students' postsecondary options and pathways, that preparation can be a tall and continually shifting task. This issue will examine how educators can better support students in navigating a multilayered system of postsecondary choices and directions, including through college preparation; career and technical education (including STEM-focused programs); apprenticeships and internships; and financial and vocational information programs. Although focused on secondary education, this issue will also look at P–16 or P–20 models. In what ways does education need to change to prepare young people today for their futures?",
            nodeType: 'text',
          },
        ],
        nodeType: 'paragraph',
      },
      {
        data: {},
        content: [
          {
            data: {},
            marks: [
              {
                type: 'italic',
              },
            ],
            value: 'Submissions Deadline: December 1, 2021',
            nodeType: 'text',
          },
        ],
        nodeType: 'paragraph',
      },
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
            value: 'How to Prepare Your Manuscript',
            nodeType: 'text',
          },
        ],
        nodeType: 'paragraph',
      },
      {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: 'Double-space all copy and number all pages.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
            ],
            nodeType: 'list-item',
          },
          {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Indicate the number of words in the manuscript, including references and figures.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
            ],
            nodeType: 'list-item',
          },
          {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Include your name, address, phone number, and email address at the top of the manuscript. Also include names and email addresses of any coauthors.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
            ],
            nodeType: 'list-item',
          },
          {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Include a two- or three-sentence bio for each author at the end of the manuscript. ',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
            ],
            nodeType: 'list-item',
          },
        ],
        nodeType: 'unordered-list',
      },
      {
        data: {},
        content: [
          {
            data: {},
            marks: [],
            value: 'We use the reference style outlined by the ',
            nodeType: 'text',
          },
          {
            data: {},
            marks: [
              {
                type: 'italic',
              },
            ],
            value:
              'Publication Manual of the American Psychological Association',
            nodeType: 'text',
          },
          {
            data: {},
            marks: [],
            value:
              '.  Cite references in the text like this (Jones, 2000) and list them in a  bibliography at the end of the article. Please do not use footnotes or  endnotes for the references.\n\nAuthors bear full responsibility for the accuracy of citations, quotations, figures, and facts.\n\n',
            nodeType: 'text',
          },
        ],
        nodeType: 'paragraph',
      },
    ],
    nodeType: 'document',
  },
  filterDate: '2022-05-01',
  filterTopic: 'Engagement',
}

export const Default = Template.bind({})
Default.args = {
  item: item,
}
Default.storyName = 'Default'

export const OpenCloseLabels = Template.bind({})
OpenCloseLabels.args = {
  ...Default.args,
  collapseText: 'Close',
  expandText: 'Open',
}
OpenCloseLabels.storyName = 'With Open Close Labels'

export const Button = Template.bind({})
Button.args = {
  ...Default.args,
  hasButton: true,
  buttonLabel: 'test',
  buttonLink: '',
}
Button.storyName = 'Has a Button With a Link'
