import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../../__test-utils__/test-utils'
import HeroBanner from './HeroBanner'

describe('<HeroBanner />', () => {
  it('component renders when blank', () => {
    const { getByTestId } = render(<HeroBanner testId='jest' />)
    expect(getByTestId('jest')).toBeVisible()
  })
  it('component renders various elements', () => {
    const { getByTestId } = render(
      <HeroBanner
        testId='jest'
        title='test'
        description='test2'
        ctaLabel1='btn1'
        ctaLink1='/test1'
        ctaTarget1='_blank'
        ctaLabel2='btn2'
        ctaLink2='/test2'
        ctaTarget2='_blank'
        image='https://library.ascd.org/m/3f2b70f080e3ef9b/webimage-1000X1000_HeroBlock_AuthorWorkshop.jpg?q=90'
        imageAlt='alt'
      />
    )
    expect(getByTestId('jest-title')).toHaveTextContent('test')
    expect(getByTestId('jest-description')).toHaveTextContent('test2')
    expect(getByTestId('jest-button-1')).toBeVisible()
    expect(getByTestId('jest-button-1-button')).toHaveTextContent('btn1')
    expect(getByTestId('jest-button-1-button')).toHaveAttribute(
      'href',
      '/test1'
    )
    expect(getByTestId('jest-button-2')).toBeVisible()
    expect(getByTestId('jest-button-2-button')).toHaveTextContent('btn2')
    expect(getByTestId('jest-button-2-button')).toHaveAttribute(
      'href',
      '/test2'
    )
    expect(getByTestId('jest-image')).toHaveAttribute(
      'src',
      'https://library.ascd.org/m/3f2b70f080e3ef9b/webimage-1000X1000_HeroBlock_AuthorWorkshop.jpg?q=90'
    )
    expect(getByTestId('jest-image')).toHaveAttribute('alt', 'alt')
  })
})
