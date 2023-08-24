import React from 'react'
import { invoice } from '../../../../../__mocks__/invoiceMock'
import PersonifyInvoiceTable from './PersonifyInvoiceTable'

export default {
  component: PersonifyInvoiceTable,
  title:
    'components/UserAccount/InvoiceComponents/PersonfiyInvoice/PersonifyInvoiceTable',
}

const Template = (args) => <PersonifyInvoiceTable {...args} />

// With Info
export const Info = Template.bind({})
Info.args = {
  orderDate: invoice.orderDate,
  productOrders: invoice.productOrders,
  tax: invoice.tax,
  shipPrice: invoice.shipPrice,
}
Info.storyName = 'With Info'
