import React from 'react'
import HorizontalScroll from './HorizontalScroll'

export default {
  component: HorizontalScroll,
  title: 'components/HorizontalScroll',
}

const Template = (args) => <HorizontalScroll {...args} />
const title = 'Shop Books'
const testId = 'jest'
const ctaLabel = 'View all'
const ctaLink = '/memberships'
const items = [
  {
    issueNo: 7,
    slug: 'feedback-for-impact',
    thumbnail: {
      alternate: 'April 2022 Feedback for Impact thumbnail',
      title: 'April 2022 Feedback for Impact thumbnail',
      imageContentful: null,
      imageBynder: [
        {
          id: '778AFDA2-4942-4686-A5D33F6A292D4C53',
          src: 'https://library.ascd.org/m/1e62d94c49599c90/webimage-elmagazine_FeedbackforImpact.jpg',
          name: 'elmagazine_FeedbackforImpact',
          type: 'image',
          width: 2438,
          height: 3150,
          archive: 0,
          brandId: '2154F1D0-CD10-4BE9-8B8E3480E8546AB1',
          limited: 0,
          fileSize: 724731,
          isPublic: 0,
          original: null,
          copyright: null,
          extension: ['jpg'],
          thumbnails: {
            mini: 'https://library.ascd.org/m/1e62d94c49599c90/mini-elmagazine_FeedbackforImpact.jpg',
            thul: 'https://library.ascd.org/m/1e62d94c49599c90/thul-elmagazine_FeedbackforImpact.jpg',
            webimage:
              'https://library.ascd.org/m/1e62d94c49599c90/webimage-elmagazine_FeedbackforImpact.jpg',
          },
          dateCreated: '2022-03-02T18:43:35Z',
          description: 'Summer 2020 EL images',
          orientation: 'portrait',
          watermarked: 0,
          dateModified: '2022-03-02T18:43:35Z',
          datePublished: '2022-04-01T04:00:00Z',
          videoPreviewURLs: [],
        },
      ],
    },
    volNo: 79,
    publicationDate: '2022-04-01T00:00:00.000Z',
  },
  {
    issueNo: 6,
    slug: 'the-adaptive-leader',
    thumbnail: {
      alternate: 'March 2022 The Adaptive Leader thumbnail',
      title: 'March 2022 The Adaptive Leader thumbnail',
      imageContentful: null,
      imageBynder: [
        {
          id: '6C424A1B-BA6C-4F5C-97669F7FCC391A6C',
          src: 'https://library.ascd.org/m/462b9604fe9b41c7/webimage-elmagazine_0322_TheAdaptive-Leader.jpg',
          name: 'elmagazine_0322_TheAdaptive-Leader',
          type: 'image',
          width: 2438,
          height: 3166,
          archive: 0,
          brandId: '2154F1D0-CD10-4BE9-8B8E3480E8546AB1',
          limited: 0,
          fileSize: 1113659,
          isPublic: 0,
          original: null,
          copyright: null,
          extension: ['jpg'],
          thumbnails: {
            mini: 'https://library.ascd.org/m/462b9604fe9b41c7/mini-elmagazine_0322_TheAdaptive-Leader.jpg',
            thul: 'https://library.ascd.org/m/462b9604fe9b41c7/thul-elmagazine_0322_TheAdaptive-Leader.jpg',
            webimage:
              'https://library.ascd.org/m/462b9604fe9b41c7/webimage-elmagazine_0322_TheAdaptive-Leader.jpg',
          },
          dateCreated: '2022-02-09T18:44:18Z',
          description: 'Summer 2020 EL images',
          orientation: 'portrait',
          watermarked: 0,
          dateModified: '2022-02-09T18:44:18Z',
          datePublished: '2022-03-01T05:00:00Z',
          videoPreviewURLs: [],
        },
      ],
    },
    volNo: 79,
    publicationDate: '2022-03-01T00:00:00.000Z',
  },
]
const type = 'carttile'

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Valid Inputs Labels
export const ValidInput = Template.bind({})
ValidInput.args = {
  testId,
  title,
  ctaLabel,
  ctaLink,
  items,
  type,
}
ValidInput.storyName = 'With Valid Inputs'
