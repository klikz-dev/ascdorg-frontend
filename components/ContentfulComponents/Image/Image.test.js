import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { imageItem } from '../../../__mocks__/imageMock'
import { render } from '../../../__test-utils__/test-utils'
import Image from './Image'

describe('<Image />', () => {
  it('component renders graphql data', () => {
    const { getByTestId } = render(
      <Image testId='jest-graphql' {...imageItem} />
    )
    expect(getByTestId('jest-graphql')).toBeVisible()
  })
})
