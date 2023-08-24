import { Box, Grid, Typography } from '@mui/material'
import { string, object, bool } from 'prop-types'
import ReactPlayer from 'react-player'
import WistiaReactPlayer from 'react-player/wistia'
import DaysAgo from '../../info/DaysAgo'
import ViewAllCTA from '../../interactives/Buttons/ViewAllCTA'
import TopicTag from '../../TopicTag'
export default function VideoPlayer({
  testId = 'videoPlayer',
  sectionTitle,
  ctaLink,
  videoId,
  topic,
  premium,
  title,
  date,
  autoplay = false,
  variant,
  noTruncate,
  url,
}) {
  const wistiaendpoint =
    process?.env?.WISTIA_ENDPOINT || 'https://ascd.wistia.com/medias/'

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: { xs: '350px', md: '495px' },
      }}
      data-testid={testId}
    >
      {(sectionTitle || ctaLink) && (
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <Typography variant='h4' data-testid={`${testId}-sectionTitle`}>
            {sectionTitle}
          </Typography>

          {ctaLink && <ViewAllCTA label='View all' href={ctaLink} lg />}
        </Box>
      )}

      <Box
        sx={{
          position: 'relative',
          paddingTop: '56.25%' /* Player ratio: 100 / (1280 / 720) */,
          height: { xs: '240px', sm: '425px', md: '460px' },
          width: '100%',
          bgcolor: 'primary.main',
          alignItems: 'center',
        }}
        display='flex'
        justifyContent='center'
      >
        {videoId && (
          <WistiaReactPlayer
            url={`${wistiaendpoint}${videoId}`}
            config={{
              wistia: {
                options: {
                  playerColor: '#005e47',
                },
                playerId: videoId,
              },
            }}
            playing={autoplay}
            controls
            width='100%'
            height='100%'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            data-testid={`${testId}-video`}
          />
        )}

        {url && (
          <ReactPlayer
            url={url}
            controls
            width='100%'
            height='100%'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            data-testid={`${testId}-video`}
          />
        )}
      </Box>
      <Grid
        container
        sx={
          variant === 'green'
            ? {
                height: '124px',
                padding: 2,
                bgcolor: 'primary.main',
                '& *': {
                  color: 'common.white',
                },
                '& .MuiChip-root': {
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                },
              }
            : {
                height: '116px',
                pt: 2,
              }
        }
        data-testid={`${testId}-variant`}
      >
        {topic && (
          <Grid item xs={12}>
            <TopicTag
              variant='special'
              label={topic?.title}
              color={'black'}
              premium={premium}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography
            component='h2'
            variant='h4'
            sx={
              noTruncate
                ? undefined
                : {
                    width: '90%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }
            }
            data-testid={`${testId}-title`}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box display='flex' flexDirection='row'>
            {date && (
              <Box data-testid={`${testId}-date`}>
                <DaysAgo input={date} variant='body3' />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

VideoPlayer.propTypes = {
  testId: string,
  sectionTitle: string,
  ctaLink: string,
  videoId: string,
  topic: object,
  premium: bool,
  title: string,
  date: string,
  autoplay: bool,
  variant: string,
  noTruncate: bool,
  url: string,
}
