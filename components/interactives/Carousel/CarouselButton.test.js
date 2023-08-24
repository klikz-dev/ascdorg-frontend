import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '../../../__test-utils__/test-utils'
import CarouselLeftButton from './CarouselLeftButton'
import CarouselRightButton from './CarouselRightButton'

describe('Carousel Left Button', () => {
  test('Carousel Left Button rendered successfully', () => {
    render(<CarouselLeftButton />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByLabelText('slide left')).toBeInTheDocument()
  })
})

describe('Carousel Right Button', () => {
  test('Carousel Right Button rendered successfully', () => {
    render(<CarouselRightButton />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByLabelText('slide right')).toBeInTheDocument()
  })
})
