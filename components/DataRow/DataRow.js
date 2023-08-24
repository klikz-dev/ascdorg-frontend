import { Box, Typography } from '@mui/material'
import { string, oneOfType, number } from 'prop-types'

export default function DataRow({
  testId = 'data-row',
  keyPair,
  value,
  backgroundColor,
}) {
  return (
    <Box
      sx={{
        bgcolor: backgroundColor,
        display: 'flex',
        justifyContent: 'space-between',
        padding: 2,
      }}
      data-testid={testId}
    >
      <Typography variant='h5' data-testid={`${testId}-key`}>
        {keyPair}
      </Typography>
      <Typography variant='subtitle2' data-testid={`${testId}-value`}>
        {value}
      </Typography>
    </Box>
  )
}

DataRow.propTypes = {
  testId: string,
  keyPair: string,
  value: oneOfType([string, number]),
  index: number,
  backgroundColor: string,
}
