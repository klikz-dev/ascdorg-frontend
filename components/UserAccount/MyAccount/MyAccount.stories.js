import React from 'react'
import MyAccount from '../../../components/UserAccount/MyAccount'

export default {
  component: MyAccount,
  title: 'Components/UserAccount/MyAccount',
}

const Template = (args) => <MyAccount {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Membership Name and Price
export const Membership_Name = Template.bind({})
Membership_Name.args = {
  membershipData: {
    membershipName: ' Digital - Select - Monthly',
    price: 7.99,
  },
}
Membership_Name.storyName = 'With Membership Name and Price'
