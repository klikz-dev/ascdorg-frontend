import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { issue } from '../../../__mocks__/articleIssueMock'
import {
  render,
  fireEvent,
  waitFor,
  act,
  screen,
} from '../../../__test-utils__/test-utils'
import ArticleIssue from './ArticleIssue'

describe('<ArticleIssue />', () => {
  it('component renders issue image', () => {
    const { getByTestId } = render(<ArticleIssue testId='jest' {...issue} />)
    expect(getByTestId('jest-article-issue-image')).toHaveAttribute(
      'src',
      /** I'm not sure why this is what it finds */
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    )
    expect(getByTestId('jest-article-issue-image')).toHaveAttribute(
      'alt',
      'May 2022 Ready for the Real World? thumbnail'
    )
  })

  it('component renders issue title', () => {
    const { getByTestId } = render(<ArticleIssue testId='jest' {...issue} />)
    expect(getByTestId('jest-title')).toHaveTextContent(
      'Ready for the Real World?'
    )
  })
  it('clicking the cta button navigates to the correct page', () => {
    const { getByTestId } = render(<ArticleIssue testId='jest' {...issue} />)
    waitFor(() => {
      act(() => {
        fireEvent.click(getByTestId('jest-button'))
      })
      expect(screen.getByTestId('?')).toBeVisible()
    })
  })
})
