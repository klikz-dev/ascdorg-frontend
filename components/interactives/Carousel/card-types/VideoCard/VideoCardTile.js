import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material'
import { string } from 'prop-types'
import { renderTime } from '../../../../../lib/utils'
import paths from '../../../../../paths/path'
import DaysAgo from '../../../../info/DaysAgo'
import TopicTag from '../../../../TopicTag'

export default function VideoCardTile({
  testId = 'VideoCardTile',
  type,
  date,
  endingTime,
  slug,
  thumbnail,
  title,
  topic,
  search,
  eventUrlDestination = null,
}) {
  if (!type) return null
  function url(slug, search) {
    if (eventUrlDestination) {
      return eventUrlDestination
    }

    if (search) {
      return slug
    } else {
      return paths[type?.slice(0, -1)]({ slug: slug })
    }
  }
  return (
    <Card square elevation={0} data-testid={testId}>
      <CardActionArea
        href={url(slug, search, eventUrlDestination)}
        sx={{
          display: 'flex',
          width: type === 'events' || type === 'event' ? '264px' : '250px',
          padding: '6px',
          flexDirection: 'column',
          transition: 'all .2s ease-in-out',
          '&:hover': {
            boxShadow:
              '0px 12px 17px rgba(0, 0, 0, 0.03), 0px 5px 22px rgba(0, 0, 0, 0.04), 0px 7px 8px rgba(0, 0, 0, 0.08)',
            transform: 'scale(1.03)',
            textDecoration: 'none',
            '& .MuiCardActionArea-focusHighlight': {
              opacity: 0,
            },
          },
        }}
        disableRipple
      >
        <Box
          sx={{
            position: 'relative',
            borderRadius: '4px',
            backgroundColor: 'common.black',
          }}
        >
          <CardMedia
            component='img'
            alt={thumbnail}
            image={thumbnail}
            title={title}
            sx={{
              borderRadius: '4px',
              height: thumbnail === '/images/ASCDImageFiller.png' ? 1 : '160px',
              opacity: '0.8',
              '&:hover': {
                opacity: '0.6',
              },
            }}
            data-testid={`${testId}-img`}
          />
          {type !== 'event' && (
            <img
              alt=''
              src='/images/playButton.svg'
              style={{
                position: 'absolute',
                top: 'calc(50% - 28px)',
                left: 'calc(50% - 28px)',
                color: 'common.white',
                width: 56,
                height: 56,
                zIndex: 1,
              }}
            />
          )}
        </Box>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: 0,
            width: '100%',
            '& > div': {
              marginTop: 1,
              marginBottom: 0,
              '&:first-of-type': {
                marginTop: 1.5,
              },
            },
          }}
        >
          {topic && (
            <Box data-testid={`${testId}-topic`}>
              <TopicTag label={topic} textTransform='uppercase' />
            </Box>
          )}
          <Box
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              lineHeight: { xs: '1.25rem', md: '1.25rem' } /* fallback */,
              height: { xs: '2.5rem', md: '2.5rem' },
              WebkitLineClamp: '2' /* number of lines to show */,
              WebkitBoxOrient: 'vertical',
              '&:hover': {
                textDecoration: 'underline',
                color: 'hover.main',
              },
            }}
            data-testid={`${testId}-title`}
          >
            <Typography variant='h6'>{title}</Typography>
          </Box>
          <Box
            display='flex'
            alignItems='center'
            sx={{
              '& *': {
                color: 'grey.medium',
              },
            }}
            mb={1}
            pb={[0, 1]}
            data-testid={`${testId}-date`}
          >
            <Typography variant='caption'>
              {type === 'events' ? (
                renderTime(date, endingTime)
              ) : (
                <DaysAgo input={date} variant='caption' />
              )}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

VideoCardTile.propTypes = {
  testId: string,
  type: string,
  date: string,
  endingTime: string,
  slug: string,
  thumbnail: string,
  title: string,
  topic: string,
  search: string,
  eventUrlDestination: string,
}
