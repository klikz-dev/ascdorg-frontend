import React from 'react'
import { render } from '../../../../__test-utils__/test-utils'
import '@testing-library/jest-dom/extend-expect'
import FAQAccordion from './FAQAccordion'

describe('<FAQAccordion />', () => {
  it('component renders', () => {
    const { getByTestId } = render(<FAQAccordion testId='jest' indexName='' />)
    expect(getByTestId('jest')).toBeVisible()
  })
})
