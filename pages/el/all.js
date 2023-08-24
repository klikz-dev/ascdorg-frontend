import { Box, Container } from '@mui/material'
import IssueBannerTitle from '../../components/Banners/IssueBannerTitle'
import IssueGrid from '../../components/IssueGrid'
import Layout from '../../components/layout'
import SEOHead from '../../components/SEOHead'
import TwoColumnCta from '../../components/TwoColumnCta'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import GET_PROFILE_CATEGORIES from '../../lib/schema/getProfileCategories.graphql'
import GET_SEO from '../../lib/schema/getSeo.graphql'
import GET_PUBISSUE from '../../lib/schema/pages/getPubIssue.graphql'
import paths from '../../paths/path'

export default function AllIssues({ publications, SEO, featuredAuthors }) {
  const sortedPublications = [...publications].sort(
    (a, b) => new Date(b.publicationDate) - new Date(a.publicationDate)
  )

  return (
    <Layout>
      <SEOHead seo={SEO} />
      <Container maxWidth='lg'>
        <Box mt={10} maxWidth='600px'>
          <IssueBannerTitle
            tag='Educational Leadership'
            landing={{
              title: 'All Issues',
              subtitle:
                'Evidence-based, peer-to-peer guidance and professional knowledge since 1943.',
            }}
            ctaLabel='Subscribe'
            ctaLink={paths.subscribe}
            authors={{
              ctaLabel: '100+ Featured Authors',
              ctaLink: paths.authors,
            }}
            featuredAuthors={featuredAuthors}
            align='left'
            testId='el-all-issue-banner-title'
          />
        </Box>

        <Box my={[5, 10]}>
          <IssueGrid issues={sortedPublications} testId='el-all-issue-grid' />
        </Box>

        <Box mb={10}>
          <TwoColumnCta
            testId='el-all-2-col-cta'
            title='Write for EL Magazine'
            description='Share your writing with more than 135,000 educators. Get a feel for our upcoming themes and writing guidelines. '
            ctaItems={[
              {
                __typename: 'ButtonLinkComponent',
                linkUrl: paths.el({ slug: 'write' }),
                linkLabel: 'View upcoming themes',
              },
              {
                __typename: 'ButtonLinkComponent',
                linkUrl: '/guidelines-for-el',
                linkLabel: 'View guidelines',
                buttonStyle: ['Text Link w/Arrow (Preset #2)'],
              },
            ]}
            imagePos='right'
            image='/images/el.png'
          />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  /** @todo: convert this into an Algolia Index */
  const contentfulDirectClient = await getContentfulDirectClient()
  let totalItems = []
  const limit = 1000
  const {
    data: { publications },
  } = await contentfulDirectClient.query({
    query: GET_PUBISSUE,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      pubissueLimit: 0,
      pubissuesLimit: limit,
      wherePubissues: { publicationDate_exists: true },
    },
  })

  const { items, total } = publications

  if (total > limit) {
    let promiseChain = []

    for (let i = 1; i < Math.ceil(total / limit); i++) {
      promiseChain.push([
        await contentfulDirectClient.query({
          query: GET_PUBISSUE,
          variables: {
            preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
            pubissueLimit: 0,
            pubissuesLimit: limit * i,
            wherePubissues: { publicationDate_exists: true },
          },
        }),
      ])
    }

    const restItemsData = await Promise.all(promiseChain)

    const restItems = [...restItemsData.flat()]
      .map((items) => items?.data?.publications?.items)
      .flat()

    totalItems = [...items, ...restItems].filter(
      (item) => !!item.publicationDate
    )
  } else {
    totalItems = items.filter((item) => !!item.publicationDate)
  }

  const {
    data: { seo },
  } = await contentfulDirectClient.query({
    query: GET_SEO,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '6fopBd4wEsu1n16GXwnF53',
    },
  })

  const {
    data: { categories },
  } = await contentfulDirectClient.query({
    query: GET_PROFILE_CATEGORIES,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 1,
      authorsLimit: 3,
      where: { title: 'Author' },
    },
  })

  const {
    linkedFrom: { authors },
  } = categories?.items[0]

  return {
    props: {
      publications: totalItems,
      SEO: seo || {},
      featuredAuthors: authors.items,
    },
    revalidate: 20,
  }
}
