import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, screen } from '../../../__test-utils__/test-utils'
import SubNav from './SubNav'

const items = [
  {
    subNavLinkUrl: '/',
    subNavLinkTarget: '_',
    subNavLinkLabel: 'Test1',
  },
  {
    subNavLinkUrl: '/',
    subNavLinkTarget: '_',
    subNavLinkLabel: 'Test2',
  },
]

describe('<SubNav />', () => {
  it('component renders when blank', () => {
    const { getByTestId } = render(<SubNav testId='jest' />)
    expect(getByTestId('jest')).toBeVisible()
  })
  it('component renders when populated', () => {
    const { getByTestId } = render(<SubNav testId='jest' items={items} />)

    expect(getByTestId('jest')).toBeVisible()
    expect(screen.getByText('Test1')).toBeInTheDocument()
    expect(screen.getByText('Test2')).toBeInTheDocument()
  })
})
