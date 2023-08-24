import { Grid } from '@mui/material'
import VideoCardTile from '../VideoCard/VideoCardTile'

export default function EventCard({ items, type }) {
  return items?.map(
    ({
      slug,
      dateTime,
      endingTime,
      thumbnail,
      title,
      topic,
      eventUrlDestination,
    }) => {
      return (
        <Grid key={slug}>
          <VideoCardTile
            date={dateTime}
            endingTime={endingTime}
            slug={slug}
            thumbnail={thumbnail}
            title={title}
            topic={topic?.[0]}
            type={type}
            eventUrlDestination={eventUrlDestination}
          />
        </Grid>
      )
    }
  )
}
