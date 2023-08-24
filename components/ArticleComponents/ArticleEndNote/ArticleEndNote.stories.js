import React from 'react'
import ArticleEndNote from '.'

export default {
  component: ArticleEndNote,
  title: 'Components/ArticleEndNote',
}

const notes = {
  data: {},
  content: [
    {
      data: {},
      content: [
        {
          data: {},
          marks: [],
          value: 'Bandura, A. (1994). ',
          nodeType: 'text',
        },
        {
          data: {},
          marks: [
            {
              type: 'italic',
            },
          ],
          value: 'Self-efficacy',
          nodeType: 'text',
        },
        {
          data: {},
          marks: [],
          value: '. In V. S. Ramachaudran (Ed.), ',
          nodeType: 'text',
        },
        {
          data: {},
          marks: [
            {
              type: 'italic',
            },
          ],
          value: 'Encyclopedia of human behavior',
          nodeType: 'text',
        },
        {
          data: {},
          marks: [],
          value:
            ' (Vol. 4, pp. 71–81). New York: Academic Press. (Reprinted in H. Friedman [Ed.], ',
          nodeType: 'text',
        },
        {
          data: {},
          marks: [
            {
              type: 'italic',
            },
          ],
          value: 'Encyclopedia of mental health',
          nodeType: 'text',
        },
        {
          data: {},
          marks: [],
          value: '. San Diego, CA: Academic Press, 1998).',
          nodeType: 'text',
        },
      ],
      nodeType: 'paragraph',
    },
  ],
  nodeType: 'document',
}

const Template = (args) => <ArticleEndNote {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Title and Notes
export const TitleNotes = Template.bind({})
TitleNotes.args = {
  title: 'Test',
  notes: notes,
}
TitleNotes.storyName = 'With Title & Notes'
