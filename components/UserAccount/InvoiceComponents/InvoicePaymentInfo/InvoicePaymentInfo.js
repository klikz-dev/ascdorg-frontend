import { Box, Typography } from '@mui/material'
import dateFormat from 'dateformat'
import PropTypes from 'prop-types'

export default function InvoicePaymentInfo({
  testId,
  creditCardLast4Digits,
  completionDate,
  cardType,
  paymentMethod,
  paymentStatus,
}) {
  return (
    <Box py={3} data-testid={testId}>
      <Box mb={1}>
        <Typography color='black' variant='h5'>
          Payment Information
        </Typography>
      </Box>
      <Box>
        {paymentMethod && (
          <Box display='flex'>
            <Box pr={2}>
              <Typography color='black' variant='h6'>
                Payment method:
              </Typography>
            </Box>
            <Box>
              <Typography
                color='black'
                variant='h6'
                data-testid={`${testId}-payment-type`}
              >
                {`${paymentMethod} - ${cardType}`}
              </Typography>
            </Box>
          </Box>
        )}
        <Box display='flex'>
          <Box pr={2}>
            <Typography color='black' variant='h6'>
              Card Last 4 Digits:
            </Typography>
          </Box>
          <Box>
            <Typography
              color='black'
              variant='h6'
              data-testid={`${testId}-cc-4-digits`}
            >
              {creditCardLast4Digits}
            </Typography>
          </Box>
        </Box>
        {paymentStatus && (
          <Box display='flex'>
            <Box pr={2}>
              <Typography color='black' variant='h6'>
                Payment Status:
              </Typography>
            </Box>
            <Box>
              <Typography
                color='black'
                variant='h6'
                data-testid={`${testId}-payment-status`}
              >
                {paymentStatus}
              </Typography>
            </Box>
          </Box>
        )}
        <Box display='flex'>
          <Box pr={2}>
            <Typography color='black' variant='h6'>
              Payment Date:
            </Typography>
          </Box>
          <Box>
            <Typography
              color='black'
              variant='h6'
              data-testid={`${testId}-payment-date`}
            >
              {dateFormat(
                new Date(completionDate).toLocaleString('en-US', {
                  timeZone: 'America/New_York',
                }),
                'yyyy-mm-dd hh:mm:ss'
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

InvoicePaymentInfo.propTypes = {
  testId: PropTypes.string,
  creditCardLast4Digits: PropTypes.string,
  completionDate: PropTypes.string,
  cardType: PropTypes.string,
  paymentMethod: PropTypes.string,
  paymentStatus: PropTypes.string,
}
