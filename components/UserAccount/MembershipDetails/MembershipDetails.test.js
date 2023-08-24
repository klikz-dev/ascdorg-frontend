import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '../../../__test-utils__/test-utils'
import MembershipDetails from '../../../components/UserAccount/MembershipDetails'

const membershipData = {
  membershipName: 'Digital - Select - Monthly',
  autoRenew: true,
  expireDate: 'December 22, 2021',
  price: 7.99,
  period: 'month',
  membershipKeyword: 'Digital - Select',
  subscriptionId: 'RCCXJUTJCS88',
}

describe('MembershipDetails component:', () => {
  test('MembershipDetails rendered successfully', () => {
    render(<MembershipDetails membershipData={membershipData} />)

    expect(screen.getByText(membershipData.membershipName)).toBeInTheDocument()
    expect(
      screen.getByText('Renews ' + membershipData.expireDate)
    ).toBeInTheDocument()
  })

  test('membershipData: Null', () => {
    render(<MembershipDetails membershipData={null} />)
    expect(screen.getByText('Free User')).toBeInTheDocument()
  })

  // uncomment this when working on the membership details
  // test('Modal in MembershipDetails is rendered succesfully', () => {
  //   render(<MembershipDetails membershipData={membershipData} />)
  //   let classes = screen
  //     .getByTestId('mebershipDetails-modal')
  //     .getAttribute('class')
  //   classes = classes.split(' ')[0]
  //   expect(classes.includes('MuiModal-root'))
  // })
})
