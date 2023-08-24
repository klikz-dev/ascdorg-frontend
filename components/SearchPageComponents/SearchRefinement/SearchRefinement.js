import { Box, Typography } from '@mui/material'
import { string, func, bool, object, element, number } from 'prop-types'
import { RefinementList } from 'react-instantsearch-dom'

export default function SearchRefinement({
  testId = 'search-refinement',
  categoryName,
  attribute,
  transformItems,
  hasRefinementList = true,
  customSx,
  CustomRefinement,
  showMoreLimit = 20,
}) {
  const renderRefinement = attribute && hasRefinementList
  return (
    <Box sx={{ ...customSx }} data-testid={testId}>
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '20px',
          marginBottom: '10px',
        }}
        variant='h6'
        data-testid={`${testId}-category`}
      >
        {categoryName}
      </Typography>
      {renderRefinement && (
        <RefinementList
          attribute={attribute}
          limit={6}
          showMore
          showMoreLimit={showMoreLimit}
          translations={{
            showMore(expanded) {
              return expanded ? 'Less' : 'More'
            },
            noResults: 'No results',
          }}
          {...(transformItems ? { transformItems } : {})}
          data-testid={`${testId}-refinement-list`}
        />
      )}
      {CustomRefinement}
    </Box>
  )
}

SearchRefinement.propTypes = {
  testId: string,
  categoryName: string,
  attribute: string,
  transformItems: func,
  hasRefinementList: bool,
  customSx: object,
  CustomRefinement: element,
  showMoreLimit: number,
}
