import React from 'react'
import { invoice } from '../../../../__mocks__/invoiceMock'
import SnipcartInvoice from './SnipcartInvoice'

export default {
  component: SnipcartInvoice,
  title: 'components/UserAccount/InvoiceComponents/SnipcartInvoice',
}

const Template = (args) => <SnipcartInvoice {...args} />

// With Invoice
export const Invoice = Template.bind({})
Invoice.args = { invoiceItem: invoice }
Invoice.storyName = 'With Invoice'
