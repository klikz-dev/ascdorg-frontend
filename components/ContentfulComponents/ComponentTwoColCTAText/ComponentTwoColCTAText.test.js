import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { item } from '../../../__mocks__/componentTwoColCTATextMock'
import { render } from '../../../__test-utils__/test-utils'
import ComponentTwoColCTAText from './ComponentTwoColCTAText'

describe('<ComponentTwoColCTAText />', () => {
  it('component renders', () => {
    const { getByTestId } = render(
      <ComponentTwoColCTAText testId='jest' {...item} />
    )
    expect(getByTestId('jest')).toBeVisible()
  })
})
