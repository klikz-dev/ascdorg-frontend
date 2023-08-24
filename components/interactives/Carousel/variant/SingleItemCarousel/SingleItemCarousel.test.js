import '@testing-library/jest-dom/extend-expect'
import {
  render,
  fireEvent,
  screen,
} from '../../../../../__test-utils__/test-utils'
import SingleImageCarousel from './SingleItemCarousel'

const nextImgSrc =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

describe('Custom ImageCarousel component:', () => {
  test('Make sure items in the component are rendered', () => {
    render(<SingleImageCarousel items={['/images/image404.png']} />)

    expect(screen.getByText('1 of 1')).toBeInTheDocument()
    expect(screen.getByLabelText('slide left')).toBeInTheDocument()
    expect(screen.getByLabelText('slide right')).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText('slide right'))
    expect(screen.getByRole('img')).toHaveAttribute('src', nextImgSrc)
  })
})
