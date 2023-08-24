import React from 'react'
import InvoiceInformation from './InvoiceInformation'

export default {
  component: InvoiceInformation,
  title: 'components/UserAccount/InvoiceComponents/InvoiceInformation',
}

const Template = (args) => <InvoiceInformation {...args} />

// With Info
export const Info = Template.bind({})
Info.args = {
  title: 'title',
  roleCategory: 'role',
  school: 'school',
  district: 'district',
}
Info.storyName = 'With Info'
