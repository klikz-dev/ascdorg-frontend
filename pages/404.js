import Head from 'next/head'
import { Box, Container } from '@mui/material'
import GridSection from '../components/GridSection'
import Layout from '../components/layout'
import TwoColumnCTA from '../components/TwoColumnCta'
import { getContentfulDirectClient } from '../lib/apollo-client'
import GET_PARTIAL_ARTICLE from '../lib/schema/pages/getPartialArticle.graphql'
import paths from '../paths/path'

export default function NotFound({ featuredArticles }) {
  return (
    <Layout>
      <Head>
        <title>404 page not found</title>
      </Head>
      <Container>
        <Box my={12}>
          <TwoColumnCTA
            testId='404-2-col-cta'
            title='404'
            ctaItems={[
              {
                __typename: 'ButtonLinkComponent',
                linkUrl: '/search',
                linkLabel:
                  'Head over to our search page to find out what you need',
                buttonStyle: ['Text Link w/Arrow (Preset #2)'],
              },
            ]}
            description='Why do pencils have erasers? Because we all make mistakes.'
            image='/images/image404.png'
            imagePos='right'
            variant='error'
            descriptionLineNumbers={8}
          />
        </Box>
        <Box mb={10}>
          <GridSection
            testId='grid-section'
            title='Featured Articles'
            ctaLink={paths.search({
              types: ['article'],
              sortBy: ['featured_article'],
              featured: ['true'],
            })}
            items={featuredArticles}
            variant='articleOverlay'
          />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: {
      articles: { items: featuredArticles },
    },
  } = await contentfulDirectClient.query({
    query: GET_PARTIAL_ARTICLE,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 3,
      where: { featured: true },
      order: 'issueDate_DESC',
    },
  })

  return {
    props: {
      featuredArticles,
    },
  }
}
