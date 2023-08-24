import { Grid } from '@mui/material'
import VideoCardTile from '../VideoCard/VideoCardTile'

export default function SearchWebinarCard({ items, type }) {
  return items?.map((item, idx) => {
    return (
      <Grid item key={idx}>
        <VideoCardTile
          date={item?.dateTimeStamp}
          slug={item?.url}
          thumbnail={item?.thumbnail}
          title={item?.title}
          topic={item?.topic?.[0]}
          type={type}
          search={true}
        />
      </Grid>
    )
  })
}
