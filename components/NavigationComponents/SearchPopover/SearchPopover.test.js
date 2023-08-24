import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../../__test-utils__/test-utils'
import { SearchPopover } from './SearchPopover'

const testId = 'jest'
const searchPopover = true
const closeSearchPopover = () => null
const searchPopoverValue = ''
const setSearchPopoverValue = () => null
const resetSearchPopoverValue = () => null
const searchPopoverPlaceholder = ''
const triggerSearch = () => null
const onEnterKeyPress = () => null
const onCancelKeyPress = () => null
const topics = [
  {
    title: 'test tile topic',
  },
]
const grades = [
  {
    title: 'test tile topic',
  },
]
const subjects = [
  {
    title: 'test tile topic',
  },
]

describe('Custom SearchPopover component', () => {
  it('component renders when populated', () => {
    const { getByTestId } = render(
      <SearchPopover
        testId={testId}
        searchPopover={searchPopover}
        closeSearchPopover={closeSearchPopover}
        searchPopoverValue={searchPopoverValue}
        setSearchPopoverValue={setSearchPopoverValue}
        resetSearchPopoverValue={resetSearchPopoverValue}
        searchPopoverPlaceholder={searchPopoverPlaceholder}
        triggerSearch={triggerSearch}
        onEnterKeyPress={onEnterKeyPress}
        onCancelKeyPress={onCancelKeyPress}
        topics={topics}
        grades={grades}
        subjects={subjects}
      />
    )

    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-button')).toBeVisible()
    expect(getByTestId('jest-input')).toBeVisible()
    expect(getByTestId('jest-search')).toBeVisible()
    expect(getByTestId('jest-searchFAQ')).toBeVisible()
  })

  it('component renders text when populated', () => {
    const screen = render(
      <SearchPopover
        testId={testId}
        searchPopover={searchPopover}
        closeSearchPopover={closeSearchPopover}
        searchPopoverValue={searchPopoverValue}
        setSearchPopoverValue={setSearchPopoverValue}
        resetSearchPopoverValue={resetSearchPopoverValue}
        searchPopoverPlaceholder={searchPopoverPlaceholder}
        triggerSearch={triggerSearch}
        onEnterKeyPress={onEnterKeyPress}
        onCancelKeyPress={onCancelKeyPress}
        topics={topics}
        grades={grades}
        subjects={subjects}
      />
    )

    expect(screen.getByText('Search by Subject')).toBeVisible()
    expect(screen.getByText('Search by Grade')).toBeVisible()
    expect(screen.getByText('Search by Topic')).toBeVisible()
    expect(screen.getByText('Search FAQ')).toBeVisible()
  })
})
