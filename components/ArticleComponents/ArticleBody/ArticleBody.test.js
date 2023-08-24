import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../../__test-utils__/test-utils'
import ArticleBody from './ArticleBody'

describe('<ArticleBody />', () => {
  it('component renders when blank', () => {
    const { getByTestId } = render(<ArticleBody testId='jest' />)
    expect(getByTestId('jest')).toBeVisible()
  })
  it('component renders children', () => {
    const children = <p>THIS IS A TEST</p>
    const { getByTestId } = render(
      <ArticleBody testId='jest'>{children}</ArticleBody>
    )
    expect(getByTestId('jest').firstChild).toHaveTextContent('THIS IS A TEST')
  })
})
