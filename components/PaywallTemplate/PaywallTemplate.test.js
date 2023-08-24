import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../__test-utils__/test-utils'
import PaywallTemplate from './PaywallTemplate'

describe('<PaywallTemplate />', () => {
  const articleCount = 0

  it('PaywallTemplate renders for logged in user', () => {
    const { getByTestId } = render(
      <PaywallTemplate
        testId='jest'
        articleCount={articleCount}
        isLoggedIn={true}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toHaveTextContent(
      `You have ${articleCount} free signup articles left this month`
    )
    expect(getByTestId('jest-description')).toHaveTextContent(
      `Upgrade your account now for unlimited access.`
    )
  })

  it('PaywallTemplate renders for non logged in user', () => {
    const { getByTestId } = render(
      <PaywallTemplate
        testId='jest'
        articleCount={articleCount}
        isLoggedIn={false}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toHaveTextContent(
      `You have ${articleCount} free articles left this month`
    )
    expect(getByTestId('jest-description')).toHaveTextContent(
      `Create an account and get additional free articles.`
    )
  })
})
