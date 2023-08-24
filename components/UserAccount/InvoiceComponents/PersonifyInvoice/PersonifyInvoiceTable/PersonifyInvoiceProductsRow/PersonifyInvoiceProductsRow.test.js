import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { invoice } from '../../../../../../__mocks__/invoiceMock'
import { render } from '../../../../../../__test-utils__/test-utils'
import PersonifyInvoiceProductsRow from './PersonifyInvoiceProductsRow'

describe('<PersonifyInvoiceProductsRow />', () => {
  it('component renders with invoice', () => {
    const { getByTestId } = render(
      <PersonifyInvoiceProductsRow
        testId='jest'
        orderDate={invoice.orderDate}
        {...invoice.productOrders[0]}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-product-info')).toHaveTextContent(
      `thing - ? - (111111111)`
    )
    expect(getByTestId('jest-quantity')).toHaveTextContent('3')
    expect(getByTestId('jest-unit-price')).toHaveTextContent('100')
    expect(getByTestId('jest-discount')).toHaveTextContent('5')
    expect(getByTestId('jest-quantity-discount')).toHaveTextContent('15')
    expect(getByTestId('jest-product-total')).toHaveTextContent('95')
  })
})
