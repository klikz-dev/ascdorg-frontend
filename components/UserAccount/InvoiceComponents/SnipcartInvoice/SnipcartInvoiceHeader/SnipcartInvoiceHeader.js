import Image from 'next/image'
import { Box, Typography, Divider } from '@mui/material'
import PropTypes from 'prop-types'
import InvoiceShipping from '../../InvoiceShipping/InvoiceShipping'

export default function SnipcartInvoiceHeader({
  testId = 'snipcart-invoice-header',
  orderNumber,
  orderDate,
}) {
  return (
    <Box
      sx={{ py: 3, display: 'flex', flexDirection: 'column' }}
      data-testid={testId}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          alignSelf: 'flex-end',
          py: 1,
          width: '100%',
        }}
      >
        <Typography variant='h2' sx={{ alignSelf: 'flex-start' }}>
          {'ASCD INVOICE'}
        </Typography>
        <Box
          py={1}
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Typography variant='body' sx={{ pr: 2 }}>
              {'Invoice Number:'}
            </Typography>
            <Typography
              color='black'
              variant='h5'
              data-testid={`${testId}-order-number`}
            >
              {orderNumber}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography variant='body' sx={{ pr: 2 }}>
              {'Invoice Date:'}
            </Typography>
            <Typography
              color='black'
              variant='h5'
              data-testid={`${testId}-order-date`}
            >
              {orderDate}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box
        py={1}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <InvoiceShipping
          color='black'
          title={'ASCD'}
          address1={'2800 Shirlington Rd, Suite 1001'}
          city={'Arlington'}
          state={'VA'}
          country={'US'}
          zip={'22206'}
        />
        <Box sx={{ my: '-20px', alignSelf: 'flex-end' }}>
          <Image
            priority
            src={`/images/logo.svg`}
            width='100'
            height='100'
            placeholder='empty'
          />
        </Box>
      </Box>
    </Box>
  )
}

SnipcartInvoiceHeader.propTypes = {
  testId: PropTypes.string,
  orderNumber: PropTypes.number,
  orderDate: PropTypes.string,
}
