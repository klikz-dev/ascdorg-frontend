import React from 'react'
import MembershipDetails from '../../../components/UserAccount/MembershipDetails'

export default {
  component: MembershipDetails,
  title: 'Components/UserAccount/MembershipDetails',
}

const Template = (args) => <MembershipDetails {...args} />

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

// With Membership Data
export const Membership_Data = Template.bind({})
Membership_Data.args = {
  membershipData: {
    membershipName: 'Digital - Select - Monthly',
    autoRenew: true,
    expireDate: 'December 22, 2021',
    price: 7.99,
    period: 'month',
    membershipKeyword: 'Digital - Select',
    subscriptionId: 'RCCXJUTJCS88',
  },
}
Membership_Data.storyName = 'With Membership Data'

// With Membership Data and Description
export const Membership_Data_Description = Template.bind({})
Membership_Data_Description.args = {
  membershipData: {
    membershipName: 'Digital - Select - Monthly',
    autoRenew: true,
    expireDate: 'December 22, 2021',
    price: 7.99,
    period: 'month',
    membershipKeyword: 'Digital - Select',
    subscriptionId: 'RCCXJUTJCS88',
    description: `
        Get actionable resources delivered right to your door. Upgrade today to keep everything your membership currently offers, and add:
        * Five (5) member books sent to your door each year
        * Nine (9) print issues of EL Magazine
        * Plus, online access to the 20 most recent member books
        `,
  },
}
Membership_Data_Description.storyName = 'With Membership Data and Description'
