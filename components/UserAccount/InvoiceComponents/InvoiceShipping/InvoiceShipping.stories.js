import React from 'react'
import InvoiceShipping from './InvoiceShipping'

export default {
  component: InvoiceShipping,
  title: 'components/UserAccount/InvoiceComponents/InvoiceShipping',
}

const Template = (args) => <InvoiceShipping {...args} />

// With Info
export const Info = Template.bind({})
Info.args = {
  title: 'TEST TITLE',
  name: 'name',
  email: 'email@email.com',
  address1: 'line1',
  address2: 'line2',
  city: 'city',
  state: 'ST',
  country: 'US',
  zip: '12345',
}
Info.storyName = 'With Info'
