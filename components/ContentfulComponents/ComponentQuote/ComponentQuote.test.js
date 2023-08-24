import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { quoteMock } from '../../../__mocks__/componentQuoteMock'
import { render } from '../../../__test-utils__/test-utils'
import ComponentQuote from './ComponentQuote'

describe('<ComponentQuote />', () => {
  it('component renders', () => {
    const { getByTestId } = render(
      <ComponentQuote testId='jest' {...quoteMock} />
    )
    expect(getByTestId('jest')).toBeVisible()
  })
})
