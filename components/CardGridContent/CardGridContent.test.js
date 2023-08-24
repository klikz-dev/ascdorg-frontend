import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { card, pageId } from '../../__mocks__/cardGridContentMock'
import { render } from '../../__test-utils__/test-utils'
import CardGridContent from './CardGridContent'

describe('<CardGridContent />', () => {
  it('component renders with item', () => {
    const { getByTestId } = render(
      <CardGridContent testId='jest' {...card} pageId={pageId} />
    )
    expect(getByTestId('jest')).toBeVisible()
  })

  it('component displays regular image when showAvatar is false', () => {
    const { getByTestId } = render(
      <CardGridContent
        testId='jest'
        {...card}
        pageId={pageId}
        showAvatar={false}
      />
    )
    expect(getByTestId('jest-no-avatar')).toBeVisible()
  })

  it('component displays avatar when showAvatar is true', () => {
    const { getByTestId } = render(
      <CardGridContent testId='jest' {...card} pageId={pageId} showAvatar />
    )
    expect(getByTestId('jest-avatar')).toBeVisible()
  })
})
