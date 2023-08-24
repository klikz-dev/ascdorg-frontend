import '@testing-library/jest-dom/extend-expect'
import { render } from '../../__test-utils__/test-utils'
import TextCta from './TextCta'

const testId = 'jest'
const title = 'Test Title'
const titleAlignment = ''
const description = []
const descriptionAlignment = ''
const button = false
const ctaLabel = 'Test Label'
const ctaLink = '/'
const target = ''
const ctaLinks = ['/', '/']
const bgColor = ''
const bgImage = ''
const rounded = ''

describe('Custom TextCta component', () => {
  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(<TextCta testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(
      <TextCta
        testId={testId}
        titleAlignment={titleAlignment}
        description={description}
        title={title}
        descriptionAlignment={descriptionAlignment}
        button={button}
        ctaLabel={ctaLabel}
        target={target}
        ctaLink={ctaLink}
        ctaLinks={ctaLinks}
        bgColor={bgColor}
        bgImage={bgImage}
        rounded={rounded}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toBeVisible()
    expect(getByTestId('jest-description')).toBeVisible()
    expect(getByTestId('jest-ctaLabel')).toBeVisible()
    expect(getByTestId('jest-links')).toBeVisible()
  })
})
