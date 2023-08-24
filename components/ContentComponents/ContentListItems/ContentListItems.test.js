import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, screen } from '../../../__test-utils__/test-utils'
import ContentListItems from './ContentListItems'
describe('<ContentListItems />', () => {
  const items = [
    {
      title: "Reader's Guide / Lighting a Rocky Path",
      slug: 'lighting-a-rocky-path',
      image: {
        alternate: "Reader's Guide (stock thumbnail)",
        title: "Reader's Guide (stock thumbnail)",
        imageContentful: null,
        imageBynder: [
          {
            archive: 0,
            brandId: '2154F1D0-CD10-4BE9-8B8E3480E8546AB1',
            copyright: 'Grinbox / Shutterstock',
            dateCreated: '2022-05-02T12:04:14Z',
            dateModified: '2022-05-02T12:12:08Z',
            datePublished: '2021-07-26T14:43:08Z',
            description: null,
            extension: ['jpg'],
            fileSize: 891244,
            height: 920,
            id: '3F4613F8-AC2B-485B-99D0CD378B9590B0',
            isPublic: 0,
            limited: 0,
            name: "2022_Reader'sGuide",
            orientation: 'landscape',
            original: null,
            thumbnails: {
              webimage:
                'https://library.ascd.org/m/16ca03f7bca5fa73/webimage-2022_Reader-sGuide.jpg',
              thul: 'https://library.ascd.org/m/16ca03f7bca5fa73/thul-2022_Reader-sGuide.jpg',
              mini: 'https://library.ascd.org/m/16ca03f7bca5fa73/mini-2022_Reader-sGuide.jpg',
            },
            type: 'image',
            watermarked: 0,
            width: 1700,
            videoPreviewURLs: [],
            tags: [],
            src: 'https://library.ascd.org/m/16ca03f7bca5fa73/webimage-2022_Reader-sGuide.jpg',
          },
        ],
      },
      premium: false,
      topic: {
        title: 'Curriculum',
      },
      authros: {
        items: [
          {
            title: 'Naomi Thiers',
            firstName: 'Naomi',
            lastName: 'Thiers',
          },
        ],
      },
      issueDate: '2022-05-01T00:00:00.000Z',
      elArticleType: 'Feature Articles',
    },
    {
      title: "Paul Tough on Fixing Higher Education's Broken System",
      slug: 'paul-tough-on-fixing-higher-educations-broken-system',
      image: {
        alternate:
          'illustration of a massive apple core surrounded by scaffolding and workers moving building blocks',
        title: 'May 2022 Tough thumbnail',
        imageContentful: null,
        imageBynder: [
          {
            id: '77752913-2A2A-4835-9058D7D39867DB72',
            src: 'https://library.ascd.org/m/7e465ff6de0628cf/webimage-0522_a1203ir1358-CHRIS-GASH-_-THEiSPOT.jpg',
            name: '0522_a1203ir1358-CHRIS GASH _ THEiSPOT',
            tags: [],
            type: 'image',
            width: 1700,
            height: 920,
            archive: 0,
            brandId: '2154F1D0-CD10-4BE9-8B8E3480E8546AB1',
            limited: 0,
            fileSize: 1110710,
            isPublic: 0,
            original: null,
            copyright: 'CHRIS GASH / THEiSPOT',
            extension: ['jpg'],
            thumbnails: {
              mini: 'https://library.ascd.org/m/7e465ff6de0628cf/mini-0522_a1203ir1358-CHRIS-GASH-_-THEiSPOT.jpg',
              thul: 'https://library.ascd.org/m/7e465ff6de0628cf/thul-0522_a1203ir1358-CHRIS-GASH-_-THEiSPOT.jpg',
              webimage:
                'https://library.ascd.org/m/7e465ff6de0628cf/webimage-0522_a1203ir1358-CHRIS-GASH-_-THEiSPOT.jpg',
            },
            dateCreated: '2022-04-06T17:06:32Z',
            description: 'May EL 2022',
            orientation: 'landscape',
            watermarked: 0,
            dateModified: '2022-04-06T17:06:32Z',
            datePublished: '2022-05-01T04:00:00Z',
            videoPreviewURLs: [],
          },
        ],
      },
      premium: true,
      topic: {
        title: 'Equity',
      },
      authros: {
        items: [
          {
            title: 'Kate Stoltzfus',
            firstName: 'Kate',
            lastName: 'Stoltzfus',
          },
        ],
      },
      issueDate: '2022-05-01T00:00:00.000Z',
      elArticleType: 'Feature Articles',
    },
  ]
  it('CartTitle renders', () => {
    const { getByTestId } = render(
      <ContentListItems testId='jest' items={items} variant='article' />
    )
    expect(
      screen.getByText("Reader's Guide / Lighting a Rocky Path")
    ).toBeInTheDocument()
    expect(getByTestId('jest')).toBeVisible()
  })
})
