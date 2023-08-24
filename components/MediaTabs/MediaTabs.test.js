import '@testing-library/jest-dom/extend-expect'
import { render } from '../../__test-utils__/test-utils'
import MediaTabs from './MediaTabs'

const testId = 'jest'
const tabValue = 2

describe('Custom MediaTabs component', () => {
  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(<MediaTabs testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(
      <MediaTabs testId={testId} tabValue={tabValue} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-tabs')).toBeVisible()
  })
})
