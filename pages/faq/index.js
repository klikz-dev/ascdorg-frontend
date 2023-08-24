import { useRouter } from 'next/router'
import { Box, Container } from '@mui/material'
import IssueBannerTitle from '../../components/Banners/IssueBannerTitle'
import FAQAccordionItem from '../../components/interactives/Accordion/AccordionComponents/FAQAccordionItem'
import FAQAccordion from '../../components/interactives/Accordion/FAQAccordion'
import Layout from '../../components/layout'
import SEOHead from '../../components/SEOHead'
import TextCTA from '../../components/TextCta'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import GET_SEO from '../../lib/schema/getSeo.graphql'

export default function FAQ({ SEO }) {
  const router = useRouter()

  return (
    <Layout>
      <SEOHead seo={SEO} />
      <Container maxWidth='lg'>
        <Box mt={10}>
          <IssueBannerTitle
            landing={{
              title: 'Frequently Asked Questions',
              subtitle:
                'Find answers to common questions across all ASCD resources, events, and services',
            }}
            align='center'
          />
        </Box>
      </Container>
      <Box mx={4}>
        <TextCTA
          title='Cannot find what you are looking for? Get in touch with our team.'
          ctaLabel='Contact Us'
          ctaLink='/contact'
          bgColor='transparent'
        />
      </Box>
      <Container maxWidth='lg'>
        <Box my={12}>
          <FAQAccordion
            service={router.query.service}
            slug={router.asPath?.split('#').pop()}
            hasSearchBar
            indexName={process.env.NEXT_PUBLIC_ALGOLIA_FAQ_INDEX_ID}
            SearchItem={FAQAccordionItem}
          />
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { seo },
  } = await contentfulDirectClient.query({
    query: GET_SEO,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '3p6YCHPUV2ditjBuN8RuZx',
    },
  })

  return {
    props: {
      SEO: seo || {},
    },
    revalidate: 20,
  }
}
