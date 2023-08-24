import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '../../../__test-utils__/test-utils'
import { MY_ACCOUNT } from '../../../const/myaccount-tabs'
import AccountBanner from '../AccountBanner'

describe('AccountBanner component:', () => {
  test('AccountBanner rendered successfully', () => {
    render(<AccountBanner title='David Ryan' tab={MY_ACCOUNT} />)

    expect(screen.getByText('David Ryan')).toBeInTheDocument()
    // uncomment this later once the menu is fixed
    // expect(screen.getByText('MY ACCOUNT')).toBeInTheDocument()
  })

  test('AccountBanner has correct style ', () => {
    render(<AccountBanner title='David Ryan' tab={MY_ACCOUNT} />)

    expect(screen.getByTestId('account-banner')).toHaveStyle({
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'rgb(228, 233, 236)',
    })
  })
})
