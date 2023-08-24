import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { invoice } from '../../../../__mocks__/invoiceMock'
import { render } from '../../../../__test-utils__/test-utils'
import InvoicePaymentInfo from './InvoicePaymentInfo'

describe('<InvoicePaymentInfo />', () => {
  it('component renders with invoice', () => {
    const { getByTestId } = render(
      <InvoicePaymentInfo
        testId='jest'
        creditCardLast4Digits={invoice.creditCardLast4Digits}
        completionDate={invoice.completionDate}
        cardType={invoice.cardType}
        paymentMethod={invoice.paymentMethod}
        paymentStatus={invoice.paymentStatus}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-payment-type')).toHaveTextContent(
      'CreditCard - Visa'
    )
    expect(getByTestId('jest-payment-status')).toHaveTextContent('Paid')
    expect(getByTestId('jest-payment-date')).toHaveTextContent(
      '2022-05-30 10:05:11'
    )
    expect(getByTestId('jest-cc-4-digits')).toHaveTextContent('1234')
  })
})
