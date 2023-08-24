import React from 'react'
import SnipcartInvoiceHeader from './SnipcartInvoiceHeader'

export default {
  component: SnipcartInvoiceHeader,
  title:
    'components/UserAccount/InvoiceComponents/SnipcartInvoice/SnipcartInvoiceHeader',
}

const Template = (args) => <SnipcartInvoiceHeader {...args} />

// With Info
/** @todo: need date format */
export const Info = Template.bind({})
Info.args = {
  orderNumber: '1111111',
  orderDate: '',
}
Info.storyName = 'With Info'
