import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { invoice } from '../../../../__mocks__/invoiceMock'
import { render } from '../../../../__test-utils__/test-utils'
import ContentToPrint from './ContentToPrint'

describe('<ContentToPrint />', () => {
  it('component renders with invoice', () => {
    const { getByTestId } = render(
      <ContentToPrint testId='jest' invoiceItem={invoice} />
    )
    expect(getByTestId('jest')).toBeVisible()
  })

  it('component renders snipcart when true', () => {
    const { getByTestId } = render(
      <ContentToPrint testId='jest' isSnipcart invoiceItem={invoice} />
    )
    expect(getByTestId('jest-snipcart')).toBeVisible()
  })

  it('component renders personfiy when false', () => {
    const { getByTestId } = render(
      <ContentToPrint testId='jest' isSnipcart={false} invoiceItem={invoice} />
    )
    expect(getByTestId('jest-personify')).toBeVisible()
  })
})
