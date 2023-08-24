import { Box, Divider } from '@mui/material'
import PropTypes from 'prop-types'
import InvoiceInformation from '../InvoiceInformation'
import InvoicePaymentInfo from '../InvoicePaymentInfo'
import InvoiceShipping from '../InvoiceShipping/InvoiceShipping'
import SnipcartInvoiceHeader from './SnipcartInvoiceHeader'
import SnipcartInvoiceTable from './SnipcartInvoiceTable'

export default function SnipcartInvoice({
  testId = 'snipcart-invoice',
  invoiceItem: {
    orderNumber,
    orderDate,
    billingName,
    emailId,
    billingAddress1,
    billingAddress2,
    billingCity,
    billingState,
    billingCountry,
    billingZip,
    shipName,
    shippingAddress1,
    shippingAddress2,
    shippingCity,
    shippingState,
    shippingCountry,
    shippingZip,
    productOrders,
    roleCategory,
    school,
    district,
    creditCardLast4Digits,
    completionDate,
    cardType,
    paymentMethod,
    paymentStatus,
    shipPrice,
    tax,
    total,
  },
}) {
  return (
    <Box data-testid={testId}>
      <SnipcartInvoiceHeader orderNumber={orderNumber} orderDate={orderDate} />

      <Divider />
      <Box py={3} display='flex' justifyContent={'space-between'}>
        <InvoiceShipping
          title={'Billing Address'}
          name={billingName}
          email={emailId}
          address1={billingAddress1}
          address2={billingAddress2}
          city={billingCity}
          state={billingState}
          country={billingCountry}
          zip={billingZip}
        />
        <InvoiceShipping
          title={'Shipping Address'}
          name={shipName}
          address1={shippingAddress1}
          address2={shippingAddress2}
          city={shippingCity}
          state={shippingState}
          country={shippingCountry}
          zip={shippingZip}
        />
      </Box>
      <Divider />
      <InvoiceInformation
        title={'Your Order'}
        roleCategory={roleCategory}
        school={school}
        district={district}
      />
      <Divider />
      <SnipcartInvoiceTable
        orderDate={orderDate}
        shipPrice={shipPrice}
        tax={tax}
        total={total}
        productOrders={productOrders}
      />
      <InvoicePaymentInfo
        creditCardLast4Digits={creditCardLast4Digits}
        completionDate={completionDate}
        cardType={cardType}
        paymentMethod={paymentMethod}
        paymentStatus={paymentStatus}
      />
    </Box>
  )
}

SnipcartInvoice.propTypes = {
  testId: PropTypes.string,
  invoiceItem: PropTypes.shape({
    orderNumber: PropTypes.number,
    invoiceNumber: PropTypes.number,
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
    creditCardLast4Digits: PropTypes.string,
    completionDate: PropTypes.string,
    cardType: PropTypes.string,
    paymentMethod: PropTypes.string,
    paymentStatus: PropTypes.string,
    tax: PropTypes.number,
    shipPrice: PropTypes.number,
    total: PropTypes.number,
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
