import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { render, screen } from '../../../__test-utils__/test-utils'
import PodcastThumbnail from './PodcastThumbnail'

const testId = 'jest'
const podcast = {
  topic: {
    title: 'test topic',
  },
  title: 'test title',
  date: '2021-05-27T18:30:49.523Z',
  authors: [
    {
      firstName: 'jack',
      lastName: 'jack',
    },
  ],
}
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

describe('Custom PodcastThumbnail component', () => {
  it('component renders when populated', () => {
    const { getByTestId } = render(<PodcastThumbnail testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('component renders when populated', () => {
    const { getByTestId } = render(
      <PodcastThumbnail testId={testId} {...podcast} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-topic')).toBeVisible()
    expect(getByTestId('jest-title')).toBeVisible()
    expect(getByTestId('jest-date')).toBeVisible()
    expect(getByTestId('jest-author')).toBeVisible()
  })

  it('component renders the context', () => {
    render(<PodcastThumbnail testId={testId} {...podcast} />)

    expect(screen.getByText('test topic')).toBeInTheDocument()
    expect(screen.getByText('jack jack')).toBeInTheDocument()
    expect(screen.getByText('test title')).toBeInTheDocument()
    expect(
      screen.getByText(
        `${timeAgo.format(Date.parse('2021-05-27T18:30:49.523Z'))}`
      )
    ).toBeInTheDocument()
  })
})
