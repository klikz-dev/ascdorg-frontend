import { Box, Typography } from '@mui/material'
import { string, number } from 'prop-types'

export default function PdfTitleBar({
  title,
  volume,
  number,
  issueDate,
  testId = 'PdfTitleBar',
}) {
  return (
    <Box data-testid={testId}>
      <Typography component='h1' variant='h1' data-testid={`${testId}-title`}>
        {title}
      </Typography>
      <Box mt={5} data-testid={`${testId}-volume-number`}>
        <Typography variant='h5'>
          Volume {volume}, Number {number}, {issueDate}
        </Typography>
      </Box>
    </Box>
  )
}

PdfTitleBar.propTypes = {
  testId: string,
  title: string,
  volume: number,
  number: number,
  issueDate: string,
}
