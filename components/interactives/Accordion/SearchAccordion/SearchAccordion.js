import { Grid } from '@mui/material'
import { string, array, oneOfType, node, element } from 'prop-types'

/**
 *
 * @param {string} testId an optional test id string
 * @param {array} hits array of search result hits from Algolia as items
 * @param {Component} searchItem React Component passed through as the resultant search item
 * @param {*} passedProps properties to be passed through to SearchItem
 * @returns
 */
const SearchAccordion = ({
  testId = 'search-list',
  hits,
  SearchItem,
  ...passedProps
}) => {
  return (
    <Grid container spacing={4} data-testid={testId}>
      {hits &&
        hits.map((item, key) => {
          return (
            <Grid
              item
              xs={12}
              key={key}
              style={{ paddingBottom: 0 }}
              data-testid={`${testId}-search-item`}
            >
              <SearchItem {...passedProps} item={item} />
            </Grid>
          )
        })}
    </Grid>
  )
}

SearchAccordion.propTypes = {
  testId: string,
  hits: array,
  SearchItem: oneOfType([node, element]),
}

export default SearchAccordion
