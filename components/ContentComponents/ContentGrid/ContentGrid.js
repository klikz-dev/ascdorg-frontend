import { useState } from 'react'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import dateFormat from 'dateformat'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import { findEarliestSessionDate } from '../../../lib/utils'
import paths from '../../../paths/path'
import ViewAllCTA from '../../interactives/Buttons/ViewAllCTA'
import TopicTag from '../../TopicTag'
import WorkshopListItem from '../../WorkshopComponents/WorkshopListItem'
import ContentCardListing from '../ContentCardListing'

export default function ContentGrid({
  sectionTitle,
  items,
  contentLimit = 0,
  showFilters = true,
  showDivider = true,
  showViewAll = true,
  viewAllLink = paths.search({ types: [] }),
  columnWidth = 4,
  variant,
  limit = 12,
  type,
}) {
  const [topic, setTopic] = useState('')
  const [gridLimit, setGridLimit] = useState(limit)

  const loadMore = () => {
    setGridLimit(gridLimit + 6)
  }

  const _renderTopicFilters = () => {
    const topicFilters = items
      .map((item) => item?.topic?.title)
      .filter((topic) => !!topic)
      .reduce((unique, o) => {
        if (!unique.includes(o)) {
          unique.push(o)
        }
        return unique
      }, [])
      .sort()

    return topicFilters.map((filter, key) => (
      <TopicTag
        key={key}
        label={filter}
        variant='basicSmall'
        marginRight='8px'
        textTransform='uppercase'
        onClick={() => setTopic(filter)}
      />
    ))
  }
  const _renderItems = (items, columnWidth) => {
    return items
      .filter((item) => {
        if (topic !== '') {
          return topic === item.topic?.title
        }
        return true
      })
      .slice(0, contentLimit ? contentLimit : items.length)
      .map(({ slug, thumbnail, topic, title, date }, key) => {
        return (
          <Grid item xs={12} md={columnWidth} key={key}>
            <ContentCardListing
              slug={slug}
              thumbnail={thumbnail}
              topic={topic}
              title={title}
              date={date}
              type={type}
            />
          </Grid>
        )
      })
  }

  const _renderWorkshopItems = (items, columnWidth) => {
    return items
      .slice(0, `${contentLimit ? contentLimit : items.length}`)
      .map((item) => {
        return (
          <Grid
            item
            xs={12}
            md={columnWidth}
            key={`${item.variation.variationId}`}
          >
            <WorkshopListItem
              useMemberBookPrice
              mediaImg={contentfulImageTransformation(item?.spotlightImage)}
              title={item.variation?.title}
              topicTag={item?.type?.title}
              authorName={item?.authors?.items
                ?.map((a) => `${a?.firstName} ${a?.lastName}`)
                .join(' & ')}
              workshopDate={dateFormat(
                findEarliestSessionDate({
                  variation: item.variation,
                }),
                'mediumDate'
              )}
              clockHours={`${item.clockHours} Clock Hours`}
              memberPrice={item.variation?.memberPrice?.toFixed(2)}
              nonMemberPrice={item.variation?.nonMemberPrice?.toFixed(2)}
              id={item.variation?.variationId}
              actionHref={paths.workshop({
                slug: `${item.slug}/${
                  item.variation ? item.variation.variationId : ''
                }`,
              })}
            />
          </Grid>
        )
      })
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box display='flex' justifyContent='space-between'>
          <Box>
            <Typography variant='h4'>{sectionTitle}</Typography>
          </Box>

          {showViewAll && (
            <Box>
              <ViewAllCTA href={viewAllLink} label='View all' lg />
            </Box>
          )}
        </Box>
        {showDivider && (
          <Box mt={[1.5, 2.5]}>
            <Divider
              sx={{
                height: '1px',
                bgcolor: 'grey.light',
                width: '100%',
              }}
            />
          </Box>
        )}
      </Grid>
      {showFilters && (
        <Grid item xs={12}>
          <Box
            sx={{
              width: '100%',
              marginBottom: '-4px',
              whiteSpace: 'nowrap',
              overflowX: 'scroll',
              overflowY: 'hidden',
              WebkitOverflowScrolling: 'touch',
              '&::-webkit-scrollbar': {
                display: 'none',
              } /* Chrome, Safari */,
              msOverflowStyle: 'none' /* IE and Edge */,
              scrollbarWidth: 'none' /* Firefox */,
              '& div': {
                float: 'none',
              },
              '&:webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <TopicTag
              label='All Topics'
              variant='basicSmall'
              marginRight='8px'
              textTransform='uppercase'
              onClick={() => setTopic('')}
            />
            {_renderTopicFilters()}
          </Box>
        </Grid>
      )}
      {variant === 'workshop'
        ? _renderWorkshopItems(items.slice(0, gridLimit), columnWidth)
        : _renderItems(items.slice(0, gridLimit), columnWidth)}
      <Box my={10} textAlign='center'>
        {gridLimit < (contentLimit || items.length) && (
          <Button onClick={() => loadMore()} startIcon={<ArrowDownwardIcon />}>
            <Typography variant='h5'>View More</Typography>
          </Button>
        )}
      </Box>
    </Grid>
  )
}
