import SpotlightArticleCard from '../../card-types/SpotlightArticleCard/SpotlightArticleCard'
import SpotlightAuthorWorkshopCard from '../../card-types/SpotlightAuthorWorkshopCard/SpotlightAuthorWorkshopCard'
import SpotlightBlogCard from '../../card-types/SpotlightBlogCard'
import SpotlightQuoteCard from '../../card-types/SpotlightQuoteCard/SpotlightQuoteCard'

export default function Cards({ content, type }) {
  switch (type) {
    case 'blog':
      return <SpotlightBlogCard content={content} />
    case 'article':
      return <SpotlightArticleCard content={content} />
    case 'quote':
      return <SpotlightQuoteCard content={content} />
    case 'author workshop':
      return <SpotlightAuthorWorkshopCard content={content} />
    default:
      return null
  }
}
