import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import {
  componentHtmlHsForm,
  componentHtmlYoutube,
} from '../../../__mocks__/componentHtmlMock'
import { render } from '../../../__test-utils__/test-utils'
import EmbedHtmlComponent from './EmbedHtmlComponent'

describe('<EmbedHtmlComponent />', () => {
  it('component renders', () => {
    const { getByTestId } = render(<EmbedHtmlComponent testId='jest' />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('component renders Full-width HTML bottom with youtube video', () => {
    const { getByTestId } = render(
      <EmbedHtmlComponent testId='jest' {...componentHtmlYoutube} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toHaveTextContent(
      componentHtmlYoutube.displayTitle
    )
    expect(getByTestId('jest-html-code')).toBeVisible()
  })

  it('component renders Full-width HTML bottom with hubspot form', () => {
    const { getByTestId } = render(
      <EmbedHtmlComponent testId='jest' {...componentHtmlHsForm} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toHaveTextContent(
      componentHtmlHsForm.displayTitle
    )
    expect(getByTestId('jest-html-code')).toBeVisible()
  })
})
