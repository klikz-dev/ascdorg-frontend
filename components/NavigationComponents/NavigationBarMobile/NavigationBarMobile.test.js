import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import {
  render,
  waitFor,
  act,
  fireEvent,
} from '../../../__test-utils__/test-utils'
import NavigationBarMobile from './NavigationBarMobile'

describe('<NavigationBarMobile />', () => {
  const drawerOpen = false
  const setDrawerOpen = jest.fn()
  const openSearchPopover = jest.fn()
  const searchPopover = null
  const closeSearchPopover = jest.fn()
  const searchPopoverValue = ''
  const setSearchPopoverValue = jest.fn()
  const triggerSearch = jest.fn()
  const onEnterKeyPress = jest.fn()
  const selectedTopics = []
  const grades = []
  const subjects = []
  const renderComponent = () =>
    render(
      <NavigationBarMobile
        testId='jest'
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        openSearchPopover={openSearchPopover}
        searchPopover={searchPopover}
        closeSearchPopover={closeSearchPopover}
        searchPopoverValue={searchPopoverValue}
        setSearchPopoverValue={setSearchPopoverValue}
        triggerSearch={triggerSearch}
        onEnterKeyPress={onEnterKeyPress}
        selectedTopics={selectedTopics}
        grades={grades}
        subjects={subjects}
      />
    )
  it('component renders when blank', () => {
    const { getByTestId } = render(<NavigationBarMobile testId='jest' />)
    expect(getByTestId('jest')).toBeVisible()
  })
  it('component opens drawer when clicked', () => {
    const { getByTestId, queryByTestId } = renderComponent()
    expect(queryByTestId('jest-drawer')).toBeNull()
    waitFor(() => {
      act(() => {
        fireEvent.click(getByTestId('jest-drawerOpen'))
      })
      expect(getByTestId('jest-drawer')).toBeVisible()
    })
  })
  it('component opens search popout when clicked', () => {
    const { getByTestId, queryByTestId } = renderComponent()
    expect(queryByTestId('jest-search-popover')).toBeNull()
    waitFor(() => {
      act(() => {
        fireEvent.click(getByTestId('jest-open'))
      })
      expect(getByTestId('jest-search-popover')).toBeVisible()
    })
  })
})
