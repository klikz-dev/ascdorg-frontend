import React from 'react'
import HitComponent from '.'
import {
  bookHit,
  collectionHit,
  eventHit,
  pageHit,
  pressReleaseHit,
  podcastHit,
  videoHit,
  articleHit,
  bookChapterHit,
  pubissueHit,
  blogHit,
  webinarHit,
  workshopHit,
} from '../../../__mocks__/searchPageComponentMock'

export default {
  component: HitComponent,
  title: 'Components/SearchPageComponents/HitComponent',
}

const Template = (args) => <HitComponent {...args} />

// With Book Hit
export const BookHit = Template.bind({})
BookHit.args = { hit: bookHit }
BookHit.storyName = 'With Book Hit'

// With Event Hit
export const EventHit = Template.bind({})
EventHit.args = { hit: eventHit }
eventHit.storyName = 'With Event Hit'

// With Collection Hit
export const CollectionHit = Template.bind({})
CollectionHit.args = { hit: collectionHit }
CollectionHit.storyName = 'With Collection Hit'

// With Page Hit
export const PageHit = Template.bind({})
PageHit.args = { hit: pageHit }
PageHit.storyName = 'With Page Hit'

// With Press Release Hit
export const PressReleaseHit = Template.bind({})
PressReleaseHit.args = { hit: pressReleaseHit }
PressReleaseHit.storyName = 'With Press Release Hit'

// With Podcast Hit
export const PodcastHit = Template.bind({})
PodcastHit.args = { hit: podcastHit }
PodcastHit.storyName = 'With Podcast Hit'

// With Video Hit
export const VideoHit = Template.bind({})
VideoHit.args = { hit: videoHit }
VideoHit.storyName = 'With Video Hit'

// With Article Hit
export const ArticleHit = Template.bind({})
ArticleHit.args = { hit: articleHit }
ArticleHit.storyName = 'With Article Hit'

// With BookChapter Hit
export const BookChapterHit = Template.bind({})
BookChapterHit.args = { hit: bookChapterHit }
BookChapterHit.storyName = 'With BookChapter Hit'

// With PubIssue Hit
export const PubIssueHit = Template.bind({})
PubIssueHit.args = { hit: pubissueHit }
PubIssueHit.storyName = 'With PubIssue Hit'

// With Blog Hit
export const BlogHit = Template.bind({})
BlogHit.args = { hit: blogHit }
BlogHit.storyName = 'With Blog Hit'

// With Webinar Hit
export const WebinarHit = Template.bind({})
WebinarHit.args = { hit: webinarHit }
WebinarHit.storyName = 'With Webinar Hit'

// With Workshop Hit
export const WorkshopHit = Template.bind({})
WorkshopHit.args = { hit: workshopHit }
WorkshopHit.storyName = 'With Workshop Hit'
