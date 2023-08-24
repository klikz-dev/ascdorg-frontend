import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../../__test-utils__/test-utils'
import ComponentButton from './ComponentButton'

describe('<ComponentButton />', () => {
  const label = 'Learn About the Whole Child'
  const url =
    'https://professional-development.ascd.org/whole-child-implementations'
  it('component renders', () => {
    const { getByTestId } = render(
      <ComponentButton testId='jest' label={label} url={url} />
    )
    expect(getByTestId('jest')).toBeVisible()
  })
})
