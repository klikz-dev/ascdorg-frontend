import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import SvgIcon from './SvgIcon'

const testId = 'jest'
const icon = 'MembershipCheckSvg'

describe('Custom SvgIcon component', () => {
  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(<SvgIcon testId={testId} icon={icon} />)
    expect(getByTestId('jest')).toBeVisible()
  })
})
