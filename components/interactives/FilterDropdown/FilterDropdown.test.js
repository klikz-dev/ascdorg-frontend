import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import {
  render,
  fireEvent,
  act,
  waitFor,
  within,
} from '../../../__test-utils__/test-utils'
import FilterDropdown from './FilterDropdown'

const items = [
  {
    label: 'Classroom Management',
    value: ['Equity', 'Classroom Management'],
    count: 2,
    isRefined: false,
  },
  {
    label: 'Engagement',
    value: ['Equity', 'Engagement'],
    count: 7,
    isRefined: false,
  },
  {
    label: 'Equity',
    value: ['Professional Learning'],
    count: 5,
    isRefined: true,
  },
]
const currentRefinement = ['Equity']
describe('<FilterDropDown/>', () => {
  it('Component rendered successfully', () => {
    const { getByTestId } = render(
      <FilterDropdown
        testId='jest'
        items={items}
        currentRefinement={currentRefinement}
        refine={() => null}
      />
    )

    expect(getByTestId('jest')).toBeVisible()
  })

  it('should render correct multiple select value when the menu opens', () => {
    const { getByTestId, getByRole } = render(
      <FilterDropdown
        testId='jest'
        items={items}
        currentRefinement={currentRefinement}
        refine={() => null}
      />
    )
    waitFor(() => {
      act(() => {
        fireEvent.click(getByTestId('jest-multiple-checkbox'))
      })
      const component = getByRole('listbox')
      const options = within(component).getAllByRole('option')
      expect(options[0]).not.toHaveAttribute('aria-selected')
      expect(options[1]).not.toHaveAttribute('aria-selected')
      expect(options[2]).toHaveAttribute('aria-selected', 'true')
    })
  })

  it('should call refine function when the selected items changes', () => {
    const refine = jest.fn()
    const { getByTestId, getByRole } = render(
      <FilterDropdown
        testId='jest'
        items={items}
        currentRefinement={currentRefinement}
        refine={refine}
      />
    )
    waitFor(() => {
      act(() => {
        fireEvent.click(getByTestId('jest-multiple-checkbox'))
      })
      const component = getByRole('listbox')
      const options = within(component).getAllByRole('option')
      expect(refine).toHaveBeenCalledTimes(0)
      act(() => {
        fireEvent.click(options[0])
      })
      expect(refine).toHaveBeenCalledTimes(1)
    })
  })
})
