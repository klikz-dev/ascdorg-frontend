import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { issues } from '../../__mocks__/issueGridMock'
import { render, within } from '../../__test-utils__/test-utils'
import IssueGridItems from './IssueGridItems'

describe('<IssueGrid />', () => {
  it('component renders when populated', () => {
    const { getByTestId } = render(
      <IssueGridItems testId='jest' items={issues} />
    )
    expect(getByTestId('jest')).toBeVisible()
  })

  it('component should have all items when default selected', () => {
    const { getByTestId } = render(
      <IssueGridItems testId='jest' items={issues} year={'2022'} topic={''} />
    )

    const component = getByTestId('jest')
    const items = within(component).getAllByTestId('jest-item')
    expect(items.length).toBe(2)
  })
})
