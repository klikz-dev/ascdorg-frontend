import React from 'react'
import { invoice } from '../../../../__mocks__/invoiceMock'
import PersonifyInvoice from './PersonifyInvoice'

export default {
  component: PersonifyInvoice,
  title: 'components/UserAccount/InvoiceComponents/PersonifyInvoice',
}

const Template = (args) => <PersonifyInvoice {...args} />

// With Invoice
export const Invoice = Template.bind({})
Invoice.args = { invoiceItem: invoice }
Invoice.storyName = 'With Invoice'
