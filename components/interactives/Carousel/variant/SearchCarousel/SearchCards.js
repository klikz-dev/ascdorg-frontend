import ArticleCard from '../../card-types/ArticleCard'
import BlogCard from '../../card-types/BlogCard'
import SearchBookCard from '../../card-types/SearchBookCard'
import SearchEventCard from '../../card-types/SearchEventCard/SearchEventCard'
import SearchPodcastCard from '../../card-types/SearchPodcastCard/SearchPodcastCard'
import SearchVideoCard from '../../card-types/SearchVideoCard/SearchVideoCard'
import SearchWebinarCard from '../../card-types/SearchWebinarCard/SearchWebinarCard'

export default function Cards({ hits }) {
  const type = hits[0]?.type
  switch (type) {
    case 'article':
      return <ArticleCard items={hits} />
    case 'blog':
      return <BlogCard items={hits} />
    case 'book':
      return <SearchBookCard items={hits} />
    case 'video':
      return <SearchVideoCard items={hits} type={type} />
    case 'event':
      return <SearchEventCard items={hits} type={type} />
    case 'podcast':
      return <SearchPodcastCard items={hits} type={type} />
    case 'webinar':
      return <SearchWebinarCard items={hits} type={type} />
    default:
      return null
  }
}
