import { Box, Container } from '@mui/material'
import IssueBannerTitle from '../../components/Banners/IssueBannerTitle'
import HorizontalScroll from '../../components/HorizontalScroll'
import ELAccordionItem from '../../components/interactives/Accordion//AccordionComponents/ELAccordionItem'
import ELAccordion from '../../components/interactives/Accordion/ELAccordion'
import Layout from '../../components/layout'
import SEOHead from '../../components/SEOHead'
import TextCTA from '../../components/TextCta'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import GET_SEO from '../../lib/schema/getSeo.graphql'
import GET_PUBISSUE from '../../lib/schema/pages/getPubIssue.graphql'
import paths from '../../paths/path'

export default function WriteEL({ publications, SEO }) {
  return (
    <Layout>
      <SEOHead seo={SEO} />
      <Container maxWidth='md'>
        <Box
          mt={[3, 7]}
          mx={[1, 'auto']}
          display='flex'
          justifyContent='center'
        >
          <IssueBannerTitle
            landing={{
              title: 'Write for EL Magazine',
              subtitle:
                'Contribute to our flagship magazine written by practitioners for practitioners.',
            }}
            ctaLabel='Get to know our guidelines'
            ctaLink={'/guidelines-for-el'}
            ctaWidth='250px'
            align='center'
          />
        </Box>
      </Container>
      <Box mt={[6, 10]} mx={[3, 'auto']}>
        <TextCTA
          title='Want to speak with the EL team about your submission?'
          ctaLabel='Contact Us'
          ctaLink='mailto:edleadership@ascd.org'
        />
      </Box>
      <Container maxWidth='lg'>
        <Box mt={[6, 10]} mx={[1, 'auto']}>
          <ELAccordion
            SearchItem={ELAccordionItem}
            indexName={process.env.NEXT_PUBLIC_ALGOLIA_FAQ_INDEX_ID}
          />
        </Box>
      </Container>
      <Container>
        <Box mt={[6, 10]} mb={[3, 6]} mx={[1, 'auto']}>
          <HorizontalScroll
            title='Recent Issues'
            ctaLabel='View all'
            ctaLink={paths.el({ slug: 'all' })}
            items={publications}
            type='issuetile'
          />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { publications },
  } = await contentfulDirectClient.query({
    query: GET_PUBISSUE,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      pubissueLimit: 0,
      pubissuesLimit: 8,
      order: 'publicationDate_DESC',
    },
  })

  const {
    data: { seo },
  } = await contentfulDirectClient.query({
    query: GET_SEO,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '6fopBd4wEsu1n16GXwnF53',
    },
  })

  return {
    props: {
      publications: publications.items || null,
      SEO: seo || {},
    },
    revalidate: 20,
  }
}
