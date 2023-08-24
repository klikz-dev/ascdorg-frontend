import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material'
import { string, object, shape } from 'prop-types'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import paths from '../../../paths/path'
import DaysAgo from '../../info/DaysAgo'
import TopicTag from '../../TopicTag'

export default function ContentCardListing({
  slug,
  thumbnail,
  topic,
  title,
  date,
  type,
  testId = 'contentcard-listing',
}) {
  const url = type ? paths[type]({ slug: slug }) : slug

  const imgUrl = contentfulImageTransformation(thumbnail)

  return (
    <Card
      square
      elevation={0}
      sx={{
        height: { xs: '100px', md: '294px' },
        borderRadius: '8px',
        padding: '6px',
        transition: 'all .2s ease-in-out',
        '&:hover': {
          boxShadow:
            '0px 12px 17px rgba(0, 0, 0, 0.03), 0px 5px 22px rgba(0, 0, 0, 0.04), 0px 7px 8px rgba(0, 0, 0, 0.08)',
          transform: 'scale(1.03)',
        },
      }}
      data-testid={testId}
    >
      <CardActionArea
        href={url}
        sx={{
          display: 'flex',
          borderRadius: '8px',
          flexDirection: { md: 'column' },
          '&:hover': {
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
            height: { xs: '96px', md: '160px' },
            width: { xs: '30%', md: '100%' },
            borderRadius: '4px',
            backgroundColor: 'common.black',
          }}
          data-testid={`${testId}-image`}
        >
          <CardMedia
            component='img'
            alt={thumbnail?.alternate}
            image={imgUrl}
            title={thumbnail?.title}
            sx={{
              borderRadius: '4px',
              height: { xs: '96px', md: '160px' },
              opacity: '0.8',
              '&:hover': {
                opacity: '0.6',
              },
            }}
          />
          <Box
            component='img'
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
        </Box>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: 0,
            width: { xs: '70%', md: '100%' },
            height: { xs: '96px', md: 'inherit' },
            marginLeft: { xs: 2, md: 0 },
            marginBottom: { md: 2 },
            '& > div': {
              marginTop: { xs: 4, md: 1 },
              marginBottom: 0,
              '&:first-of-type': {
                marginTop: { xs: 0, md: 1.5 },
              },
            },
          }}
        >
          {topic && (
            <Box my={2} data-testid={`${testId}-topic`}>
              <TopicTag label={topic?.title} textTransform='uppercase' />
            </Box>
          )}
          {title && (
            <Box
              sx={{
                overflow: { xs: '', md: 'hidden' },
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                lineHeight: { xs: '1.125rem', md: '1.25rem' } /* fallback */,
                maxHeight: { xs: '2.25rem', md: '2.5rem' },
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
          )}
          {date && (
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
              <Box>
                <DaysAgo input={date} variant='caption' />
              </Box>
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

ContentCardListing.propTypes = {
  slug: string,
  thumbnail: object,
  topic: shape({
    title: string,
  }),
  title: string,
  date: string,
  type: string,
  testId: string,
}
