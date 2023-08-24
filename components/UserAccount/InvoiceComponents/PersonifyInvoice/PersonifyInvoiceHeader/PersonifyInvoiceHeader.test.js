import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { invoice } from '../../../../../__mocks__/invoiceMock'
import { render } from '../../../../../__test-utils__/test-utils'
import PersonifyInvoiceHeader from './PersonifyInvoiceHeader'

describe('<PersonifyInvoiceHeader />', () => {
  it('component renders with invoice', () => {
    const { getByTestId } = render(
      <PersonifyInvoiceHeader
        testId='jest'
        orderNumber={invoice.orderNumber}
        poNumber={invoice.poNumber}
        orderDate={invoice.orderDate}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-order-number')).toHaveTextContent('11111111111')
    expect(getByTestId('jest-order-date')).toHaveTextContent('?')
  })
})
