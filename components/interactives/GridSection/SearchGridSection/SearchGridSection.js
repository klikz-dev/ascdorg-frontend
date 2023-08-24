import { Box, Typography } from '@mui/material'
import algoliasearch from 'algoliasearch'
/**@todo when out of experimental use react InstantSearch hooks https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react-hooks/*/
import { string, arrayOf, bool } from 'prop-types'
import { InstantSearch, connectHits, Configure } from 'react-instantsearch-dom'
import { algoliaAppId, algoliaSearchApiKey } from '../../../../lib/algolia'
import { createFilterQuery } from '../../../../lib/utils'
import ViewAllCTA from '../../Buttons/ViewAllCTA'
import SearchGridSectionItems from '../SearchGridSectionItems'

/** @todo: merge with GridSection (or visa versa) */
export default function SearchGridSection({
  testId = 'SearchGridSection',
  title,
  indexName,
  contentTypes,
  topics,
  keywords,
  authors,
  lowerDate,
  upperDate,
  featured,
  premium,
  elArticleType,
  ctaLink,
  ctaLabel,
  ctaTarget,
}) {
  const searchClient = algoliasearch(algoliaAppId, algoliaSearchApiKey)

  return (
    <Box data-testid={testId}>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={2}
      >
        <Typography variant='h4' data-testid={`${testId}-title`}>
          {title}
        </Typography>
        <ViewAllCTA
          label={ctaLabel}
          href={ctaLink}
          target={ctaTarget}
          lg
          testId={testId}
        />
      </Box>
      <InstantSearch searchClient={searchClient} indexName={indexName}>
        <Configure
          filters={createFilterQuery(
            contentTypes,
            topics,
            keywords,
            authors,
            lowerDate,
            upperDate,
            featured,
            elArticleType,
            premium
          )}
          hitsPerPage={3}
        />
        <CustomHits />
      </InstantSearch>
    </Box>
  )
}

const CustomHits = connectHits(SearchGridSectionItems)

SearchGridSection.propTypes = {
  testId: string,
  title: string,
  indexName: string,
  contentTypes: arrayOf(string),
  topics: arrayOf(string),
  keywords: arrayOf(string),
  authors: arrayOf(string),
  lowerDate: string,
  upperDate: string,
  featured: bool,
  elArticleType: string,
  premium: bool,
  ctaLink: string,
  ctaLabel: string,
  ctaTarget: string,
}
