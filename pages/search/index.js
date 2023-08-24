import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container } from '@mui/material'
import algoliasearch from 'algoliasearch/lite'
import { object } from 'prop-types'
import Layout from '../../components/layout'
import Search from '../../components/SearchPageComponents/Search'
import SEOHead from '../../components/SEOHead'
import {
  algoliaAppId,
  algoliaSearchApiKey,
  algoliaSearchIndexId,
} from '../../lib/algolia'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import GET_SEO from '../../lib/schema/getSeo.graphql'
import { pathToSearchState, createURL, searchStateToURL } from '../../lib/utils'

export default function SearchPage({ SEO }) {
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
      <Container>
        <Search
          searchClient={searchClient}
          indexName={algoliaSearchIndexId}
          searchState={searchState}
          onSearchStateChange={onSearchStateChange}
          createURL={createURL}
        />
      </Container>
    </Layout>
  )
}

SearchPage.propTypes = {
  SEO: object,
}

export async function getStaticProps() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { seo },
  } = await contentfulDirectClient.query({
    query: GET_SEO,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      id: '5Vp6EGiPd1au79o29CCrV5',
    },
  })

  return {
    props: {
      SEO: seo || {},
    },
    revalidate: 20,
  }
}
