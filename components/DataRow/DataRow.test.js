import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../__test-utils__/test-utils'
import DataRow from './DataRow'

describe('<DataRow />', () => {
  it('component renders when blank', () => {
    const { getByTestId } = render(
      <DataRow testId='jest' keyPair='' value='' />
    )
    expect(getByTestId('jest')).toBeVisible()
  })
  it('component renders key and value when included', () => {
    const { getByTestId } = render(
      <DataRow testId='jest' keyPair='key' value='value' />
    )
    expect(getByTestId('jest-key')).toHaveTextContent('key')
    expect(getByTestId('jest-value')).toHaveTextContent('value')
  })
  it('component renders background color when included', () => {
    const { getByTestId } = render(
      <DataRow testId='jest' keyPair='' value='' backgroundColor={'pink'} />
    )
    expect(getByTestId('jest')).toHaveStyle(`background-color: pink`)
  })
})
