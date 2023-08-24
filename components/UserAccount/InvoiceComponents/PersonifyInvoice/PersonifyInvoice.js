import { Box, Divider } from '@mui/material'
import PropTypes from 'prop-types'
import InvoiceInformation from '../InvoiceInformation'
import InvoicePaymentInfo from '../InvoicePaymentInfo'
import InvoiceShipping from '../InvoiceShipping/InvoiceShipping'
import PersonifyInvoiceHeader from './PersonifyInvoiceHeader'
import PersonifyInvoiceTable from './PersonifyInvoiceTable'

export default function PersonifyInvoice({
  testId = 'personfiy-invoice',
  invoiceItem: {
    orderNumber,
    poNumber,
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
    school,
    shippingZip,
    productOrders,
    creditCardLast4Digits,
    completionDate,
    roleCategory,
    district,
    tax,
    shipPrice,
    total,
  },
}) {
  return (
    <Box data-testid={testId}>
      <PersonifyInvoiceHeader
        poNumber={poNumber}
        orderNumber={orderNumber}
        orderDate={orderDate}
      />
      <Divider />
      <Box py={3} display='flex' justifyContent={'space-between'}>
        <InvoiceShipping
          title={'Bill To:'}
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
          title={'Ship To:'}
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
      <PersonifyInvoiceTable
        orderDate={orderDate}
        tax={tax}
        shipPrice={shipPrice}
        total={total}
        productOrders={productOrders}
      />
      <InvoiceInformation
        title={'Your Information'}
        roleCategory={roleCategory}
        district={district}
        school={school}
        state={shippingState}
        country={shippingCountry}
      />
      <Divider />
      <InvoicePaymentInfo
        creditCardLast4Digits={creditCardLast4Digits}
        completionDate={completionDate}
      />
      <Divider />
    </Box>
  )
}

PersonifyInvoice.propTypes = {
  testId: PropTypes.string,

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
    creditCardLast4Digits: PropTypes.string,
    completionDate: PropTypes.string,
    district: PropTypes.string,
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
        quantity: PropTypes.number,
      })
    ),
  }),
}
