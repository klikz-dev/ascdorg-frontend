import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { componentCTAItem } from '../../../__mocks__/componentCTAMock'
import { render } from '../../../__test-utils__/test-utils'
import ComponentCTA from './ComponentCTA'

describe('<ComponentCTA />', () => {
  it('component renders', () => {
    const { getByTestId } = render(
      <ComponentCTA testId='jest' {...componentCTAItem} />
    )
    expect(getByTestId('jest')).toBeVisible()
  })
})
