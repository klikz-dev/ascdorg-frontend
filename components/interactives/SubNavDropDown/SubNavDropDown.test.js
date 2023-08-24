import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, screen } from '../../../__test-utils__/test-utils'
import SubNavDropDown from './SubNavDropDown'

const subNav = [
  {
    dropdownLinkUrl: '/',
    dropdownLinkTarget: '_',
    dropdownLinkLabel: 'Test1',
  },
  {
    dropdownLinkUrl: '/',
    dropdownLinkTarget: '_',
    dropdownLinkLabel: 'Test2',
  },
]

describe('<SubNavDropDown />', () => {
  it('component renders when blank', () => {
    const { getByTestId } = render(<SubNavDropDown testId='jest' />)
    expect(getByTestId('jest')).toBeVisible()
  })
  it('component renders when populated', () => {
    const { getByTestId } = render(
      <SubNavDropDown testId='jest' subNav={subNav} />
    )

    expect(getByTestId('jest')).toBeVisible()
    expect(screen.getByText('More...')).toBeInTheDocument()
  })
})
