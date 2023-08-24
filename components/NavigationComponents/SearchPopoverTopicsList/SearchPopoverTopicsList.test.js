import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { searchPopoverItemMock } from '../../../__mocks__/SearchPopoverItemMock'
import { render } from '../../../__test-utils__/test-utils'
import SearchPopoverTopicsList from './SearchPopoverTopicsList'

const testId = 'jest'
const closeSearchPopover = () => null

describe('Custom SearchPopoverTopicsList component', () => {
  it('component renders when populated', () => {
    const { getByTestId } = render(
      <SearchPopoverTopicsList
        testId={testId}
        topics={searchPopoverItemMock}
        closeSearchPopover={closeSearchPopover}
      />
    )

    expect(getByTestId('jest')).toBeVisible()
  })

  it('component renders when populated with topics', () => {
    const screen = render(
      <SearchPopoverTopicsList
        testId={testId}
        items={searchPopoverItemMock}
        closeSearchPopover={closeSearchPopover}
      />
    )

    expect(screen.getByText('Leadership')).toBeInTheDocument()
    expect(screen.getByText('Curriculum')).toBeInTheDocument()
    expect(screen.getByText('Assessment')).toBeInTheDocument()
    expect(screen.getByText('Technology')).toBeInTheDocument()
    expect(screen.getByText('Equity')).toBeInTheDocument()
  })
})
