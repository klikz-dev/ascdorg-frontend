import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../../../__test-utils__/test-utils'
import BookBannerPrice from './BookBannerPrice'

describe('<BookBannerPrice />', () => {
  const onChange = jest.fn()
  const version = {
    title:
      'Better Learning Through Structured Teaching: A Framework for the Gradual Release of Responsibility, 3rd Edition (Print Book)',
    productNumber: '121031',
    priceNonMember: 29.95,
    priceMember: 23.96,
    taxJar: {
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
        type: 'Entry',
        id: '3YKEvfI8UbltNyJELHcfYm',
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'taxJarCategory',
          },
        },
        revision: 1,
        createdAt: '2021-06-13T09:55:34.567Z',
        updatedAt: '2021-06-13T09:55:44.006Z',
        environment: {
          sys: {
            id: 'stage',
            type: 'Link',
            linkType: 'Environment',
          },
        },
        locale: 'en-US',
      },
      title: 'Print Books',
      taxJarId: '81100',
    },
    dateRelease: '2021-07-01',
    bookType: {
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
        type: 'Entry',
        id: '0cd59489-fda5-4179-a3c5-1c59a9ea026d',
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'categoryBooks',
          },
        },
        revision: 3,
        createdAt: '2021-05-12T19:01:36.440Z',
        updatedAt: '2021-05-13T17:45:50.493Z',
        environment: {
          sys: {
            id: 'stage',
            type: 'Link',
            linkType: 'Environment',
          },
        },
        locale: 'en-US',
      },
      title: 'Soft Cover',
    },
    royaltyFlag: true,
  }

  const versions = [version]
  it('component renders when blank', () => {
    const { getByTestId } = render(<BookBannerPrice testId='jest' />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('component displays correct values with Books when membership price is false', () => {
    const { getByTestId } = render(
      <BookBannerPrice
        testId='jest'
        version={version}
        versions={versions}
        onChange={onChange}
        hasMemberBookPrice={false}
      />
    )
    expect(getByTestId('jest-member-price-book')).toHaveTextContent(
      '$23.96 member price join now'
    )
    expect(getByTestId('jest-price-book')).toHaveTextContent('$29.95')
    expect(getByTestId('jest-join-link-book')).toBeVisible()
  })

  it('component displays correct values with Books when membership price is true', () => {
    const { getByTestId } = render(
      <BookBannerPrice
        testId='jest'
        version={version}
        versions={versions}
        onChange={onChange}
        hasMemberBookPrice
      />
    )
    expect(getByTestId('jest-member-price-book')).toHaveTextContent(
      '$23.96 member price'
    )
    expect(getByTestId('jest-price-book')).toHaveTextContent('$23.96')
  })

  it('component displays correct values with Collections when membership price is false', () => {
    const { getByTestId } = render(
      <BookBannerPrice
        testId='jest'
        memberOriginalPrice={100}
        originalPrice={150}
        memberDiscountedPrice={49.99}
        discountedPrice={89.99}
        isCollection
        hasMemberBookPrice={false}
      />
    )
    expect(getByTestId('jest-strikethrough-collection')).toHaveTextContent(
      '$150'
    )
    expect(getByTestId('jest-price-collection')).toHaveTextContent('$89.99')
    expect(
      getByTestId('jest-small-strikethrough-collection')
    ).toHaveTextContent('$100')
    expect(
      getByTestId('jest-small-opposite-price-collection')
    ).toHaveTextContent('$49.99')
    expect(getByTestId('jest-label-opposite-collection')).toHaveTextContent(
      'member price'
    )
  })

  it('component displays correct values with Collections when membership price is true', () => {
    const { getByTestId } = render(
      <BookBannerPrice
        testId='jest'
        memberOriginalPrice={100}
        originalPrice={150}
        memberDiscountedPrice={49.99}
        discountedPrice={89.99}
        isCollection
        hasMemberBookPrice
      />
    )
    expect(getByTestId('jest-strikethrough-collection')).toHaveTextContent(
      '$100'
    )
    expect(getByTestId('jest-price-collection')).toHaveTextContent('$49.99')
    expect(
      getByTestId('jest-small-strikethrough-collection')
    ).toHaveTextContent('$150')
    expect(
      getByTestId('jest-small-opposite-price-collection')
    ).toHaveTextContent('$89.99')
    expect(getByTestId('jest-label-opposite-collection')).toHaveTextContent(
      'non-member price'
    )
  })
})
