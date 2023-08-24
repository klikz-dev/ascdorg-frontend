import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@mui/material'
import { string, number, bool, shape, arrayOf, array } from 'prop-types'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import paths from '../../../paths/path'
import DaysAgo from '../../info/DaysAgo'
import TopicTag from '../../TopicTag'

export default function VideoPlaylistItem({
  slug,
  thumbnail,
  topic,
  premium,
  title,
  date,
  type,
  number,
  testId = 'VideoPlaylistItem',
}) {
  const url =
    type === 'video'
      ? paths.video({ slug: slug })
      : paths.webinar({ slug: slug })

  return (
    <Box mt={number > 0 ? 0.5 : -1} mb={0.5} data-testid={testId}>
      <Card
        sx={{
          width: '100%',
          height: '100%',
          minWidth: '312px',
          '&:hover': {
            /** old truncate class */
            'a > div:nth-of-type(2) > div > div:nth-of-type(2)': {
              color: 'hover.main',
              textDecoration: 'underline',
            },
            boxShadow:
              '0px 12px 17px rgba(0, 0, 0, 0.03), 0px 5px 22px rgba(0, 0, 0, 0.04), 0px 7px 8px rgba(0, 0, 0, 0.08)',
            borderRadius: '4px',
            cursor: 'pointer',
          },
        }}
        elevation={0}
      >
        <CardActionArea
          href={url}
          sx={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'flex-start',
            padding: 1,
            '&:hover': {
              textDecoration: 'none',
              '& .MuiCardActionArea-focusHighlight': { opacity: 0 },
            },
          }}
          disableRipple
        >
          <Box
            sx={{
              position: 'relative',
              width: '100px',
              height: '96px',
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '4px',
              '& div': {
                '& img': {
                  borderRadius: '4px',
                },
              },
            }}
          >
            <CardMedia
              component='img'
              title={thumbnail?.alternate}
              image={contentfulImageTransformation(thumbnail)}
              sx={{
                width: '100px',
                height: '96px',
                borderRadius: '4px',
              }}
            />
            <Box
              component='img'
              alt=''
              src='/images/playButton.svg'
              sx={{
                color: 'common.white',
                width: 60,
                height: 60,
                position: 'absolute',
                top: 'calc(50% - 30px)',
                left: 'calc(50% - 30px)',
              }}
              data-testid={`${testId}-img`}
            />
          </Box>

          <CardContent
            sx={{
              paddingTop: 0,
              paddingBottom: 0,
            }}
          >
            <Box
              maxHeight='100%'
              display='flex'
              flexDirection='column'
              justifyContent='space-between'
            >
              {topic && (
                <Box data-testid={`${testId}-topic`}>
                  <TopicTag
                    variant='special'
                    label={topic?.title}
                    premium={premium}
                  />
                </Box>
              )}
              <Box
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  lineHeight: '1.35rem' /* fallback */,
                  WebkitLineClamp: '2' /* number of lines to show */,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                <Typography
                  sx={{
                    fontSize: (theme) => theme.typography.pxToRem(14),
                    fontWeight: '700',
                    lineHeight: (theme) => theme.typography.pxToRem(21),
                    letterSpacing: '0.2px',
                  }}
                  data-testid={`${testId}-title`}
                >
                  {title}
                </Typography>
              </Box>
              <Box
                display='flex'
                alignItems='center'
                sx={{
                  '& *': {
                    color: 'grey.medium',
                  },
                }}
                data-testid={`${testId}-date`}
              >
                {date && (
                  <Box>
                    <DaysAgo input={date} variant='caption' />
                  </Box>
                )}
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  )
}

VideoPlaylistItem.propTypes = {
  type: string,
  number: number,
  testId: string,
  title: string,
  slug: string,
  premium: bool,
  featured: bool,
  date: string,
  topic: shape({
    title: string,
  }),
  thumbnail: shape({
    thumbnail: shape({
      imageBynder: arrayOf(
        shape({
          src: string,
        })
      ),
      imageContentful: shape({
        file: shape({
          url: string,
        }),
      }),
    }),
    alternate: string,
    imageBynder: array,
    imageContentful: shape({
      fields: shape({
        file: shape({
          url: string,
        }),
      }),
    }),
  }),
}
