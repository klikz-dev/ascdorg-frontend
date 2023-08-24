import { Box } from '@mui/material'
import { string, array, bool, object } from 'prop-types'
import FeaturedContent from '../../interactives/FeaturedContent'

export default function FeaturedContentHorizontal({
  testId = 'Featured Content Grid',
  indexName,
  displayTitle,
  contentTypes,
  topics,
  keywords,
  featuredAuthors,
  dateLowerRange,
  dateUpperRange,
  featured,
}) {
  if (!indexName) {
    return null
  }
  return (
    <Box mt={[3, 5]} mx={[1, 'auto']} data-testid={testId}>
      <FeaturedContent
        title={displayTitle}
        indexName={indexName}
        contentTypes={contentTypes}
        topics={topics}
        keywords={keywords}
        featuredAuthors={featuredAuthors}
        lowerDate={dateLowerRange}
        upperDate={dateUpperRange}
        featured={featured}
      />
    </Box>
  )
}

FeaturedContentHorizontal.propTypes = {
  testId: string,
  indexName: string,
  displayTitle: string,
  contentTypes: array,
  topics: array,
  keywords: array,
  featuredAuthors: object,
  dateLowerRange: string,
  dateUpperRange: string,
  featured: bool,
}
