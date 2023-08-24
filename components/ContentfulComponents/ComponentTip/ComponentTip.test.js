import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { componentTipItem } from '../../../__mocks__/componentTipMock'
import { render } from '../../../__test-utils__/test-utils'
import ComponentTip from './ComponentTip'

describe('<ComponentTip />', () => {
  it('component renders', () => {
    const { getByTestId } = render(
      <ComponentTip testId='jest' {...componentTipItem} />
    )
    expect(getByTestId('jest')).toBeVisible()
  })
})
