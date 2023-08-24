import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Container } from '@mui/material'
import algoliasearch from 'algoliasearch/lite'
import Banner from '../../components/Banners/Banner'
import Layout from '../../components/layout'
import ProfileSearch from '../../components/SearchPageComponents/ProfileSearch'
import SEOHead from '../../components/SEOHead'
import TwoColumnCta from '../../components/TwoColumnCta'
import { algoliaAppId, algoliaSearchApiKey } from '../../lib/algolia'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import GET_SEO from '../../lib/schema/getSeo.graphql'
import { pathToSearchState, createURL, searchStateToURL } from '../../lib/utils'

export default function AllAuthors({ SEO }) {
  const router = useRouter()
  const [searchState, setSearchState] = useState({})
  const [lastRouter, setLastRouter] = useState(router)

  useEffect(() => {
    setSearchState(pathToSearchState(router.asPath))
    setLastRouter(router)
  }, [lastRouter.asPath, router])

  const searchClient = algoliasearch(algoliaAppId, algoliaSearchApiKey)

  const onSearchStateChange = (searchState, newSearchState) => {
    clearTimeout(debouncedSetState)

    const debouncedSetState = setTimeout(() => {
      const href = searchStateToURL({
        ...searchState,
        ...newSearchState,
      })

      router.push(href, href, {
        shallow: true,
      })
    }, 700)

    setSearchState({ ...searchState, ...newSearchState })
  }
  return (
    <Layout>
      <SEOHead seo={SEO} />
      <Head>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/instantsearch.css@7.0.0/themes/algolia-min.css'
        />
      </Head>
      <Banner
        title='Everyone @ ASCD'
        subtitle='Get to know the people shaping our education community'
      />
      <Container>
        <ProfileSearch
          searchClient={searchClient}
          indexName={process.env.NEXT_PUBLIC_ALGOLIA_PROFILE_INDEX_ID}
          searchState={searchState}
          onSearchStateChange={onSearchStateChange}
          createURL={createURL}
        />
      </Container>
      <Container maxWidth='lg'>
        <Box my={11}>
          <TwoColumnCta
            testId='people-all-2-col-cta'
            title='Write for ASCD'
            description='We publish insightful, actionable, relevant work from educators across all levels of education that help educators learn, teach and lead.'
            ctaItems={[
              {
                __typename: 'ButtonLinkComponent',
                linkUrl: '/write-for-ascd',
                linkLabel: 'Learn more',
              },
            ]}
            image='/images/write_for_ascd.svg'
            imagePos='right'
            variant='grey'
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
      id: '4SdYcJZSCKpBokoV5O6uH4',
    },
  })

  return {
    props: {
      SEO: seo || {},
    },
    revalidate: 20,
  }
}
