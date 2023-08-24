import React from 'react'
import { invoice } from '../../../../../../__mocks__/invoiceMock'
import PersonifyInvoiceProductRow from './PersonifyInvoiceProductsRow'

export default {
  component: PersonifyInvoiceProductRow,
  title:
    'components/UserAccount/InvoiceComponents/PersonfiyInvoice/PersonifyInvoiceProductRow/PersonifyInvoiceProductsRow',
}

const Template = (args) => <PersonifyInvoiceProductRow {...args} />

// With Info
export const Info = Template.bind({})
Info.args = {
  orderDate: invoice.orderDate,
  ...invoice.productOrders[0],
}
Info.storyName = 'With Info'
