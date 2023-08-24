import '@testing-library/jest-dom/extend-expect'
import { render } from '../../__test-utils__/test-utils'
import HorizontalCard from './HorizontalCard'

const testId = 'jest'
const premium = true
const label = 'Test Label'
const title = 'Test Title'
const authorName = 'Test Author'
const date = 'Test date'
const price = 15
const image = ''
const ctaLink = '/'
const body = 'Test Body'
const reverse = false // image is left
const variant = 'event' // el, article, event, author (same as paths)
const noImage = false
const lines = 2

describe('Custom HorizontalCard component', () => {
  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(<HorizontalCard testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(
      <HorizontalCard
        testId={testId}
        premium={premium}
        label={label}
        title={title}
        authorName={authorName}
        date={date}
        price={price}
        image={image}
        ctaLink={ctaLink}
        body={body}
        reverse={reverse}
        variant={variant}
        noImage={noImage}
        lines={lines}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toBeVisible()
    expect(getByTestId('jest-authorName')).toBeVisible()
    expect(getByTestId('jest-body')).toBeVisible()
    expect(getByTestId('jest-date')).toBeVisible()
  })
})
