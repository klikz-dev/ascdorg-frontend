import { Grid } from '@mui/material'
import IssueTile from '../../../../TileComponents/IssueTile'

export default function IssueCard({ items }) {
  return items.map(
    ({ slug, thumbnail, title, publicationDate, volNo, issueNo }, i) => (
      <Grid item key={i} sx={{ paddingBottom: `30px !important` }}>
        <IssueTile
          slug={slug}
          imageUrl={thumbnail}
          title={title}
          publicationDate={publicationDate}
          volNo={volNo}
          issueNo={issueNo}
        />
      </Grid>
    )
  )
}
