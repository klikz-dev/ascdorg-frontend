import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { invoice } from '../../../../../../__mocks__/invoiceMock'
import { render } from '../../../../../../__test-utils__/test-utils'
import SnipcartInvoiceProductsRow from './SnipcartInvoiceProductsRow'

describe('<SnipcartInvoiceProductsRow />', () => {
  it('component renders with invoice', () => {
    const { getByTestId } = render(
      <SnipcartInvoiceProductsRow
        testId='jest'
        orderDate={invoice.orderDate}
        {...invoice.productOrders[0]}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-id')).toHaveTextContent('111111111')
    expect(getByTestId('jest-name')).toHaveTextContent('thing')
    expect(getByTestId('jest-quantity')).toHaveTextContent('3')
    expect(getByTestId('jest-unit-price')).toHaveTextContent('$100.00')
    expect(getByTestId('jest-product-total')).toHaveTextContent('$95.00')
  })
})
