import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../__test-utils__/test-utils'
import ReadMore from './ReadMore'

describe('<ReadMore />', () => {
  const shortDesc =
    'The issue looks at why "civic literacy"--preparing young people to participate in a democracy--matters and how we can help youth gain the knowledge, dispositions, and skills full citizenship demands. '

  const longDesc =
    'Are U.S. schools falling short in preparing young people to participate in democracy? The question has deep resonance today. This issue will look at why civic literacy matters and how some educators are working to upgrade curriculum and instruction in this traditional but crucial area. How can schools help young people acquire the knowledge, dispositions, and skills that are essential for responsible citizenship in areas such as history and government, scientific literacy, and communication? How can educators meet the challenges created by information overload and the echo chamber of the Internet? How can schools teach students to apply critical thinking and background knowledge to analyze information about current events? How are schools promoting values like curiosity, empathy, and respect for diverse perspectives? We welcome articles on making civics education engaging; teaching students to reflect on their own values and beliefs; and using service learning, place-based learning, and other approaches to empower students. '

  const oneParagraph = {
    data: {},
    content: [
      {
        data: {},
        content: [
          {
            data: {},
            marks: [],
            value:
              "Teachers use traditional incentive and reward systems with the best of intentions. We’re trying to support students' positive behavior and learning. We're hoping to motivate and inspire students to work hard and do well in school. ",
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
              "If everyone behaves, we’ll have a pizza party. The more books you read, the more stickers you'll receive. ",
            nodeType: 'text',
          },
          {
            data: {},
            marks: [],
            value:
              'On the surface, these systems seem to make sense. They may even seem to work. But in the long term, they do not foster intrinsic motivation or a love of learning. In fact, they often have the opposite effect.\r',
            nodeType: 'text',
          },
        ],
        nodeType: 'paragraph',
      },
    ],
    nodeType: 'document',
  }
  const multipleParagraphs = {
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
            value:
              'Packed with practical strategies you can use to create a culture of self-motivation in your school!',
            nodeType: 'text',
          },
          {
            data: {},
            marks: [],
            value: '\r',
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
              "Teachers use traditional incentive and reward systems with the best of intentions. We’re trying to support students' positive behavior and learning. We're hoping to motivate and inspire students to work hard and do well in school. ",
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
              "If everyone behaves, we’ll have a pizza party. The more books you read, the more stickers you'll receive. ",
            nodeType: 'text',
          },
          {
            data: {},
            marks: [],
            value:
              'On the surface, these systems seem to make sense. They may even seem to work. But in the long term, they do not foster intrinsic motivation or a love of learning. In fact, they often have the opposite effect.\r',
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
            value: 'In ',
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
              'Tackling the Motivation Crisis: How to Activate Student Learning Without Behavior Charts, Pizza Parties, or Other Hard-to-Quit Incentive Systems',
            nodeType: 'text',
          },
          {
            data: {},
            marks: [],
            value:
              ', award-winning educator and best-selling author Mike Anderson explains\r',
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
                    value:
                      'The damage done by extrinsic motivation systems and why they are so hard for us to give up.\r',
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
                      'What intrinsic motivation looks like and the six high-impact motivators—autonomy, belonging, competence, purpose, fun, and curiosity—that foster it.\r',
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
                      'How to teach the self-management and self-motivation skills that can make a difference for kids.\r',
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
                      'How to use intrinsic motivation in curricula and instructional strategies, feedback and assessment, and discipline and classroom management. \r',
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
            value:
              "Ultimately, our job as teachers is not to motivate our students. It's to make sure that our classrooms and schools are places that inspire their intrinsic motivation and allow it to flourish. Anderson shows how you can better do that right away—no matter what grade level or subject area you teach.",
            nodeType: 'text',
          },
        ],
        nodeType: 'paragraph',
      },
    ],
    nodeType: 'document',
  }
  it('component renders no Read more', () => {
    const { queryByTestId } = render(
      <ReadMore
        testId='jest'
        title={'Test one paragraph only'}
        short={oneParagraph}
      />
    )
    expect(queryByTestId('jest-read-more')).toBeNull()
    expect(queryByTestId('jest-title')).toBeVisible()
    expect(queryByTestId('jest-content')).toHaveTextContent(
      'Teachers use traditional incentive and reward systems'
    )
  })
  it('component renders no Read more for string', () => {
    const { queryByTestId } = render(
      <ReadMore
        testId='jest'
        title={'Test short string only'}
        short={shortDesc}
      />
    )
    expect(queryByTestId('jest-read-more')).toBeNull()
    expect(queryByTestId('jest-title')).toBeVisible()
    expect(queryByTestId('jest-content')).toHaveTextContent(
      'The issue looks at why'
    )
  })
  it('component renders Read more', () => {
    const { getByTestId } = render(
      <ReadMore
        testId='jest'
        title={'Test multiple paragraphs'}
        short={multipleParagraphs}
      />
    )
    expect(getByTestId('jest-read-more')).toBeVisible()
    expect(getByTestId('jest-title')).toBeVisible()
    expect(getByTestId('jest-content')).toHaveTextContent(
      'Packed with practical strategies'
    )
  })
  it('component renders Read more for string', () => {
    const { getByTestId } = render(
      <ReadMore
        testId='jest'
        title={'Test short/logn string'}
        short={shortDesc}
        long={longDesc}
      />
    )
    expect(getByTestId('jest-read-more')).toBeVisible()
    expect(getByTestId('jest-title')).toBeVisible()
    expect(getByTestId('jest-content')).toHaveTextContent(
      'The issue looks at why'
    )
  })
})
