import { Box, Typography } from '@mui/material'
import { string, array } from 'prop-types'
import DataRow from '../DataRow'

export default function AlternateRows({
  testId = 'alternate-rows',
  title,
  rows,
}) {
  return (
    <Box data-testid={testId}>
      <Box mb={4}>
        <Typography variant='h3' data-testid={`${testId}-title`}>
          {title}
        </Typography>
      </Box>
      <Box data-testid={`${testId}-rows`}>
        {rows.map((row, index) => {
          const [[key, value]] = Object.entries(row)
          return (
            <DataRow
              testId={`${testId}-data-row`}
              key={`${key}-${value}-${index}`}
              keyPair={key}
              value={value}
              backgroundColor={index % 2 ? 'none' : 'action.hover'}
            />
          )
        })}
      </Box>
    </Box>
  )
}

AlternateRows.propTypes = {
  testId: string,
  title: string,
  rows: array,
}
