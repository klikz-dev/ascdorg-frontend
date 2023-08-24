import { Grid } from '@mui/material'
import VideoCardTile from '../VideoCard/VideoCardTile'

export default function SearchVideoCard({ items, type }) {
  return items?.map((item) => {
    return (
      <Grid item key={item?.slug}>
        <VideoCardTile
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
