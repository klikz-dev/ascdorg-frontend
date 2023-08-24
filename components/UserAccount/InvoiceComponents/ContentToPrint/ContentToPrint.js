import { forwardRef } from 'react'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import PersonifyInvoice from '../PersonifyInvoice'
import SnipcartInvoice from '../SnipcartInvoice'

const ContentToPrint = forwardRef(
  ({ testId = 'content-to-print', invoiceItem, isSnipcart }, ref) => (
    <table ref={ref} data-testid={testId}>
      <tbody>
        <tr>
          <td>
            <Box
              sx={{
                height: '100vh',
                width: '100vw',
                paddingBottom: 32,
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                display: 'block',
              }}
            >
              <Box
                sx={{
                  overflowX: 'auto',
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                  color: 'black',
                  pl: [6.5, 8, 3],
                  pr: [6, 3, 7],
                  display: 'block',
                  minWidth: ['27vw', '30vw', '35vw', '80vw'],
                }}
              >
                {isSnipcart ? (
                  <SnipcartInvoice
                    testId={`${testId}-snipcart`}
                    invoiceItem={invoiceItem}
                  />
                ) : (
                  <PersonifyInvoice
                    testId={`${testId}-personify`}
                    invoiceItem={invoiceItem}
                  />
                )}
              </Box>
            </Box>
          </td>
        </tr>
      </tbody>
    </table>
  )
)

export default ContentToPrint

ContentToPrint.propTypes = {
  testId: PropTypes.string,
  isSnipcart: PropTypes.bool,
  invoiceItem: PropTypes.shape({
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
    productOrders: PropTypes.arrayOf(
      PropTypes.shape({
        productCode: PropTypes.string,
        purchaseItem: PropTypes.string,
        unitPrice: PropTypes.number,
        discount: PropTypes.number,
        productTotal: PropTypes.number,
        tax: PropTypes.number,
        shipPrice: PropTypes.number,
        totalPrice: PropTypes.number,
        quantity: PropTypes.number,
      })
    ),
  }),
}
