import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { gridMock } from '../../../__mocks__/componentGridMock'
import { render } from '../../../__test-utils__/test-utils'
import ComponentGrid from './ComponentGrid'

describe('<ComponentGrid />', () => {
  it('component renders', () => {
    const { getByTestId } = render(
      <ComponentGrid testId='jest' {...gridMock} />
    )
    expect(getByTestId('jest')).toBeVisible()
  })
})
