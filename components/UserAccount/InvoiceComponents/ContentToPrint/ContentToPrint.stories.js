import React from 'react'
import { invoice } from '../../../../__mocks__/invoiceMock'
import ContentToPrint from './ContentToPrint'

export default {
  component: ContentToPrint,
  title: 'components/UserAccount/InvoiceComponents/ContentToPrint',
}

const Template = (args) => <ContentToPrint {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Invoice
export const WithInvoice = Template.bind({})
WithInvoice.args = { invoiceItem: invoice }
WithInvoice.storyName = 'With Invoice'

// Snipcart
export const Snipcart = Template.bind({})
Snipcart.args = { invoiceItem: invoice, isSnipcart: true }
Snipcart.storyName = 'Snipcart'

// Personify
export const Personify = Template.bind({})
Personify.args = { invoiceItem: invoice, isSnipcart: false }
Personify.storyName = 'Personify'
