import { Box } from '@mui/material'
import { string, bool, object } from 'prop-types'
import ArticleItem from '../../../ArticleComponents/ArticleItem'
import PodcastThumbnail from '../../../VideoComponents/PodcastThumbnail'

export default function SearchGridItem({
  testId = 'search-grid-item',
  submedia,
  item,
}) {
  if (!item) {
    return null
  }

  const articleTypes = ['article', 'blog', 'pubissue', 'pressRelease']
  const mediaTypes = ['video', 'webinar', 'podcast']

  const modifyMediaSlug = (slug, contentType) => {
    if (slug?.startsWith(`/${contentType}s/`)) {
      return slug.replace(`/${contentType}s/`, '')
    }
    return slug
  }

  const transformArticleData = (item) => {
    return {
      title: item?.title,
      actionHref: item?.url,
      mediaImg: item?.featuredImage || item?.thumbnail,
      premium: item?.premium,
      topicTag: item?.topic?.[0],
      authorName: item?.author?.[0],
      datePublished: item?.dateTimeStamp,
    }
  }

  const transformMediaData = (item) => {
    return {
      ...item,
      thumbnail: {
        imageContentful: { file: { url: item.thumbnail } },
      },
      slug: modifyMediaSlug(item.url, item.type),
      authors: item.author.map((author) => {
        const [first, last] = author.split(' ')
        return { firstName: first, lastName: last }
      }),
      date: item.dateTimeStamp,
      topic: { title: item.topic[0] },
    }
  }

  if (articleTypes.includes(item.type)) {
    return (
      <Box sx={{ height: '100%' }} data-testid={testId}>
        <ArticleItem
          {...transformArticleData(item)}
          overlay
          submedia={submedia}
          testId={`${testId}-article`}
        />
      </Box>
    )
  } else if (mediaTypes.includes(item.type)) {
    return (
      <Box data-testid={testId}>
        <PodcastThumbnail
          {...transformMediaData(item)}
          path={item.type}
          testId={`${testId}-media`}
        />
      </Box>
    )
  } else {
    return null
  }
}

SearchGridItem.propTypes = {
  testId: string,
  submedia: bool,
  item: object,
}
