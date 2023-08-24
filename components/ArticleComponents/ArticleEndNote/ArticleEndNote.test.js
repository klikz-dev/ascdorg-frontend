import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../../__test-utils__/test-utils'
import ArticleEndNote from './ArticleEndNote'

describe('<ArticleEndNote />', () => {
  const notes = {
    data: {},
    content: [
      {
        data: {},
        content: [
          {
            data: {},
            marks: [],
            value: 'Bandura, A. (1994). ',
            nodeType: 'text',
          },
          {
            data: {},
            marks: [
              {
                type: 'italic',
              },
            ],
            value: 'Self-efficacy',
            nodeType: 'text',
          },
          {
            data: {},
            marks: [],
            value: '. In V. S. Ramachaudran (Ed.), ',
            nodeType: 'text',
          },
          {
            data: {},
            marks: [
              {
                type: 'italic',
              },
            ],
            value: 'Encyclopedia of human behavior',
            nodeType: 'text',
          },
          {
            data: {},
            marks: [],
            value:
              ' (Vol. 4, pp. 71–81). New York: Academic Press. (Reprinted in H. Friedman [Ed.], ',
            nodeType: 'text',
          },
          {
            data: {},
            marks: [
              {
                type: 'italic',
              },
            ],
            value: 'Encyclopedia of mental health',
            nodeType: 'text',
          },
          {
            data: {},
            marks: [],
            value: '. San Diego, CA: Academic Press, 1998).',
            nodeType: 'text',
          },
        ],
        nodeType: 'paragraph',
      },
    ],
    nodeType: 'document',
  }
  it('component renders when blank', () => {
    const { getByTestId } = render(<ArticleEndNote testId='jest' />)
    expect(getByTestId('jest')).toBeVisible()
  })
  it('component renders title and body when applied', () => {
    const { getByTestId } = render(
      <ArticleEndNote testId='jest' title={'TEST'} notes={notes} />
    )
    expect(getByTestId('jest-title')).toHaveTextContent('TEST')
    expect(getByTestId('jest-notes').firstChild).toBeTruthy()
  })
})
