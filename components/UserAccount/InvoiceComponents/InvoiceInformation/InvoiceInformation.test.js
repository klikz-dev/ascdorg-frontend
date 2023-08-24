import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { invoice } from '../../../../__mocks__/invoiceMock'
import { render } from '../../../../__test-utils__/test-utils'
import InvoiceInformation from './InvoiceInformation'

describe('<InvoiceInformation />', () => {
  it('component renders with invoice', () => {
    const { getByTestId } = render(
      <InvoiceInformation
        testId='jest'
        title={'TITLE'}
        roleCategory={invoice.roleCategory}
        school={invoice.school}
        district={invoice.district}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toHaveTextContent('TITLE')
    expect(getByTestId('jest-role-category')).toHaveTextContent('Principal')
    expect(getByTestId('jest-school')).toHaveTextContent('skool')
    expect(getByTestId('jest-district')).toHaveTextContent('school district')
  })
})
