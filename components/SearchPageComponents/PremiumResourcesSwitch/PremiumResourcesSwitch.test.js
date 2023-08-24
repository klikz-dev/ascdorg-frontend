import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import {
  render,
  fireEvent,
  waitFor,
  act,
} from '../../../__test-utils__/test-utils'
import PremiumResourcesSwitch from './PremiumResourcesSwitch'

describe('<PremiumResourcesSwitch />', () => {
  let checked = false
  const onChange = jest.fn((checked) => !checked)

  it('component <PremiumResourcesSwitch> mounts when blank', () => {
    const { getByTestId } = render(<PremiumResourcesSwitch testId='jest' />)
    expect(getByTestId('jest')).toBeVisible()
  })
  it('component switches and calls onChange when switched', () => {
    const { getByTestId } = render(
      <PremiumResourcesSwitch
        testId='jest'
        checked={checked}
        onChange={onChange}
      />
    )
    expect(checked).toBe(false)
    waitFor(() => {
      act(() => {
        fireEvent.click(getByTestId('jest-switch'))
      })
      expect(checked).toBe(true)
      expect(onChange).toHaveBeenCalledTimes(1)
      act(() => {
        fireEvent.click(getByTestId('jest-switch'))
      })
      expect(checked).toBe(false)
      expect(onChange).toHaveBeenCalledTimes(1)
    })
  })
})
