import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { item } from '../../__mocks__/contentfulTableMock'
import { render, screen } from '../../__test-utils__/test-utils'
import TableContent from './TableContent'

const testId = 'jest'

const { title, tableRowContent } = item
const item1 = tableRowContent?.items?.[0]?.tableColumnContent?.items
const item2 = tableRowContent?.items

describe('Custom TableContent component', () => {
  it('component renders when populated', () => {
    const { getByTestId } = render(<TableContent testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('component renders when populated', () => {
    const { getByTestId } = render(
      <TableContent testId={testId} title={title} item1={item1} item2={item2} />
    )

    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-head')).toBeVisible()
    expect(getByTestId('jest-body')).toBeVisible()
  })

  it('component renders when populated', () => {
    render(
      <TableContent testId={testId} title={title} item1={item1} item2={item2} />
    )

    expect(screen.getByText('Column 1')).toBeVisible()
    expect(screen.getByText('Column 2')).toBeVisible()
    expect(screen.getByText('Column 3')).toBeVisible()
    expect(screen.getByText('Test Body 1')).toBeVisible()
    expect(screen.getByText('Test Body 2')).toBeVisible()
    expect(screen.getByText('Test Body 3')).toBeVisible()

    expect(screen.getByText('title')).toBeVisible()
  })
})
