import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, screen } from '../../../__test-utils__/test-utils'
import ValuePropositionCta from './ValuePropositionCta'

const testId = 'jest'
const isHeader = true
const toggleVideoBanner = false
const valuepropositions = {
  title: 'test title',
  ctaTagline: '/',
  ctaValuePropositionItems: {
    items: [
      {
        icon: '/',
        itemTagline: 'test tagline',
        itemCtaUrl: '/',
        itemDescription: 'test description',
      },
    ],
  },
  ctaAdditionInfo: '',
}
const valuepropositions1 = {
  title: '',
}

describe('Custom ValuePropositionCta component', () => {
  it('component renders when populated', () => {
    const { getByTestId } = render(
      <ValuePropositionCta testId={testId} {...valuepropositions1} />
    )
    expect(getByTestId('jest')).toBeVisible()
  })

  it('component renders when populated', () => {
    const { getByTestId } = render(
      <ValuePropositionCta
        testId={testId}
        isHeader={isHeader}
        toggleVideoBanner={toggleVideoBanner}
        {...valuepropositions}
      />
    )

    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toBeVisible()
    expect(getByTestId('jest-ctaTagLine')).toBeVisible()
    expect(getByTestId('jest-isHeader')).toBeVisible()
    expect(getByTestId('jest-valueproposition')).toBeVisible()
  })

  it('component renders the content when populated', () => {
    render(
      <ValuePropositionCta
        testId={testId}
        isHeader={isHeader}
        toggleVideoBanner={toggleVideoBanner}
        {...valuepropositions}
      />
    )

    expect(screen.getByText('test title')).toBeInTheDocument()
    expect(screen.getByText('/')).toBeInTheDocument()
    expect(screen.getByText('View our video')).toBeInTheDocument()
    expect(screen.getByText('test tagline')).toBeInTheDocument()
    expect(screen.getByText('test description')).toBeInTheDocument()
  })
})
