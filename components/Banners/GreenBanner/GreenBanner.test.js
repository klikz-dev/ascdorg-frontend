import '@testing-library/jest-dom/extend-expect'
import { greenBannerArgs } from '../../../__mocks__/bannerMock'
import { render } from '../../../__test-utils__/test-utils'
import GreenBanner from './GreenBanner'

describe('Custom GreenBanner component', () => {
  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(<GreenBanner testId='jest' />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(
      <GreenBanner testId='jest' {...greenBannerArgs} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-button')).toBeVisible()
    expect(getByTestId('jest-sharebuttons')).toBeVisible()
  })
})
