import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, screen } from '../../../__test-utils__/test-utils'
import MiniCartTile from './MiniCartTile'

const testId = 'jest'
const snipcart = {
  label: 'Add to Cart',
  dataItemId: '121031',
  dataItemName:
    'Better Learning Through Structured Teaching: A Framework for the Gradual Release of Responsibility, 3rd Edition (Print Book)',
  dataItemUrl:
    'better-learning-through-structured-teaching-a-framework-for-the-gradual-release-of-responsibility-3rd-edition',
  dataItemImage:
    'https://library.ascd.org/m/554dc22877e74fc/webimage-bookcover6x9-BetterLearningThroughStructuredTeaching3rdEdition-Fisher-Frey.jpg?q=90',
  dataItemPrice: 29.95,
  dataItemCustom1Value: '81100',
  dataItemCustom2Value: true,
  dataItemCustom3Value: ['Douglas Fisher', 'Nancy Frey'],
  dataItemCustom4Value: false,
}

describe('Custom MiniCartTile component', () => {
  it('component renders when populated', () => {
    const { getByTestId } = render(
      <MiniCartTile testId={testId} snipcart={snipcart} />
    )

    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-price')).toBeVisible()
    expect(getByTestId('jest-name')).toBeVisible()
    expect(getByTestId('jest-snipcart')).toBeVisible()
  })

  it('component renders the content when populated', () => {
    render(<MiniCartTile testId={testId} snipcart={snipcart} />)

    expect(
      screen.getByText(
        'Better Learning Through Structured Teaching: A Framework for the Gradual Release of Responsibility, 3rd Edition (Print Book)'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('$29.95')).toBeInTheDocument()
    expect(screen.getByText('Add to Cart')).toBeInTheDocument()
  })
})
