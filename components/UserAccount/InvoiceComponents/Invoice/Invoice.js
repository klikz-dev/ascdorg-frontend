import { useRef } from 'react'
import { Box, Grid, Button } from '@mui/material'
import PropTypes from 'prop-types'
import ReactToPrint from 'react-to-print'
import ContentToPrint from '../ContentToPrint'
import PersonifyInvoice from '../PersonifyInvoice'
import SnipcartInvoice from '../SnipcartInvoice'

export default function Invoice({ testId = 'invoice', invoiceItem }) {
  const printRef = useRef(null)
  const topRef = useRef(null)
  const isSnipcart = invoiceItem.source === 'Snipcart'
  return (
    <Grid
      container
      sx={{
        overflow: 'hidden',
        height: '95%',
        borderRadius: '0 0 16px 16px',
        backgroundColor: 'white',
      }}
      data-testid={testId}
    >
      <Box
        sx={{
          height: { xs: '100vh', md: '100%' },
          width: '100vw',
          overflowX: 'none',
          overflowY: 'scroll',
          paddingBottom: '32px',
        }}
        display='flex'
        flexDirection={['column', 'row']}
      >
        <Box
          sx={{
            overflowX: 'none',
          }}
          id={`invoice-modal-description-${invoiceItem?.itemTitle}`}
          color='black'
          pl={[6.5, 8, 3]}
          pt={3}
          pr={[6, 3, 7]}
          display='flex'
          flexDirection='column'
          margin='auto'
          height={['83vh', 'auto']}
          ref={topRef}
        >
          <Box width='100%' display='flex' justifyContent='flex-end'>
            <ReactToPrint
              copyStyles='true'
              trigger={() => (
                <Button color='primary' variant='outlined'>
                  Print Invoice
                </Button>
              )}
              content={() => printRef.current}
            />
            <Box sx={{ display: 'none' }}>
              <ContentToPrint
                invoiceItem={invoiceItem}
                ref={printRef}
                isSnipcart={isSnipcart}
              />
            </Box>
          </Box>
          {isSnipcart ? (
            <SnipcartInvoice invoiceItem={invoiceItem} />
          ) : (
            <PersonifyInvoice invoiceItem={invoiceItem} />
          )}
        </Box>
      </Box>
    </Grid>
  )
}

Invoice.propTypes = {
  testId: PropTypes.string,
  invoiceItem: PropTypes.shape({
    source: PropTypes.string,
    itemTitle: PropTypes.string,
    orderNumber: PropTypes.number,
    invoiceNumber: PropTypes.number,
    poNumber: PropTypes.string,
    invoiceDate: PropTypes.string,
    emailId: PropTypes.string,
    shipName: PropTypes.string,
    shippingAddress1: PropTypes.string,
    shippingAddress2: PropTypes.string,
    shippingCity: PropTypes.string,
    shippingState: PropTypes.string,
    shippingCountry: PropTypes.string,
    shippingZip: PropTypes.string,
    orderDate: PropTypes.string,
    billingName: PropTypes.string,
    billingAddress1: PropTypes.string,
    billingAddress2: PropTypes.string,
    billingCity: PropTypes.string,
    billingState: PropTypes.string,
    billingCountry: PropTypes.string,
    billingZip: PropTypes.string,
    fulFillStatus: PropTypes.string,
    fulFillDate: PropTypes.string,
    shipmethod: PropTypes.string,
    shipDate: PropTypes.string,
    token: PropTypes.string,
    roleCategory: PropTypes.string,
    school: PropTypes.string,
    district: PropTypes.string,
    tax: PropTypes.number,
    shipPrice: PropTypes.number,
    productOrders: PropTypes.arrayOf(
      PropTypes.shape({
        productCode: PropTypes.string,
        purchaseItem: PropTypes.string,
        unitPrice: PropTypes.number,
        discount: PropTypes.number,
        productTotal: PropTypes.number,
        totalPrice: PropTypes.number,
        quantity: PropTypes.number,
      })
    ),
  }),
}
