import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../__test-utils__/test-utils'
import PdfTitleBar from './PdfTitleBar'

const testId = 'jest'
const title = 'Test Title'
const volume = ''
const number = 1
const issueDate = ''

describe('Custom PdfTitleBar component', () => {
  it('component renders when populated', () => {
    const { getByTestId } = render(<PdfTitleBar testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('component renders when populated', () => {
    const { getByTestId } = render(
      <PdfTitleBar
        testId={testId}
        title={title}
        volume={volume}
        number={number}
        issueDate={issueDate}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toBeVisible()
    expect(getByTestId('jest-volume-number')).toBeVisible()
  })
})
