import { Fragment } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Divider, Typography } from '@mui/material'
import { string, arrayOf, shape, object } from 'prop-types'
import { options } from '../../../const'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import paths from '../../../paths/path'
import HorizontalCard from '../../HorizontalCard'

export default function ArticleAuthors({ testId, authors, title }) {
  return (
    <Box data-testid={testId}>
      {title && (
        <Box mb={5}>
          <Typography variant='h3' data-testid={`${testId}-title`}>
            {title}
          </Typography>
        </Box>
      )}
      {authors
        .filter((author) => author)
        .map(({ slug, description, thumbnail }, key) => {
          const divider = authors.length > key + 1
          return (
            <Fragment key={key}>
              <Box my={3} data-testid={`${testId}-author`}>
                <HorizontalCard
                  key={slug}
                  body={documentToReactComponents(description?.json, options())}
                  image={contentfulImageTransformation(thumbnail)}
                  ctaLink={paths.author({ slug: slug })}
                  reverse
                  variant='author'
                />
              </Box>
              {divider && <Divider />}
            </Fragment>
          )
        })}
    </Box>
  )
}

ArticleAuthors.propTypes = {
  testId: string,
  authors: arrayOf(
    shape({
      slug: string,
      description: object,
      thumbnail: object,
    })
  ),
  title: string,
}
