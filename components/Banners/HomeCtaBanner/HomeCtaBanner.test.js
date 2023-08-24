import '@testing-library/jest-dom/extend-expect'
import { homeBannerMock } from '../../../__mocks__/homeBannerMock'
import { render } from '../../../__test-utils__/test-utils'
import HomeCtaBanner from './HomeCtaBanner'

const imageContent = homeBannerMock[0].imageContent
const button1 = homeBannerMock[0].button1
const displayTitle = homeBannerMock[0].displayTitle

describe('Custom HomeCtaBanner component', () => {
  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(<HomeCtaBanner testId='jest' />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(
      <HomeCtaBanner
        testId='jest'
        displayTitle={displayTitle}
        button1={button1}
        imageContent={imageContent}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-displayTitle')).toBeVisible()
    expect(getByTestId('jest-image')).toBeVisible()
  })
})
