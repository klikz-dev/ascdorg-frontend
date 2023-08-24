import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../__test-utils__/test-utils'
import WitsbyTrialModal from './WitsbyTrialModal'

describe('<WitsbyTrialModal />', () => {
  it('component renders without Register button', () => {
    const { getByTestId, queryByTestId } = render(
      <WitsbyTrialModal testid='jest' title='test title' text='test text' />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toHaveTextContent('test title')
    expect(getByTestId('jest-text')).toHaveTextContent('test text')
    expect(getByTestId('jest-icon-button')).toBeTruthy()
    expect(queryByTestId('jest-button')).toBeNull()
  })
  it('component renders with Register button', () => {
    const { getByTestId, queryByTestId } = render(
      <WitsbyTrialModal
        testid='jest'
        title='test title'
        text='test text'
        showButton={true}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toHaveTextContent('test title')
    expect(getByTestId('jest-text')).toHaveTextContent('test text')
    expect(getByTestId('jest-icon-button')).toBeTruthy()
    expect(queryByTestId('jest-button')).toBeTruthy()
  })
})
