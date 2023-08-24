import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, waitFor } from '../../../__test-utils__/test-utils'
import Header from './Header'

const resizeWindow = (x, y) => {
  window.innerWidth = x
  window.innerHeight = y
  window.dispatchEvent(new Event('resize'))
}

const renderComponent = () => render(<Header testId='jest' />)

/** @todo: remove skip once React 18 is updated as it works on that */
describe.skip('<Header />', () => {
  it('component renders when blank', () => {
    const { getByTestId } = renderComponent()
    expect(getByTestId('jest')).toBeVisible()
  })
  it('component renders desktop navbar when screen width is large enough', () => {
    const { getByTestId, queryByTestId } = renderComponent()
    resizeWindow(1000, 900)
    waitFor(() => {
      expect(getByTestId('jest-desktop')).toBeVisible()
      expect(queryByTestId('jest-mobile')).toBeNull()
    })
  })
  it('component renders mobile navbar when screen width is small enough', () => {
    const { getByTestId, queryByTestId } = renderComponent()
    resizeWindow(300, 900)
    waitFor(() => {
      expect(getByTestId('jest-mobile')).toBeVisible()
      expect(queryByTestId('jest-desktop')).toBeNull()
    })
  })
})
