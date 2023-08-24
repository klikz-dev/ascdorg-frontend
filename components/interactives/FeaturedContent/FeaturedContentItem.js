import { Box } from '@mui/material'
import { string, array, object } from 'prop-types'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import HorizontalSection from '../../HorizontalSection'

export default function FeaturedContentItem({ hits, title, authors }) {
  const content = hits?.[0]
  const author = Array.isArray(authors?.items)
    ? authors?.items?.filter(
        (author) => author.title === content?.author?.[0]
      )?.[0]
    : undefined

  if (content && author) {
    return (
      <Box>
        <HorizontalSection
          type={content?.type}
          title={title}
          viewAllLink={false}
          label={content?.topic?.[0]}
          linkText={content?.title}
          linkSlug={content?.url}
          date={content?.dateTimeStamp}
          imageSlug={author?.slug}
          authorImage={contentfulImageTransformation(author?.thumbnail, true)}
          authorTitle={author?.title}
        />
      </Box>
    )
  }

  return null
}

FeaturedContentItem.propTypes = {
  testId: string,
  title: string,
  authors: object,
  hits: array,
}
