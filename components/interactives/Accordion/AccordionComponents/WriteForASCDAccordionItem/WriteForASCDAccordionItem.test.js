import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { writeForASCDItem } from '../../../../../__mocks__/accordionMock'
import {
  render,
  fireEvent,
  waitFor,
  act,
} from '../../../../../__test-utils__/test-utils'
import WriteForASCDAccordionItem from './WriteForASCDAccordionItem'

describe('<WriteForASCDAccordionItem />', () => {
  it('component renders', () => {
    const { getByTestId } = render(
      <WriteForASCDAccordionItem testId='jest' item={writeForASCDItem} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toHaveTextContent('Write for EL Magazine')
    expect(getByTestId('jest-subtitle')).toHaveTextContent(
      'Contribute to our flagship magazine written by practitioners for practitioners'
    )
  })

  it('component shows description when button is clicked', async () => {
    const { getByTestId } = render(
      <WriteForASCDAccordionItem testId='jest' item={writeForASCDItem} />
    )

    await waitFor(() => {
      act(() => {
        fireEvent.click(getByTestId('jest-button'))
      })
      expect(getByTestId('jest-details-content').firstChild).toBeTruthy()
    })
  })
})
