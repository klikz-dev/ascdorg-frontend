import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, screen } from '../../../__test-utils__/test-utils'
import PodcastPlayer from './PodcastPlayer'

describe('<PodcastPlayer />', () => {
  it('PodcastPlayer render', () => {
    const { getByTestId } = render(
      <PodcastPlayer testId='jest' sectionTitle='Podcast' podcast='id' />
    )
    expect(screen.getByText('Podcast')).toBeInTheDocument()
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-wistia')).toBeVisible()
  })
})
