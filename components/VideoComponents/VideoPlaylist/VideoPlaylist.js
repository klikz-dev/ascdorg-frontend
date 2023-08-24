import { Box, Divider, Grid } from '@mui/material'
import VideoPlayer from '../VideoPlayer'
import VideoPlaylistItem from '../VideoPlaylistItem'

export default function VideoPlaylist({
  topic,
  videoId,
  premium,
  title,
  date,
  videos,
  type,
}) {
  const playlistItems = videos
    .filter(
      (item) => item?.topic?.title === topic?.title && item.videoId !== videoId
    )
    .slice(0, 4)
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Box mt={3}>
          <VideoPlayer
            videoId={videoId}
            topic={topic}
            premium={premium}
            title={title}
            date={date}
            noTruncate
          />
        </Box>
        <Box
          mt={1}
          display={['block', 'block', 'none']}
          width='100vw'
          style={{ marginLeft: '-16px' }}
        >
          <Divider />
        </Box>
      </Grid>
      {videos && (
        <Grid container item xs={12} md={4}>
          <Box mt={[2, 3]} width='100%'>
            {playlistItems.map(
              ({ slug, thumbnail, topic, premium, title, date }, key) => {
                return (
                  <Grid item key={key}>
                    <VideoPlaylistItem
                      slug={slug}
                      thumbnail={thumbnail}
                      topic={topic}
                      number={key}
                      premium={premium}
                      title={title}
                      date={date}
                      type={type}
                    />
                    {key < playlistItems.length - 1 && <Divider />}
                  </Grid>
                )
              }
            )}
          </Box>
        </Grid>
      )}
    </Grid>
  )
}
