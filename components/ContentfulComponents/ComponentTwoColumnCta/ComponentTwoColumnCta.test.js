import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { item } from '../../../__mocks__/componentTwoColumnCtaMock'
import { render } from '../../../__test-utils__/test-utils'
import ComponentTwoColumnCta from './ComponentTwoColumnCta'

describe('<ComponentTwoColumnCta />', () => {
  it('component renders', () => {
    const { getByTestId } = render(
      <ComponentTwoColumnCta testId='jest' {...item} />
    )
    expect(getByTestId('jest')).toBeVisible()
  })
})
