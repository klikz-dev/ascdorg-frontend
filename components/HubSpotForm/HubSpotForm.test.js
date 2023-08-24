import '@testing-library/jest-dom/extend-expect'
import { render } from '../../__test-utils__/test-utils'
import HubSpotForm from './HubSpotForm'

const testId = 'jest'
const formId = '02900e4d-c6eb-4056-b5a1-e98dc24949e3'

describe('Custom HubSpotForm component', () => {
  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(<HubSpotForm testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(
      <HubSpotForm testId={testId} formId={formId} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest')).toHaveAttribute(
      'id',
      'hubform-02900e4d-c6eb-4056-b5a1-e98dc24949e3'
    )
  })
})
