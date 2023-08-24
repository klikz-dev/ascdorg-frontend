import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../../__test-utils__/test-utils'
import RegisterNowButton from './RegisterNowButton'

describe('<RegisterNowButton />', () => {
  const item = {
    buttonAdministrativeTitle: 'Media contact',
    buttonStyle: ['Button (default)'],
    linkUrl: 'mailto:communications@ascd.org',
    linkLabel: 'Contact',
    linkTarget: 'piano',
    id: 'Digital-Premium',
    align: 'left',
  }
  it('component renders', () => {
    const { getByTestId } = render(
      <RegisterNowButton testId='jest' {...item} />
    )
    expect(getByTestId('jest')).toBeVisible()
  })
})
