import { Box } from '@mui/material'
import { string, shape, array, bool } from 'prop-types'
import paths from '../../../paths/path'
import SearchGridSection from '../../interactives/GridSection/SearchGridSection'

export default function FeaturedContentGrid({
  testId = 'Featured Content Grid',
  indexName,
  displayTitle,
  contentTypes,
  topics,
  keywords,
  authors,
  dateLowerRange,
  dateUpperRange,
  featured,
  premium,
  elArticleType,
  cta,
}) {
  if (!indexName) {
    return null
  }
  return (
    <Box mt={[3, 5]} mx={[1, 'auto']} data-testid={testId}>
      <SearchGridSection
        title={displayTitle}
        indexName={indexName}
        contentTypes={contentTypes}
        topics={topics}
        keywords={keywords}
        authors={authors}
        lowerDate={dateLowerRange}
        upperDate={dateUpperRange}
        featured={featured}
        premium={premium}
        elArticleType={elArticleType}
        ctaLabel={cta?.linkLabel}
        /** if a url or slug does not exist, create one with path
         * This method spreads either the wanted value or an empty object based on whether the value exists
         * from contentful
         */
        ctaLink={
          cta?.linkUrl ||
          paths.search({
            ...(contentTypes?.length ? { types: contentTypes } : {}),
            ...(topics?.length ? { topics: topics } : {}),
            ...(keywords?.length ? { keywords: keywords } : {}),
            ...(authors?.length ? { authors: authors } : {}),
            ...(typeof featured !== 'undefined'
              ? { featured: [featured] }
              : {}),
            ...(typeof premium !== 'undefined' ? { premium: [premium] } : {}),
          })
        }
        ctaTarget={cta?.linkTarget}
      />
    </Box>
  )
}

FeaturedContentGrid.propTypes = {
  testId: string,
  indexName: string,
  displayTitle: string,
  contentTypes: array,
  topics: array,
  keywords: array,
  authors: array,
  dateLowerRange: string,
  dateUpperRange: string,
  featured: bool,
  premium: bool,
  elArticleType: string,
  cta: shape({
    linkLabel: string,
    linkUrl: string,
    linkTarget: string,
  }),
}
