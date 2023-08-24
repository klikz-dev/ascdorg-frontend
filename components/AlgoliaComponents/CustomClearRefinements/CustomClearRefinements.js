import { ButtonBase, Typography, Box } from '@mui/material'
import { string, array, func } from 'prop-types'
import { connectCurrentRefinements } from 'react-instantsearch-dom'

const ClearRefinements = ({ testId = 'clear-refinements', items, refine }) => {
  return (
    <Box data-testid={testId}>
      {!!items.length && (
        <ButtonBase
          onClick={() => refine(items)}
          disabled={!items.length}
          sx={{
            color: 'text.primary',
            textDecoration: 'none',
            cursor: 'pointer',
            '&:hover': {
              color: 'hover.main',
              textDecoration: 'underline',
            },
          }}
          data-testid={`${testId}-button`}
        >
          <Typography variant='body2'>Clear all</Typography>
        </ButtonBase>
      )}
    </Box>
  )
}

ClearRefinements.propTypes = {
  testId: string,
  items: array,
  refine: func,
}

export const CustomClearRefinements =
  connectCurrentRefinements(ClearRefinements)

export default CustomClearRefinements
