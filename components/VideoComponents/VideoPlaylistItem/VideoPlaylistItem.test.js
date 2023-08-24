import '@testing-library/jest-dom/extend-expect'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { videoItem } from '../../../__mocks__/VideoPlaylistItemMock'
import { render } from '../../../__test-utils__/test-utils'
import VideoPlaylistItem from './VideoPlaylistItem'

const testId = 'jest'
const number = 1

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

describe('Custom VideoPlaylistItem component', () => {
  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(
      <VideoPlaylistItem testId={testId} {...videoItem} number={number} />
    )

    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-img')).toBeVisible()
    // expect(getByTestId('jest-topic')).toBeVisible()
    expect(getByTestId('jest-title')).toBeVisible()
    expect(getByTestId('jest-date')).toBeVisible()
  })

  it('component renders content successfully', () => {
    const screen = render(
      <VideoPlaylistItem testId={testId} {...videoItem} number={number} />
    )
    expect(screen.getByText('Professional Learning')).toBeInTheDocument()
    expect(
      screen.getByText('Video / When Teachers Take the Lead')
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        `${timeAgo.format(Date.parse('2019-11-01T00:00-04:00'))}`
      )
    ).toBeInTheDocument()
  })
})
