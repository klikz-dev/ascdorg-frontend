import React from 'react'
import { invoice } from '../../../../__mocks__/invoiceMock'
import InvoicePaymentInfo from './InvoicePaymentInfo'

export default {
  component: InvoicePaymentInfo,
  title: 'components/UserAccount/InvoiceComponents/InvoicePaymentInfo',
}

const Template = (args) => <InvoicePaymentInfo {...args} />

// With Info
export const Info = Template.bind({})
Info.args = {
  creditCardLast4Digits: invoice.creditCardLast4Digits,
  completionDate: invoice.completionDate,
  cardType: invoice.cardType,
  paymentMethod: invoice.paymentMethod,
  paymentStatus: invoice.paymentStatus,
}
Info.storyName = 'With Info'
