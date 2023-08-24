import Image from 'next/image'
import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import InvoiceShipping from '../../InvoiceShipping/InvoiceShipping'

export default function PersonifyInvoiceHeader({
  testId = 'personify-invoice-header',
  orderNumber,
  poNumber,
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
        }}
      >
        <Box sx={{ my: '-20px', alignSelf: 'flex-end' }}>
          <Image
            priority
            src={`/images/logo.svg`}
            width='100'
            height='100'
            placeholder='empty'
          />
        </Box>
        <Typography variant='h2' pl={1}>
          {'ASCD INVOICE'}
        </Typography>
      </Box>

      <Box
        py={1}
        sx={{
          display: 'flex',
          flexDirection: 'column',
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
        {poNumber && (
          <Box sx={{ display: 'flex' }}>
            <Typography variant='body' sx={{ pr: 2 }}>
              {'PO Number:'}
            </Typography>
            <Typography
              color='black'
              variant='h5'
              data-testid={`${testId}-po-number`}
            >
              {poNumber}
            </Typography>
          </Box>
        )}
        <Box sx={{ display: 'flex' }}>
          <Typography variant='body' sx={{ pr: 2 }}>
            {'Terms:'}
          </Typography>
          <Typography
            color='black'
            variant='h5'
            data-testid={`${testId}-terms`}
          >
            Next 30 days
          </Typography>
        </Box>
      </Box>

      <Box
        py={1}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <InvoiceShipping
          singleLineFormat
          color='red'
          title={'Remit To:'}
          name={'ASCD'}
          address1={'PO Box 826887'}
          city={'Philadelphia'}
          state={'PA'}
          country={'US'}
          zip={'19128-6887'}
        />
      </Box>
    </Box>
  )
}

PersonifyInvoiceHeader.propTypes = {
  testId: PropTypes.number,
  orderNumber: PropTypes.number,
  poNumber: PropTypes.string,
  orderDate: PropTypes.string,
}
