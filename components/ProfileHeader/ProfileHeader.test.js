import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, screen } from '../../__test-utils__/test-utils'
import ProfileHeader from './ProfileHeader'

const testId = 'jest'
const profile = {
  thumbnail: {
    title: 'Test Thumbnail Title',
  },
  firstName: 'First Name',
  lastName: 'Last Name',
  role: 'role',
  experience: 'experience',
  position: 'position',
  email: 'email',
  linkedIn: '/',
  youTube: '/',
  facebook: '/',
  twitter: '/',
  instagram: '/',
}

describe('Custom ProfileHeader component', () => {
  it('component renders when populated', () => {
    const { getByTestId } = render(<ProfileHeader testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('component renders when populated', () => {
    const { getByTestId } = render(
      <ProfileHeader testId={testId} {...profile} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-avatar')).toBeVisible()
    expect(getByTestId('jest-name')).toBeVisible()
    expect(getByTestId('jest-about')).toBeVisible()
    expect(getByTestId('jest-socialbutton')).toBeVisible()
  })

  it('component renders the content when populated', () => {
    render(<ProfileHeader testId={testId} {...profile} />)

    expect(screen.getByText('First Name Last Name')).toBeInTheDocument()
    expect(screen.getByText('role, experience, position')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('Twitter')).toBeInTheDocument()
    expect(screen.getByText('Facebook')).toBeInTheDocument()
    expect(screen.getByText('YouTube')).toBeInTheDocument()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
  })
})
