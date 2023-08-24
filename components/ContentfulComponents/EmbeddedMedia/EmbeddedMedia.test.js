import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, screen } from '../../../__test-utils__/test-utils'
import EmbeddedMedia from './EmbeddedMedia'

const item = {
  displayTitle: 'Test Title',
  wistiaId: '12345',
  radio: 'Video',
}
const testId = 'jest'

describe('<EmbeddedMedia />', () => {
  it('EmbeddedMedia should render properly', () => {
    const { getByTestId } = render(<EmbeddedMedia testId={testId} />)

    expect(getByTestId('jest')).toBeVisible()
  })

  it('EmbeddedMedia should render properly', () => {
    const { getByTestId } = render(<EmbeddedMedia testId={testId} {...item} />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toBeVisible()
  })
})
