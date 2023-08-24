import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '../../../../../__test-utils__/test-utils'
import paths from '../../../../../paths/path'
import HorizontalCarousel from './HorizontalCarousel'

describe('Custom HorizontalCarousel component', () => {
  test('Make sure items in the component are rendered', () => {
    render(
      <HorizontalCarousel
        content={null}
        title='Shop Books'
        ctaLink={paths.search({ types: ['book'] })}
        carouselButtonSize='60'
        ctaLabel='View All'
        ctaTarget='_blank'
        scrollByAmount={4}
        type='books'
      />
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('Shop Books')).toBeInTheDocument()
    expect(screen.getByText('View All')).toBeInTheDocument()
  })
})
