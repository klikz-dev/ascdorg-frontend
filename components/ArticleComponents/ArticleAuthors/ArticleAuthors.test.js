import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { authors } from '../../../__mocks__/articleAuthorMock'
import { render, within } from '../../../__test-utils__/test-utils'
import ArticleAuthors from './ArticleAuthors'

describe('<ArticleAuthors />', () => {
  it('ArticleAuthors', () => {
    const { getByTestId } = render(
      <ArticleAuthors testId='jest' authors={authors} title='test title' />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toHaveTextContent('test title')
  })

  it('Renders the correct number of author cards', () => {
    const { getByTestId } = render(
      <ArticleAuthors testId='jest' authors={authors} />
    )
    const component = getByTestId('jest')
    const authorItems = within(component).getAllByTestId('jest-author')
    expect(authorItems.length).toBe(1)
  })
})
