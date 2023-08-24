import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { render, screen } from '../../../__test-utils__/test-utils'
import ContentCardListing from './ContentCardListing'

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
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

describe('Custom ContentCardListing component', () => {
  it('component renders when populated', () => {
    const { getByTestId } = render(
      <ContentCardListing testId={testId} {...item} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-topic')).toBeVisible()
    expect(getByTestId('jest-title')).toBeVisible()
    expect(getByTestId('jest-date')).toBeVisible()
    expect(getByTestId('jest-image')).toBeVisible()
  })

  it('component renders the context', () => {
    render(<ContentCardListing testId={testId} {...item} />)

    expect(screen.getByText('Professional Learning')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Show & Tell: A Video Column / Rebuilding Teacher Efficacy'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        `${timeAgo.format(Date.parse('2021-11-01T00:00-04:00'))}`
      )
    ).toBeInTheDocument()
  })
})
