import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { item } from '../../../__mocks__/componentTwoColContentListMock'
import { render } from '../../../__test-utils__/test-utils'
import ComponentTwoColumnContentList from './ComponentTwoColumnContentList'

describe('<ComponentTwoColumnContentList />', () => {
  it('component renders', () => {
    const { getByTestId } = render(
      <ComponentTwoColumnContentList testId='jest' {...item} />
    )
    expect(getByTestId('jest')).toBeVisible()
  })
})
