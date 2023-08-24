import { Fragment } from 'react'
import { Divider, Grid, Box } from '@mui/material'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import {
  string,
  arrayOf,
  oneOfType,
  object,
  element,
  array,
  number,
} from 'prop-types'
import { contentfulImageTransformation } from '../../lib/data-transformations'
import { renderTime } from '../../lib/utils'
import paths from '../../paths/path'
import HorizontalCard from '../HorizontalCard'
import TwoColumnHeader from '../TwoColumnHeader'

/**
 * @todo Refactor this component
 */
export default function TwoColContentListing({
  testId,
  title,
  body,
  items,
  limit,
  variant,
}) {
  TimeAgo.addLocale(en)
  const isEvents = variant === 'event'
  const isWorkshops = variant === 'workshop'

  const getNewDate = (dateTime, endingTime) => {
    if (!dateTime) return null

    return renderTime(dateTime, endingTime, 'caption', true)
  }

  return (
    <Grid container data-testid={testId}>
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          pr: { xs: 0, md: '100px' },
          mb: { xs: 1, md: 0 },
        }}
      >
        <TwoColumnHeader
          title={title}
          body={body}
          ctaLink={isEvents || isWorkshops ? paths.events : null}
          ctaLabel={
            (isEvents || isWorkshops) && limit ? `View all ${variant}s` : null
          }
        />
      </Grid>
      <Grid item xs={12} md={7}>
        <Box mt={[5, 0]}>
          <Grid container>
            {items &&
              items.length > 0 &&
              items
                .slice(0, limit)
                .map(
                  (
                    {
                      title,
                      memberPrice,
                      premium,
                      type,
                      topic,
                      eventUrlDestination,
                      slug,
                      url,
                      linkUrl,
                      thumbnail,
                      dateTime,
                      endingTime,
                      body,
                    },
                    key
                  ) => {
                    const divider =
                      items.length - 1 > key ? (
                        <Divider
                          sx={{
                            display: 'block',
                            mb: { xs: 0, sm: '4px' },
                          }}
                        />
                      ) : null
                    return (
                      <Fragment key={`content-list-${key}`}>
                        <Grid item xs={12}>
                          <HorizontalCard
                            price={isWorkshops ? memberPrice : null}
                            remaining={
                              isWorkshops ? 'only 12 seats remaining' : null
                            }
                            premium={premium || null}
                            label={
                              variant === 'event' ? type?.title : topic?.title
                            }
                            title={title}
                            body={body || null}
                            image={contentfulImageTransformation(thumbnail)}
                            date={getNewDate(dateTime, endingTime)}
                            ctaLink={
                              eventUrlDestination
                                ? eventUrlDestination
                                : isEvents || isWorkshops
                                ? paths.event({ slug: slug })
                                : url || linkUrl
                            }
                            variant={variant}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          {divider}
                        </Grid>
                      </Fragment>
                    )
                  }
                )}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}

TwoColContentListing.propTypes = {
  testId: string,
  title: string,
  body: oneOfType([string, object, arrayOf(element)]),
  items: array,
  limit: oneOfType([string, number]),
  variant: string,
}
