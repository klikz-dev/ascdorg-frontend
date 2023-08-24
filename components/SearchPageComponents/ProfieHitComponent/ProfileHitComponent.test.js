import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { profileHit } from '../../../__mocks__/searchPageComponentMock'
import { render } from '../../../__test-utils__/test-utils'
import ProfileHitComponent from './ProfileHitComponent'

describe('<ProfileHitComponent />', () => {
  it('component renders with hit', () => {
    const { getByTestId } = render(
      <ProfileHitComponent testId='jest' hit={profileHit} />
    )
    expect(getByTestId('jest')).toBeVisible()
  })
})
