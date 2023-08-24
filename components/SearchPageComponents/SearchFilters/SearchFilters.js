import { Box } from '@mui/material'
import { string, array } from 'prop-types'
import SearchRefinement from '../SearchRefinement'

export default function SearchFilters({
  testId = 'search-filters',
  searchRefinementsArray,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: { xs: '24px', md: 0 },
      }}
      data-testid={testId}
    >
      {searchRefinementsArray.map((item) => {
        return (
          <SearchRefinement
            {...item}
            key={item.categoryName}
            testId={`${testId}-refinement`}
          />
        )
      })}
    </Box>
  )
}

SearchFilters.propTypes = {
  testId: string,
  searchRefinementsArray: array,
}
