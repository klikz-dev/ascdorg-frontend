import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { invoice } from '../../../../../__mocks__/invoiceMock'
import { render } from '../../../../../__test-utils__/test-utils'
import SnipcartInvoiceHeader from './SnipcartInvoiceHeader'

describe('<SnipcartInvoiceHeader />', () => {
  it('component renders with invoice', () => {
    const { getByTestId } = render(
      <SnipcartInvoiceHeader
        testId='jest'
        orderNumber={invoice.orderNumber}
        orderDate={invoice.orderDate}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-order-number')).toHaveTextContent('11111111111')
    expect(getByTestId('jest-order-date')).toHaveTextContent('?')
  })
})
