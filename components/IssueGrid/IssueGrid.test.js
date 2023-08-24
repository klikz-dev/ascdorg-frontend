import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { issues } from '../../__mocks__/issueGridMock'
import { render } from '../../__test-utils__/test-utils'
import IssueGrid from './IssueGrid'

describe('<IssueGrid />', () => {
  it('component renders when populated', () => {
    const { getByTestId } = render(<IssueGrid testId='jest' issues={issues} />)
    expect(getByTestId('jest')).toBeVisible()
  })
})
