import { Grid } from '@mui/material'
import VideoCardTile from '../VideoCard/VideoCardTile'

export default function WebinarCard({ items, type }) {
  return items?.map((item, idx) => {
    return (
      <Grid item key={idx}>
        <VideoCardTile
          date={item?.date}
          slug={item?.slug}
          thumbnail={item?.thumbnail}
          title={item?.title}
          topic={item?.topic?.[0]}
          type={type}
        />
      </Grid>
    )
  })
}
