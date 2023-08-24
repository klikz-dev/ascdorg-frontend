import React from 'react'
import ContentCardListing from './ContentCardListing'

export default {
  component: ContentCardListing,
  title: 'Components/ContentCardListing',
}

const testId = 'jest'
const item = {
  sys: {
    contentType: {
      sys: {
        id: 'video',
      },
    },
  },

  title: 'Show & Tell: A Video Column / Rebuilding Teacher Efficacy',
  slug: 'show-and-tell-a-video-column-rebuilding-teacher-efficacy',
  premium: true,
  featured: false,
  date: '2021-11-01T00:00-04:00',
  topic: {
    title: 'Professional Learning',
  },
  description: {
    data: {},
    content: [
      {
        data: {},
        content: [
          {
            data: {},
            marks: [],
            value:
              'Watch teachers at Health Sciences High share what they learned this past year.',
            nodeType: 'text',
          },
        ],
        nodeType: 'paragraph',
      },
    ],
    nodeType: 'document',
  },
  videoId: 'tm75fi05x6',
  thumbnail: {
    sys: {
      space: {
        sys: {
          type: 'Link',
          linkType: 'Space',
          id: 'cguvp07qpj80',
        },
      },
      type: 'Entry',
      id: '1FVD5IrPFyvNgeqwd78ymi',
      contentType: {
        sys: {
          type: 'Link',
          linkType: 'ContentType',
          id: 'image',
        },
      },
      locale: 'en-US',
    },
  },
}

const Template = (args) => <ContentCardListing {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  ...item,
}
ValidInput.storyName = 'With Valid Inputs'
