import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '../../../__test-utils__/test-utils'
import MyAccount from '../../../components/UserAccount/MyAccount'

const membershipData = {
  membershipName: 'Digital - Select - Monthly',
  autoRenew: true,
  expireDate: 'December 22, 2021',
  price: 7.99,
  period: 'month',
  membershipKeyword: 'Digital - Select',
  subscriptionId: 'RCCXJUTJCS88',
}
const testId = 'jest'
describe('MyAccount component:', () => {
  test.skip('MyAccount rendered successfully', () => {
    const { getByTestId } = render(
      <MyAccount membershipData={membershipData} testId={testId} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-body')).toBeVisible()
  })
  test.skip('membershipData: Null', () => {
    render(<MyAccount membershipData={membershipData} testId={testId} />)
    expect(
      screen.getByText(
        'Get actionable resources delivered right to your door. Upgrade today to keep everything your membership currently offers, and add:'
      )
    ).toBeVisible()
    expect(
      screen.getByText('Five (5) member books sent to your door each year')
    ).toBeVisible()
    expect(
      screen.getByText('Nine (9) print issues of EL Magazine')
    ).toBeVisible()
    expect(
      screen.getByText('Plus, online access to the 20 most recent member books')
    ).toBeVisible()
    expect(screen.getByText('Cancel Membership')).toBeVisible()
    expect(screen.getByText('Get more from ASCD and save')).toBeVisible()
  })
})
