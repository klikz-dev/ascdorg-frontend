import { Grid } from '@mui/material'
import GridItemTile from './GridItemTile'

export default function GridItemCard({ items = [] }) {
  return items.map(({ body, title, thumbnail, slug }, i) => (
    <Grid item key={i}>
      <GridItemTile
        body={body}
        title={title}
        thumbnail={thumbnail}
        slug={slug}
      />
    </Grid>
  ))
}
