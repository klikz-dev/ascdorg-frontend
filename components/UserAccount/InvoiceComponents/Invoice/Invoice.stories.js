import React from 'react'
import { invoice } from '../../../../__mocks__/invoiceMock'
import Invoice from './Invoice'

export default {
  component: Invoice,
  title: 'components/UserAccount/InvoiceComponents/Invoice',
}

const Template = (args) => <Invoice {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Invoice
export const WithInvoice = Template.bind({})
WithInvoice.args = { invoiceItem: invoice }
WithInvoice.storyName = 'With Invoice'
