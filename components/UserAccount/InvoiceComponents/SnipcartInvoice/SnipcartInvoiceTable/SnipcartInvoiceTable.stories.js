import React from 'react'
import { invoice } from '../../../../../__mocks__/invoiceMock'
import SnipcartInvoiceTable from './SnipcartInvoiceTable'

export default {
  component: SnipcartInvoiceTable,
  title:
    'components/UserAccount/InvoiceComponents/SnipcartInvoice/SnipcartInvoiceTable',
}

const Template = (args) => <SnipcartInvoiceTable {...args} />

// With Info
export const Info = Template.bind({})
Info.args = {
  orderDate: invoice.orderDate,
  tax: invoice.tax,
  shipPrice: invoice.shipPrice,
  productOrders: invoice.productOrders,
}
Info.storyName = 'With Info'
