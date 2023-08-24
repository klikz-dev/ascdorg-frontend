import { Box, Grid, Typography, Link } from '@mui/material'
import { string, shape, array, object } from 'prop-types'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import paths from '../../../paths/path'
import DaysAgo from '../../info/DaysAgo'
import TopicTag from '../../TopicTag'

export default function PodcastThumbnail({
  testId = 'media-thumbnail',
  slug,
  thumbnail,
  topic,
  title,
  date,
  authors,
  path,
}) {
  const pathUsed = (path) => {
    if (path === 'video') {
      return paths.video({ slug: slug })
    } else if (path === 'webinar') {
      return paths.webinar({ slug: slug })
    } else {
      return paths.podcast({ slug: slug })
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        minHeight: '390px',
        maxHeight: '556px',
      }}
      data-testid={testId}
    >
      <Box
        sx={{
          borderRadius: '4px',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          color: 'common.white',
          height: '100%',
          width: '100%',
          padding: 4,
          backgroundImage: `url(${contentfulImageTransformation(thumbnail)})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        display='flex'
        justifyContent='center'
        title={thumbnail?.alternate}
      />
      <Link
        href={`${pathUsed(path)}`}
        sx={{
          borderRadius: '4px',
          position: 'absolute',
          top: 0,
          left: 0,
          color: 'common.white',
          height: '100%',
          width: '100%',
          padding: 4,
          background:
            'linear-gradient(180deg,rgba(0,0,0,.04) 0%,rgba(0,0,0,.6) 51.04%,rgba(0,0,0,.75) 100%)',
          WebkitTransition: 'background-color 200ms ease-in-out',
          MozTransition: 'background-color 200ms ease-in-out',
          OTransition: 'background-color 200ms ease-in-out',
          transition: 'background-color 200ms ease-in-out',

          '&:hover': {
            backgroundColor: 'rgba(12, 134, 113, 0.6)',

            '& h3': {
              textDecoration: 'underline',
            },
            '& .MuiChip-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            },
          },
        }}
      >
        <Box
          component='img'
          alt=''
          src='/images/playButton.svg'
          sx={{
            position: 'absolute',
            top: 'calc(50% - 40px)',
            left: 'calc(50% - 42px)',
            color: 'common.white',
            width: 80,
            height: 80,
            zIndex: 1,
          }}
        />
        <Grid
          container
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            padding: (theme) => `0px ${theme.spacing(3)}`,
            color: 'common.white',
            zIndex: '1',
          }}
        >
          <Grid item xs={12}>
            <Box display='flex' data-testid={`${testId}-topic`}>
              {topic?.title && (
                <TopicTag
                  variant='special'
                  color='white'
                  label={topic?.title}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                lineHeight: '32px' /* fallback */,
                maxHeight: '64px' /* fallback */,
                WebkitLineClamp: '2' /* number of lines to show */,
                WebkitBoxOrient: 'vertical',
              }}
            >
              <Typography variant='h3' data-testid={`${testId}-title`}>
                {title}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display='flex' mb={1} pb={2.5}>
              {date && (
                <Box data-testid={`${testId}-date`}>
                  <DaysAgo input={date} variant='subtitle3' />
                </Box>
              )}

              {date && authors && authors.length > 0 && (
                <Box ml={1} mr={1}>
                  <Typography variant='subtitle3'>&#8226;</Typography>
                </Box>
              )}
              {authors && authors.length > 0 && (
                <Box>
                  <Typography
                    variant='subtitle3'
                    data-testid={`${testId}-author`}
                  >
                    {`${authors[0]?.firstName} ${authors[0]?.lastName}`}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Link>
    </Box>
  )
}

PodcastThumbnail.propTypes = {
  testId: string,
  slug: string,
  thumbnail: object,
  topic: shape({ title: string }),
  title: string,
  date: string,
  authors: shape({ items: array }),
  path: string,
}
