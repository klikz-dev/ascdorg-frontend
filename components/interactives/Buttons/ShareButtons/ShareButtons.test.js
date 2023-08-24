import '@testing-library/jest-dom/extend-expect'
import { render } from '../../../../__test-utils__/test-utils'
import ShareButtons from './ShareButtons'

const testId = 'jest'
const url = '/'
const title = 'Test Title'
const showEmailLink = '/'

describe('Custom ShareButtons component', () => {
  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(<ShareButtons testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(
      <ShareButtons
        testId={testId}
        title={title}
        showEmailLink={showEmailLink}
        url={url}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-facebook')).toBeVisible()
    expect(getByTestId('jest-linkedin')).toBeVisible()
    expect(getByTestId('jest-twitter')).toBeVisible()
    expect(getByTestId('jest-email')).toBeVisible()
  })
})
