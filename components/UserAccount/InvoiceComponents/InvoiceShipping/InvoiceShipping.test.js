import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { invoice } from '../../../../__mocks__/invoiceMock'
import { render } from '../../../../__test-utils__/test-utils'
import InvoiceShipping from './InvoiceShipping'

describe('<InvoiceShipping />', () => {
  const {
    shipName,
    emailId,
    shippingAddress1,
    shippingAddress2,
    shippingCity,
    shippingState,
    shippingCountry,
    shippingZip,
  } = invoice
  it('component renders with invoice', () => {
    const { getByTestId } = render(
      <InvoiceShipping
        testId='jest'
        title='TEST TITLE'
        name={shipName}
        email={emailId}
        address1={shippingAddress1}
        address2={shippingAddress2}
        city={shippingCity}
        state={shippingState}
        country={shippingCountry}
        zip={shippingZip}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toHaveTextContent('TEST TITLE')
    expect(getByTestId('jest-name')).toHaveTextContent('Ship Name')
    expect(getByTestId('jest-email')).toHaveTextContent('email@email.com')
    expect(getByTestId('jest-address1')).toHaveTextContent('ship St')
    expect(getByTestId('jest-address2')).toHaveTextContent('Ship Room')
    expect(getByTestId('jest-city-state-zip')).toHaveTextContent(
      'Ship City, TX 12345'
    )
    expect(getByTestId('jest-country')).toHaveTextContent('US')
  })

  it('component renders proper color', () => {
    const { getByTestId } = render(
      <InvoiceShipping testId='jest' color='red' />
    )
    expect(getByTestId('jest-title')).toHaveStyle('color: red;')
  })

  it('component renders proper dimension style', () => {
    const { getByTestId } = render(
      <InvoiceShipping testId='jest' singleLineFormat />
    )
    expect(getByTestId('jest')).toHaveStyle('flex-direction: row;')
  })
})
