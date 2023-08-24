import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { item } from '../../../__mocks__/contentfulTableMock'
import { render } from '../../../__test-utils__/test-utils'
import ContentfulTable from './ContentfulTable'

const testId = 'jest'

describe('Custom ContentfulTable component', () => {
  it('component renders when not populated', () => {
    const { getByTestId } = render(<ContentfulTable testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('component renders when populated', () => {
    const { getByTestId } = render(
      <ContentfulTable testId={testId} {...item} />
    )

    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-head')).toBeVisible()
    expect(getByTestId('jest-body')).toBeVisible()
  })
})
