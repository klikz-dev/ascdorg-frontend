import { Box } from '@mui/material'
import algoliasearch from 'algoliasearch/lite'
import { string, oneOfType, node, element } from 'prop-types'
import { InstantSearch, connectHits, Configure } from 'react-instantsearch-dom'
import { algoliaAppId, algoliaSearchApiKey } from '../../../../lib/algolia'
import SearchList from '../SearchAccordion'

/**
 * EL Accordion Component
 * @param {string} testId an optional test id string
 * @param {string} indexName required algolia index name
 * @param {Component} searchItem React Component passed through as the resultant search item
 * @param {*} passedProps properties to be passed through to SearchItem
 * @returns {JSX.Element} React JSX
 */
const ELAccordion = ({
  testId = 'search-system',
  indexName,
  SearchItem,
  ...passedProps
}) => {
  const searchClient = algoliasearch(algoliaAppId, algoliaSearchApiKey)

  return (
    <Box data-testid={testId}>
      <InstantSearch indexName={indexName} searchClient={searchClient}>
        {/** the index is set up to sort by unixTimeStamp asc */}
        <Configure filters={'type:futureIssue'} hitsPerPage={200} />
        <CustomHits SearchItem={SearchItem} {...passedProps} />
      </InstantSearch>
      <Box mb={2.5} display='flex' alignItems='center'></Box>
    </Box>
  )
}

const CustomHits = connectHits(SearchList)

ELAccordion.propTypes = {
  testId: string,
  service: string,
  indexName: string.isRequired,
  SearchItem: oneOfType([node, element]),
}

export default ELAccordion
