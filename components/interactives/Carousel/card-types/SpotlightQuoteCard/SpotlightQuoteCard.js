import { Grid } from '@mui/material'
import { contentfulImageTransformation } from '../../../../../lib/data-transformations'
import SpotlightQuoteTile from './SpotlightQuoteTile'

export default function SpotlightQuoteCard({ content = [] }) {
  return content?.map(
    ({ title, description, thumbnail, name, expertise }, idx) => (
      <Grid item key={idx}>
        <SpotlightQuoteTile
          title={title}
          description={description}
          authorThumbnail={contentfulImageTransformation(thumbnail)}
          authorName={name}
          expertise={expertise}
        />
      </Grid>
    )
  )
}
