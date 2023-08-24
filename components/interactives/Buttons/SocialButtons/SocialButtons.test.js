import '@testing-library/jest-dom/extend-expect'
import { render } from '../../../../__test-utils__/test-utils'
import SocialButtons from './SocialButtons'

const testId = 'jest'

describe('Custom SocialButtons component', () => {
  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(<SocialButtons testId={testId} />)

    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-Facebook')).toBeVisible()
    expect(getByTestId('jest-Twitter')).toBeVisible()
    expect(getByTestId('jest-Instagram')).toBeVisible()
    expect(getByTestId('jest-LinkedIn')).toBeVisible()
    expect(getByTestId('jest-YouTube')).toBeVisible()
    expect(getByTestId('jest-Pinterest')).toBeVisible()
  })
})
