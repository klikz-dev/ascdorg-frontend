import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { profileMock } from '../../../__mocks__/profileMock'
import { render } from '../../../__test-utils__/test-utils'
import Profile from './Profile'

/** @todo: get correct input */
describe('<Profile />', () => {
  it('component renders', () => {
    const { getByTestId } = render(<Profile testId='jest' {...profileMock} />)
    expect(getByTestId('jest')).toBeVisible()
  })
})
