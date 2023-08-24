import '@testing-library/jest-dom/extend-expect'
import { render } from '../../../__test-utils__/test-utils'
import VideoPlayer from './VideoPlayer'

const testId = 'jest'
const sectionTitle = 'Test Title'
const ctaLink = '/'
const video = {
  videoId: 'r7ukx3ez9x',
  topic: { title: 'Assessment' },
  title: 'Test Title',
  date: '2021-05-19T00:00-07:00',
}
const autoplay = false
const variant = 'green'
const noTruncate = true

describe('Custom VideoPlayer component', () => {
  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(<VideoPlayer testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(
      <VideoPlayer
        testId={testId}
        sectionTitle={sectionTitle}
        ctaLink={ctaLink}
        videoId={video.videoId}
        topic={video.topic}
        title={video.title}
        date={video.date}
        autoplay={autoplay}
        variant={variant}
        noTruncate={noTruncate}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-sectionTitle')).toBeVisible()
    expect(getByTestId('jest-video')).toBeVisible()
    expect(getByTestId('jest-title')).toBeVisible()
    expect(getByTestId('jest-date')).toBeVisible()
  })
})
