import { Grid } from '@mui/material'
import { contentfulImageTransformation } from '../../../../../lib/data-transformations'
import SpotlightBlogTile from './SpotlightBlogTile'

export default function SpotlightBlogCard({ content = [] }) {
  return content?.map(
    ({ slug, thumbnail, title, topic, authors, date }, idx) => (
      <Grid item key={idx}>
        <SpotlightBlogTile
          slug={slug}
          imageUrl={contentfulImageTransformation(thumbnail)}
          title={title}
          topic={topic?.title}
          authorName={`${authors?.[0]?.firstName} ${authors?.[0]?.lastName}`}
          issueDate={date}
        />
      </Grid>
    )
  )
}
