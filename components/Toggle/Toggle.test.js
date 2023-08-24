import '@testing-library/jest-dom/extend-expect'
import { render } from '../../__test-utils__/test-utils'
import Toggle from './Toggle'

const testId = 'jest'
const leftTitle = 'leftTitle'
const rightTitle = 'rightTitle'

describe('Custom Toggle component', () => {
  it('Make sure the component are renders', () => {
    const { getByTestId } = render(<Toggle testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(
      <Toggle testId={testId} leftTitle={leftTitle} rightTitle={rightTitle} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-leftTitle')).toBeVisible()
    expect(getByTestId('jest-rightTitle')).toBeVisible()
    expect(getByTestId('jest-switch')).toBeVisible()
  })
})
