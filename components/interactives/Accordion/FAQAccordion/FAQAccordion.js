import { useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Typography, InputAdornment, Divider } from '@mui/material'
import algoliasearch from 'algoliasearch/lite'
import { string, oneOfType, node, element } from 'prop-types'
import { InstantSearch, connectHits, Configure } from 'react-instantsearch-dom'
import { algoliaAppId, algoliaSearchApiKey } from '../../../../lib/algolia'
import CustomDropDownSelect from '../../../AlgoliaComponents/CustomDropDownSelect'
import CustomSearchBox from '../../../AlgoliaComponents/CustomSearchBox'
import SearchAccordion from '../SearchAccordion'

/**
 * FAQ Accordion Component
 * @param {string} testId an optional test id string
 * @param {string} service an optional string, url service string
 * @param {string} indexName required algolia index name
 * @param {Component} searchItem React Component passed through as the resultant search item
 * @param {*} passedProps properties to be passed through to SearchItem
 * @returns {JSX.Element} React JSX
 */
const FAQAccordion = ({
  testId = 'search-system',
  service,
  slug,
  indexName,
  SearchItem,
  ...passedProps
}) => {
  const searchClient = algoliasearch(algoliaAppId, algoliaSearchApiKey)

  useEffect(() => {
    if (slug) {
      let checkExist = setInterval(function () {
        let el = document.getElementById(slug)
        if (el) {
          navigateTo(el)
          clearInterval(checkExist)
        }
      }, 3000)
    }
  }, [slug])

  const navigateTo = (el) => {
    window.scrollTo({
      top: scrollY + el.getBoundingClientRect().top - 65,
      behavior: 'smooth',
    })
  }

  return (
    <Box data-testid={testId}>
      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <Configure filters={'type:faq'} hitsPerPage={200} />
        <Box mb={2.5} display='flex' alignItems='center'>
          <Box mr={1}>
            <Typography variant='h5'>Filters:</Typography>
          </Box>
          <Box mr={3} data-testid={`${testId}-filter`}>
            <CustomDropDownSelect
              defaultRefinement={service ? [service] : undefined}
              attribute={'topic'}
              selectAllOption={'All Services'}
              sortBy={'name:desc'}
              facetOrdering
              limit={1000}
              height='56px'
            />
          </Box>

          <Box data-testid={`${testId}-search`} sx={{ width: '100%' }}>
            <CustomSearchBox
              searchAsYouType
              placeholderText={'Search By Keyword'}
              customInputSx={{
                margin: 'auto',
                width: '100%',
                height: '56px',
                '& .MuiInput-input': {
                  fontSize: {
                    xs: (theme) => theme.typography.pxToRem(16),
                    md: (theme) => theme.typography.pxToRem(20),
                  },
                  fontWeight: 700,
                  lineHeight: {
                    xs: (theme) => theme.typography.pxToRem(26),
                    md: (theme) => theme.typography.pxToRem(28),
                  },
                  letterSpacing: 0.2,
                },
              }}
              endAdornment={
                <InputAdornment position='end'>
                  <Divider
                    orientation='vertical'
                    variant='middle'
                    flexItem
                    sx={{
                      backgroundColor: '#C5CED1',
                      height: '40px',
                      marginTop: '-25px',
                    }}
                  />
                  <Box>
                    <SearchIcon />
                  </Box>
                </InputAdornment>
              }
            />
          </Box>
        </Box>
        <CustomHits SearchItem={SearchItem} {...passedProps} />
      </InstantSearch>
      <Box mb={2.5} display='flex' alignItems='center'></Box>
    </Box>
  )
}

const CustomHits = connectHits(SearchAccordion)

FAQAccordion.propTypes = {
  testId: string,
  service: string,
  slug: string,
  indexName: string.isRequired,
  SearchItem: oneOfType([node, element]),
}

export default FAQAccordion
