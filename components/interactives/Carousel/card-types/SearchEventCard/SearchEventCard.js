import { Grid } from '@mui/material'
import VideoCardTile from '../VideoCard/VideoCardTile'

export default function SearchEventCard({ items, type }) {
  return items?.map((item) => {
    return (
      <Grid key={item?.slug}>
        <VideoCardTile
          date={item?.dateTimeStamp}
          slug={item?.url}
          thumbnail={item?.thumbnail}
          title={item?.title}
          topic={item?.topic?.[0]}
          type={type}
          search={true}
          eventUrlDestination={item?.eventUrlDestination}
        />
      </Grid>
    )
  })
}
