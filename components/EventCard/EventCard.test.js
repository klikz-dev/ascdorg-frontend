import '@testing-library/jest-dom/extend-expect'
import { render } from '../../__test-utils__/test-utils'
import EventCard from './EventCard'

const testId = 'jest'
const image = '/images/ASCDImageFiller.png'
const alt = ''
const title = 'Test'
const body = ' Test body'
const ctaLabel = 'Test Label'
const ctaLink = '/'
const ctaTarget = ''

describe('Custom EventCard component', () => {
  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(<EventCard testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(
      <EventCard
        testId={testId}
        image={image}
        alt={alt}
        title={title}
        body={body}
        ctaLabel={ctaLabel}
        ctaLink={ctaLink}
        ctaTarget={ctaTarget}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-image')).toBeVisible()
    expect(getByTestId('jest-title')).toBeVisible()
    expect(getByTestId('jest-body')).toBeVisible()
    expect(getByTestId('jest-link')).toBeVisible()
  })
})
