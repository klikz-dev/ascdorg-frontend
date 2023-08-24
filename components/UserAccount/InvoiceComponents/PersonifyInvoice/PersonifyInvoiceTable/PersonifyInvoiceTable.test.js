import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { invoice } from '../../../../../__mocks__/invoiceMock'
import { render, within } from '../../../../../__test-utils__/test-utils'
import PersonifyInvoiceTable from './PersonifyInvoiceTable'

describe('<PersonifyInvoiceTable />', () => {
  it('component renders with invoice', () => {
    const { getByTestId } = render(
      <PersonifyInvoiceTable
        testId='jest'
        tax={invoice.tax}
        shipPrice={invoice.shipPrice}
        total={invoice.total}
        orderDate={invoice.orderDate}
        productOrders={invoice.productOrders}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-ship-price')).toHaveTextContent('$1.00')
    expect(getByTestId('jest-tax')).toHaveTextContent('$6.00')
    expect(getByTestId('jest-total-price')).toHaveTextContent('$102.00')
  })

  it('component renders corrent number of rows', () => {
    const { getByTestId } = render(
      <PersonifyInvoiceTable
        testId='jest'
        orderDate={invoice.orderDate}
        total={invoice.total}
        productOrders={invoice.productOrders}
      />
    )
    const component = getByTestId('jest-product-orders')
    const rows = within(component).getAllByTestId('jest-product-row')
    expect(rows.length).toBe(1)
  })
})
