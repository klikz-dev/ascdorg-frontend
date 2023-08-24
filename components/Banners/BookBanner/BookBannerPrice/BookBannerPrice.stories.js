import React from 'react'
import BannerBookPrice from '.'

const onChange = () => null

const collection = {
  fields: {
    memberOriginalPrice: 100,
    originalPrice: 150,
    memberDiscountedPrice: 49.99,
    discountedPrice: 89.99,
  },
}

const version = {
  fields: {
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
      fields: {
        title: 'Print Books',
        taxJarId: '81100',
      },
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
      fields: {
        title: 'Soft Cover',
      },
    },
    royaltyFlag: true,
  },
}

const versions = [version]

export default {
  component: BannerBookPrice,
  title: 'Components/BannerBookPrice',
}

const Template = (args) => <BannerBookPrice {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Book Version
export const BookVersion = Template.bind({})
BookVersion.args = {
  version,
  versions,
  onChange,
  hasMemberBookPrice: false,
}
BookVersion.storyName = 'With BookVersion'

// Book Version wtih memberbook
export const BookVersionMember = Template.bind({})
BookVersionMember.args = { ...BookVersion.args, hasMemberBookPrice: true }
BookVersionMember.storyName = 'With BookVersion & MemberBookPrice'

// With Collection
export const CollectionPrice = Template.bind({})
CollectionPrice.args = {
  collection,
  hasMemberBookPrice: false,
}
CollectionPrice.storyName = 'With Collection'

// Collection with memberbook
export const CollectionPriceMember = Template.bind({})
CollectionPriceMember.args = {
  ...CollectionPrice.args,
  hasMemberBookPrice: true,
}
CollectionPriceMember.storyName = 'With Collection & MemberBookPrice'
