import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, within } from '../../__test-utils__/test-utils'
import CardGrid from './CardGrid'

describe('<CardGrid />', () => {
  const items = [
    {
      metadata: {
        tags: [],
      },
      sys: {
        space: {
          sys: {
            type: 'Link',
            linkType: 'Space',
            id: 'cguvp07qpj80',
          },
        },
        id: '680aQ1A92DaejOxtRypa0q',
        type: 'Entry',
        createdAt: '2021-09-27T16:43:03.258Z',
        updatedAt: '2021-09-27T16:50:26.358Z',
        environment: {
          sys: {
            id: 'stage',
            type: 'Link',
            linkType: 'Environment',
          },
        },
        revision: 4,
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'componentGridItem',
          },
        },
        locale: 'en-US',
      },
      fields: {
        title: 'Neil Gupta',
        body: 'Board President\n\nDirector of Secondary Education, Worthington Schools\n\nTerm: July 1, 2019–June 30, 2023\n',
        link: '/people/neil-gupta',
        thumbnail: {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'cguvp07qpj80',
              },
            },
            id: '31sFeljNyyI9lITLaXe6on',
            type: 'Entry',
            createdAt: '2021-09-27T16:10:11.057Z',
            updatedAt: '2021-09-27T16:10:11.057Z',
            environment: {
              sys: {
                id: 'stage',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            contentType: {
              sys: {
                type: 'Link',
                linkType: 'ContentType',
                id: 'image',
              },
            },
            locale: 'en-US',
          },
          fields: {
            title: 'Neil Gupta - ASCD Board of Directors',
            alternate: 'Neil Gupta - ASCD Board of Directors',
            imageBynder: [
              {
                archive: 0,
                brandId: '2154F1D0-CD10-4BE9-8B8E3480E8546AB1',
                copyright: null,
                dateCreated: '2021-09-16T15:00:50Z',
                dateModified: '2021-09-16T15:00:50Z',
                datePublished: '2013-01-24T13:14:31Z',
                description: null,
                extension: ['jpg'],
                fileSize: 6380378,
                height: 4200,
                id: '92A69CAA-A3B0-4B1B-8708145ABA9BB4A9',
                isPublic: 0,
                limited: 0,
                name: 'neil_gupta',
                orientation: 'portrait',
                original: null,
                thumbnails: {
                  webimage:
                    'https://library.ascd.org/m/5e2495cfa0e30342/webimage-neil_gupta.jpg',
                  thul: 'https://library.ascd.org/m/5e2495cfa0e30342/thul-neil_gupta.jpg',
                  mini: 'https://library.ascd.org/m/5e2495cfa0e30342/mini-neil_gupta.jpg',
                },
                type: 'image',
                watermarked: 0,
                width: 2800,
                videoPreviewURLs: [],
                src: 'https://library.ascd.org/m/5e2495cfa0e30342/webimage-neil_gupta.jpg',
              },
            ],
          },
        },
      },
    },
    {
      metadata: {
        tags: [],
      },
      sys: {
        space: {
          sys: {
            type: 'Link',
            linkType: 'Space',
            id: 'cguvp07qpj80',
          },
        },
        id: 'pdwXHWRCwuSi6ypzDSSqh',
        type: 'Entry',
        createdAt: '2021-09-27T16:43:52.964Z',
        updatedAt: '2021-09-27T16:50:41.902Z',
        environment: {
          sys: {
            id: 'stage',
            type: 'Link',
            linkType: 'Environment',
          },
        },
        revision: 3,
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'componentGridItem',
          },
        },
        locale: 'en-US',
      },
      fields: {
        title: 'Avis Williams',
        body: 'Board Vice President\n\nSuperintendent, Selma City Schools\n\nTerm: July 1, 2020–June 30, 2024',
        link: '/people/avis-williams',
        thumbnail: {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'cguvp07qpj80',
              },
            },
            id: '1cSlH9CdL8J43i7VgcNoHK',
            type: 'Entry',
            createdAt: '2021-09-27T16:12:05.112Z',
            updatedAt: '2021-09-27T16:12:05.112Z',
            environment: {
              sys: {
                id: 'stage',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            contentType: {
              sys: {
                type: 'Link',
                linkType: 'ContentType',
                id: 'image',
              },
            },
            locale: 'en-US',
          },
          fields: {
            title: 'Avis Williams - ASCD Board of Directors',
            alternate: 'Avis Williams - ASCD Board of Directors',
            imageBynder: [
              {
                archive: 0,
                brandId: '2154F1D0-CD10-4BE9-8B8E3480E8546AB1',
                copyright: null,
                dateCreated: '2021-06-17T02:20:32Z',
                dateModified: '2021-06-17T02:20:32Z',
                datePublished: '2021-06-17T02:18:47Z',
                description: null,
                extension: ['jpg'],
                fileSize: 587199,
                height: 1481,
                id: '81523CC3-8288-4960-8DB99438F0ED3A57',
                isPublic: 0,
                limited: 0,
                name: 'avis_williams',
                orientation: 'portrait',
                original: null,
                thumbnails: {
                  webimage:
                    'https://library.ascd.org/m/1f0f6a0afba137ce/webimage-avis_williams.jpg',
                  thul: 'https://library.ascd.org/m/1f0f6a0afba137ce/thul-avis_williams.jpg',
                  mini: 'https://library.ascd.org/m/1f0f6a0afba137ce/mini-avis_williams.jpg',
                },
                type: 'image',
                watermarked: 0,
                width: 1252,
                videoPreviewURLs: [],
                src: 'https://library.ascd.org/m/1f0f6a0afba137ce/webimage-avis_williams.jpg',
              },
            ],
          },
        },
      },
    },
    {
      metadata: {
        tags: [],
      },
      sys: {
        space: {
          sys: {
            type: 'Link',
            linkType: 'Space',
            id: 'cguvp07qpj80',
          },
        },
        id: '3PuOHHdiUQhxZG1fuqXNmg',
        type: 'Entry',
        createdAt: '2021-09-27T15:55:02.024Z',
        updatedAt: '2021-09-28T13:53:37.720Z',
        environment: {
          sys: {
            id: 'stage',
            type: 'Link',
            linkType: 'Environment',
          },
        },
        revision: 2,
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'componentGridItem',
          },
        },
        locale: 'en-US',
      },
      fields: {
        title: 'Ranjit Sidhu',
        body: 'ASCD CEO & Executive Director',
        link: '/people/ranjit-sidhu',
        thumbnail: {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'cguvp07qpj80',
              },
            },
            id: '5UI82DvHi4NFzWrLtCl1Kf',
            type: 'Entry',
            createdAt: '2021-07-01T20:06:25.198Z',
            updatedAt: '2021-09-24T20:56:33.322Z',
            environment: {
              sys: {
                id: 'stage',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 2,
            contentType: {
              sys: {
                type: 'Link',
                linkType: 'ContentType',
                id: 'image',
              },
            },
            locale: 'en-US',
          },
          fields: {
            title: 'Ranjit Sidhu',
            alternate: 'Ranjit Sidhu, CEO and President, ASCD',
            imageBynder: [
              {
                archive: 0,
                brandId: '2154F1D0-CD10-4BE9-8B8E3480E8546AB1',
                copyright: 'Katelyn Tucker | Orange Photography',
                dateCreated: '2021-09-16T15:00:51Z',
                dateModified: '2021-09-16T15:00:51Z',
                datePublished: '2017-07-18T13:04:18Z',
                description: null,
                extension: ['jpg'],
                fileSize: 2004421,
                height: 3534,
                id: 'CD98F7CC-7DDA-48E3-BBD138271457CDD5',
                isPublic: 0,
                limited: 0,
                name: 'ranjit_sidhu',
                orientation: 'portrait',
                original: null,
                thumbnails: {
                  webimage:
                    'https://library.ascd.org/m/72d8d516f5dd5beb/webimage-ranjit_sidhu.jpg',
                  thul: 'https://library.ascd.org/m/72d8d516f5dd5beb/thul-ranjit_sidhu.jpg',
                  mini: 'https://library.ascd.org/m/72d8d516f5dd5beb/mini-ranjit_sidhu.jpg',
                },
                type: 'image',
                watermarked: 0,
                width: 3028,
                videoPreviewURLs: [],
                src: 'https://library.ascd.org/m/72d8d516f5dd5beb/webimage-ranjit_sidhu.jpg',
              },
            ],
          },
        },
      },
    },
  ]
  const headerBody = <p>HELLO I AM TEST</p>
  const headerText = '2021–2022 ASCD Board of Directors'
  const pageId = 'governance'

  it('component renders with no items', () => {
    const { getByTestId } = render(<CardGrid testId='jest' />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('component renders when populated', () => {
    const { getByTestId } = render(
      <CardGrid
        testId='jest'
        items={items}
        headerBody={headerBody}
        headerText={headerText}
        pageId={pageId}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('header-body-jest').firstChild).toHaveTextContent(
      'HELLO I AM TEST'
    )
    expect(getByTestId('header-text-jest')).toHaveTextContent(`${headerText}`)
  })

  it('component renders correct number of items', () => {
    const { getByTestId } = render(
      <CardGrid
        testId='jest'
        items={items}
        headerBody={headerBody}
        headerText={headerText}
        pageId={pageId}
      />
    )
    const component = getByTestId('grid-jest')
    const cards = within(component).getAllByTestId('card-jest')
    expect(cards.length).toBe(3)
  })
})
