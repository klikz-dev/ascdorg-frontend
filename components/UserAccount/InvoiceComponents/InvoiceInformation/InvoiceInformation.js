import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'

export default function InvoiceInformation({
  testId = 'invoice-information',
  title,
  roleCategory,
  school,
  district,
  state,
  country,
}) {
  if (!roleCategory && !school && !district) {
    return null
  }
  return (
    <Box py={3} data-testid={testId}>
      <Box mb={1}>
        <Typography color='black' variant='h5' data-testid={`${testId}-title`}>
          {title}
        </Typography>
      </Box>
      <Box>
        {roleCategory && (
          <Box display='flex'>
            <Box pr={2}>
              <Typography color='black' variant='h6'>
                Role Category:
              </Typography>
            </Box>
            <Box>
              <Typography
                color='black'
                variant='body'
                data-testid={`${testId}-role-category`}
              >
                {roleCategory}
              </Typography>
            </Box>
          </Box>
        )}
        {school && (
          <Box display='flex'>
            <Box pr={2}>
              <Typography color='black' variant='h6'>
                School:
              </Typography>
            </Box>
            <Box>
              <Typography
                color='black'
                variant='body'
                data-testid={`${testId}-school`}
              >
                {school}
              </Typography>
            </Box>
          </Box>
        )}
        {district && (
          <Box display='flex'>
            <Box pr={2}>
              <Typography color='black' variant='h6'>
                District/Organization:
              </Typography>
            </Box>
            <Box>
              <Typography
                color='black'
                variant='body'
                data-testid={`${testId}-district`}
              >
                {district}
              </Typography>
            </Box>
          </Box>
        )}
        {state && (
          <Box display='flex'>
            <Box pr={2}>
              <Typography color='black' variant='h6'>
                stateCountry:
              </Typography>
            </Box>
            <Box>
              <Typography
                color='black'
                variant='body'
                data-testid={`${testId}-state`}
              >
                {state}/{country}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

InvoiceInformation.propTypes = {
  testId: PropTypes.string,
  title: PropTypes.string,
  school: PropTypes.string,
  district: PropTypes.string,
  roleCategory: PropTypes.string,
  state: PropTypes.string,
  country: PropTypes.string,
}
