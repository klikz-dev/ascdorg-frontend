import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../../__test-utils__/test-utils'
import ButtonLinkComponent from './ButtonLinkComponent'

describe('<ButtonLinkComponent />', () => {
  const buttonStyle = ['Button (default)']
  const linkUrl = 'mailto:communications@ascd.org'
  const linkLabel = 'Contact'
  const linkTarget = '_blank'
  it('component renders', () => {
    const { getByTestId } = render(
      <ButtonLinkComponent
        testId='jest'
        buttonStyle={buttonStyle}
        linkUrl={linkUrl}
        linkLabel={linkLabel}
        linkTarget={linkTarget}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
  })
})
