import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../__test-utils__/test-utils'
import MemberCard from './MemberCard'

const testId = 'jest'
const free = false
const popular = true
const price = 5
const title = 'Test Title'
const points = ['a', 'b']
const id = 'Member'
const ps = 'Test P.S'

describe('Custom MemberCard component', () => {
  it('component renders when populated', () => {
    const { getByTestId } = render(<MemberCard testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('component renders when populated', () => {
    const { getByTestId } = render(
      <MemberCard
        testId={testId}
        title={title}
        free={free}
        popular={popular}
        price={price}
        points={points}
        id={id}
        ps={ps}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-popular')).toBeVisible()
    expect(getByTestId('jest-price')).toBeVisible()
    expect(getByTestId('jest-points')).toBeVisible()
    expect(getByTestId('jest-ps')).toBeVisible()
  })
})
