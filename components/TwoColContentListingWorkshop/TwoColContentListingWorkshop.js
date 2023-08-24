import { Fragment } from 'react'
import { Divider, Grid, Box } from '@mui/material'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { formatDateToCalendarMedium } from '../../lib/utils'
import paths from '../../paths/path'
import HorizontalCard from '../HorizontalCard'
import TwoColumnHeader from '../TwoColumnHeader'

export default function TwoColContentListingWorkshop({
  title,
  body,
  items,
  limit,
  variant,
}) {
  TimeAgo.addLocale(en)
  const isEvents = variant === 'event'
  const isWorkshops = variant === 'workshop'
  const ctaLink = isEvents
    ? paths.events
    : isWorkshops
    ? paths.workshop({ slug: '#allworkshops' })
    : null

  return (
    <Grid container>
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
          ctaLink={ctaLink}
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
              items.slice(0, limit).map((item, key) => {
                const divider =
                  items.length - 1 > key ? (
                    <Divider
                      sx={{
                        display: 'block',
                        marginBottom: '4px',
                      }}
                    />
                  ) : null

                const itemData =
                  item.__typename === 'Workshop'
                    ? {
                        title: item.title,
                        authorName: item.authors.items.length
                          ? `${item.authors.items?.[0]?.firstName} ${item.authors.items?.[0]?.lastName}`
                          : '',
                        label: 'Author Workshop',
                        price:
                          item.variations.items.length > 0 &&
                          item.variations.items[0]
                            ? item.variations.items[0].nonMemberPrice
                            : '',
                        image: item.spotlightImage.imgSrc,
                        actionHref: `/workshops/${item.slug}`,
                        date:
                          item.variations.items.length > 0 &&
                          item.variations.items[0]
                            ? `${formatDateToCalendarMedium(
                                item.variations.items[0].sessions.items[0]
                                  .startDatetime
                              )}-${item.clockHours} Clock Hours`
                            : '',
                      }
                    : item

                return (
                  <Fragment key={`content-list-${key}`}>
                    <Grid item xs={12}>
                      <HorizontalCard
                        key={itemData.title}
                        price={itemData.price}
                        remaining={itemData.remaining}
                        label={itemData.label}
                        title={itemData.title}
                        authorName={itemData.authorName}
                        image={itemData.image}
                        date={itemData.date}
                        endingTime={itemData?.endingTime}
                        ctaLink={itemData.actionHref}
                        variant={variant}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {divider}
                    </Grid>
                  </Fragment>
                )
              })}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
