import { Box } from '@mui/material'
import algoliasearch from 'algoliasearch'
/**@todo when out of experimental use react InstantSearch hooks https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react-hooks/*/
import { string, arrayOf, bool, object } from 'prop-types'
import { InstantSearch, connectHits, Configure } from 'react-instantsearch-dom'
import { algoliaAppId, algoliaSearchApiKey } from '../../../lib/algolia'
import { createFilterQuery } from '../../../lib/utils'
import FeaturedContentItem from './FeaturedContentItem'

export default function FeaturedContent({
  testId = 'SearchGridSection',
  title,
  indexName,
  contentTypes,
  topics,
  keywords,
  featuredAuthors,
  lowerDate,
  upperDate,
  featured,
}) {
  const searchClient = algoliasearch(algoliaAppId, algoliaSearchApiKey)

  const authorsFilterArray = featuredAuthors?.items?.map((item) => item.title)

  return (
    <Box data-testid={testId}>
      <InstantSearch searchClient={searchClient} indexName={indexName}>
        <Configure
          filters={createFilterQuery(
            contentTypes,
            topics,
            keywords,
            authorsFilterArray,
            lowerDate,
            upperDate,
            featured
          )}
          hitsPerPage={3}
        />
        <CustomHits title={title} authors={featuredAuthors} />
      </InstantSearch>
    </Box>
  )
}

const CustomHits = connectHits(FeaturedContentItem)

FeaturedContent.propTypes = {
  testId: string,
  title: string,
  indexName: string,
  contentTypes: arrayOf(string),
  topics: arrayOf(string),
  keywords: arrayOf(string),
  featuredAuthors: object,
  lowerDate: string,
  upperDate: string,
  featured: bool,
}
