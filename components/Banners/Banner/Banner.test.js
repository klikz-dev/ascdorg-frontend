import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../../__test-utils__/test-utils'
import Banner from './Banner'

describe('<Banner />', () => {
  it('component renders when blank', () => {
    const { getByTestId } = render(<Banner testId='jest' />)
    expect(getByTestId('jest')).toBeVisible()
  })
  it('component renders various elements', () => {
    const { getByTestId } = render(
      <Banner
        testId='jest'
        title='test'
        subtitle='test2'
        btn1Label='btn1'
        btn1Url='/test1'
        btn2Label='btn2'
        btn2Url='/test2'
      />
    )
    expect(getByTestId('jest-title')).toHaveTextContent('test')
    expect(getByTestId('jest-subtitle')).toHaveTextContent('test2')
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
  })
})
