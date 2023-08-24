import { contentfulImageTransformation } from '../../../../../lib/data-transformations'
import ArticleCard from '../../card-types/ArticleCard'
import BlogCard from '../../card-types/BlogCard'
import BookCard from '../../card-types/BookCard'
import CollectionCard from '../../card-types/CollectionCard'
import EventCard from '../../card-types/EventCard/EventCard'
import GridItemCard from '../../card-types/GridItemCard'
import IssueCard from '../../card-types/IssueCard'
import PodcastCard from '../../card-types/PodcastCard/PodcastCard'
import VideoCard from '../../card-types/VideoCard/VideoCard'
import WebinarCard from '../../card-types/WebinarCard'

export default function HorizontalCards({ content, type }) {
  /**
   * have to remap the data so it matches algolia and contentful
   * @todo fix inconsistent data between algolia and contentful */
  const contentfulContent = content?.map((item) => {
    return (
      {
        ...item,
        thumbnail: contentfulImageTransformation(item.thumbnail),
        author: [
          `${item?.authors?.items?.[0]?.firstName} ${item?.authors?.items?.[0]?.lastName}`,
        ],
        topic: [item?.topic?.title],
        dateTimeStamp: item.date || item.issueDate,
      } || item
    )
  })
  switch (type) {
    case 'books':
      return <BookCard items={contentfulContent} />
    case 'collections':
      return <CollectionCard items={contentfulContent} />
    case 'issues':
      return <IssueCard items={contentfulContent} />
    case 'blogs':
      return <BlogCard items={contentfulContent} />
    case 'articles':
      return <ArticleCard items={contentfulContent} />
    case 'grid':
      return <GridItemCard items={contentfulContent} />
    case 'videos':
      return <VideoCard items={contentfulContent} type={type} />
    case 'events':
      return <EventCard items={contentfulContent} type={type} />
    case 'podcasts':
      return <PodcastCard items={contentfulContent} type={type} />
    case 'webinars':
      return <WebinarCard items={contentfulContent} type={type} />
    default:
      return null
  }
}
