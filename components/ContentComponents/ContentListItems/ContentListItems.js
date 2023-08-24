import { Box, Divider, Grid } from '@mui/material'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import {
  string,
  arrayOf,
  shape,
  bool,
  number,
  object,
  array,
  oneOfType,
} from 'prop-types'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import paths from '../../../paths/path'
import HorizontalCard from '../../HorizontalCard'

export default function ContentListItems({
  testId,
  items,
  variant = null,
  noImage = false,
  lines,
}) {
  TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo('en-US')
  return (
    <Grid
      container
      spacing={2}
      sx={{ marginLeft: '-10px' }}
      data-testid={testId}
    >
      {items?.map(
        (
          {
            title,
            premium,
            topic,
            image,
            issueDate,
            date,
            slug,
            ctaLink,
            authors,
          },
          index
        ) => {
          const divider = items.length > index + 1
          return (
            <Box key={`content-list-item-${title}`} mb={1} width='100%'>
              <HorizontalCard
                key={title}
                premium={premium || null}
                label={topic?.title}
                title={title}
                image={contentfulImageTransformation(image)}
                date={
                  issueDate || date
                    ? timeAgo.format(Date.parse(issueDate || date))
                    : ''
                }
                ctaLink={variant ? paths[variant]({ slug }) : ctaLink}
                reverse
                variant={variant}
                noImage={noImage}
                lines={lines}
                authorName={authors?.items}
              />
              {divider && (
                <Divider style={{ marginTop: 12, marginBottom: 8 }} />
              )}
            </Box>
          )
        }
      )}
    </Grid>
  )
}

ContentListItems.propTypes = {
  testId: string,
  items: arrayOf(
    shape({
      image: object,
      title: string,
      premium: bool,
      topic: object,
      issueDate: string,
      ctaLink: string,
      slug: string,
      date: string,
      authors: oneOfType([array, object]),
    })
  ),
  variant: string,
  noImage: bool,
  lines: number,
}
