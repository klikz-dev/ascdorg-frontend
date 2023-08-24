import React from 'react'
import { render } from '../../../../__test-utils__/test-utils'
import '@testing-library/jest-dom/extend-expect'
import ELAccordion from './ELAccordion'

describe('<ELAccordion />', () => {
  it('component renders', () => {
    const { getByTestId } = render(<ELAccordion testId='jest' indexName='' />)
    expect(getByTestId('jest')).toBeVisible()
  })
})
