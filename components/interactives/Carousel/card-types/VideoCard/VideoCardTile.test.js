import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, screen } from '../../../../../__test-utils__/test-utils'
import VideoCardTile from './VideoCardTile'

const testId = 'jest'
const type = 'videos'
const date = ''
const slug = '/'
const thumbnail = ''
const title = 'Test Title'
const topic = 'Test Topic'

describe('Custom VideoCardTile component', () => {
  test('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(
      <VideoCardTile
        testId={testId}
        type={type}
        date={date}
        slug={slug}
        thumbnail={thumbnail}
        title={title}
        topic={topic}
      />
    )

    expect(getByTestId('jest')).toBeVisible()
    expect(screen.getByText('Test Topic')).toBeInTheDocument()
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(getByTestId('jest-title')).toBeVisible()
    expect(getByTestId('jest-date')).toBeVisible()
    expect(getByTestId('jest-topic')).toBeVisible()
    expect(getByTestId('jest-img')).toBeVisible()
  })
})
