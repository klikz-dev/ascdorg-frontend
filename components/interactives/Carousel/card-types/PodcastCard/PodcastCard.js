import { Grid } from '@mui/material'
import VideoCardTile from '../VideoCard/VideoCardTile'

export default function PodcastCard({ items, type }) {
  return items.map(({ slug, date, thumbnail, title, topic }) => {
    return (
      <Grid item key={slug}>
        <VideoCardTile
          date={date}
          slug={slug}
          thumbnail={thumbnail}
          title={title}
          topic={topic?.[0]}
          type={type}
        />
      </Grid>
    )
  })
}
