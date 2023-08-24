import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, screen } from '../../../../__test-utils__/test-utils'
import ProfileSocialButtons from './ProfileSocialButtons'

const testId = 'jest'
const instagram = 'Instagram'
const facebook = 'Facebook'
const youtube = 'YouTube'
const linkedin = 'LinkedIn'
const email = 'Email'
const twitter = 'Twitter'
const href = '/'

describe('Custom ProfileSocialButtons component', () => {
  it('component renders for Instagram', () => {
    const { getByTestId } = render(
      <ProfileSocialButtons testId={testId} name={instagram} href={href} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-Instagram')).toBeVisible()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
  })

  it('component renders for Facebook', () => {
    const { getByTestId } = render(
      <ProfileSocialButtons testId={testId} name={facebook} href={href} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-Facebook')).toBeVisible()
    expect(screen.getByText('Facebook')).toBeInTheDocument()
  })

  it('component renders for YouTube', () => {
    const { getByTestId } = render(
      <ProfileSocialButtons testId={testId} name={youtube} href={href} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-YouTube')).toBeVisible()
    expect(screen.getByText('YouTube')).toBeInTheDocument()
  })

  it('component renders for LinkedIn', () => {
    const { getByTestId } = render(
      <ProfileSocialButtons testId={testId} name={linkedin} href={href} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-LinkedIn')).toBeVisible()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
  })

  it('component renders for Email', () => {
    const { getByTestId } = render(
      <ProfileSocialButtons testId={testId} name={email} href={href} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-Email')).toBeVisible()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('component renders for Twitter', () => {
    const { getByTestId } = render(
      <ProfileSocialButtons testId={testId} name={twitter} href={href} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-Twitter')).toBeVisible()
    expect(screen.getByText('Twitter')).toBeInTheDocument()
  })
})
