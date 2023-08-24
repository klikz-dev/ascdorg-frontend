import React from 'react'
import { invoice } from '../../../../../../__mocks__/invoiceMock'
import PersonifyInvoiceProductRow from './SnipcartInvoiceProductsRow'

export default {
  component: PersonifyInvoiceProductRow,
  title:
    'components/UserAccount/InvoiceComponents/SnipcartInvoice/SnipcartInvoiceProductRow/SnipcartInvoiceProductsRow',
}

const Template = (args) => <PersonifyInvoiceProductRow {...args} />

// With Info
export const Info = Template.bind({})
Info.args = {
  orderDate: invoice.orderDate,
  ...invoice.productOrders[0],
}
Info.storyName = 'With Info'
