import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { invoice } from '../../../../__mocks__/invoiceMock'
import { render } from '../../../../__test-utils__/test-utils'
import PersonifyInvoice from './PersonifyInvoice'

describe('<PersonifyInvoice />', () => {
  it('component renders with invoice', () => {
    const { getByTestId } = render(
      <PersonifyInvoice testId='jest' invoiceItem={invoice} />
    )
    expect(getByTestId('jest')).toBeVisible()
  })
})
