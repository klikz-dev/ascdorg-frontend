import '@testing-library/jest-dom/extend-expect'
import { homeBannerMock } from '../../../__mocks__/homeBannerMock'
import { render } from '../../../__test-utils__/test-utils'
import HomeBanner from './HomeBanner'

const displayTitle = homeBannerMock[0].displayTitle
const button1 = homeBannerMock[0].button1
const button2 = homeBannerMock[0].button2
const imageContent = homeBannerMock[0].imageContent
const bodyText = homeBannerMock[0].bodyText.json
const items = homeBannerMock.slice(1, 4)

describe('Custom HomeBanner component', () => {
  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(<HomeBanner testId='jest' />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(
      <HomeBanner
        testId='jest'
        displayTitle={displayTitle}
        button1={button1}
        button2={button2}
        imageContent={imageContent}
        bodyText={bodyText}
        items={items}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-displayTitle')).toBeVisible()
    expect(getByTestId('jest-body')).toBeVisible()
    expect(getByTestId('jest-button1')).toBeVisible()
    expect(getByTestId('jest-button2')).toBeVisible()
    expect(getByTestId('jest-grid')).toBeVisible()
  })
})
