import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import MemberPriceItem from './MemberPriceItem'

const testId = 'jest'
const description = 'description'
const checkIcon = true
const infoIcon = true
const popoverMessage = 'this is the popover message'

describe('Custom MemberPriceItem component', () => {
  it('Make sure the component are renders', () => {
    const { getByTestId } = render(<MemberPriceItem testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(
      <MemberPriceItem
        testId={testId}
        infoIcon={infoIcon}
        popoverMessage={popoverMessage}
        checkIcon={checkIcon}
        description={description}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-description')).toBeVisible()
    expect(getByTestId('jest-infoIcon')).toBeVisible()
  })
})
