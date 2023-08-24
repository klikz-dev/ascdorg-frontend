import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../__test-utils__/test-utils'
import PdfIframe from './PdfIframe'

const testId = 'jest'
const title = 'Test Title'
const pdf = ''

describe('Custom PdfIframe component', () => {
  it('component renders when populated', () => {
    const { getByTestId } = render(<PdfIframe testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('component renders when populated', () => {
    const { getByTestId } = render(
      <PdfIframe testId={testId} title={title} pdf={pdf} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toBeVisible()
    expect(getByTestId('jest-pdf')).toBeVisible()
  })
})
