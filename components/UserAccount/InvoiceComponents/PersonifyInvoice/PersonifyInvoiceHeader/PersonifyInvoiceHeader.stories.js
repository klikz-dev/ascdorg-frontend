import React from 'react'
import PersonifyInvoiceHeader from './PersonifyInvoiceHeader'

export default {
  component: PersonifyInvoiceHeader,
  title:
    'components/UserAccount/InvoiceComponents/PersonifyInvoice/PersonifyInvoiceHeader',
}

const Template = (args) => <PersonifyInvoiceHeader {...args} />

// With Info
/** @todo: need date format */
export const Info = Template.bind({})
Info.args = {
  orderNumber: '1111111',
  orderDate: '',
}
Info.storyName = 'With Info'
