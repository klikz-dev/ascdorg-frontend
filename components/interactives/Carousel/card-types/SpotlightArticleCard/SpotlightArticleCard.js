import { Grid } from '@mui/material'
import { contentfulImageTransformation } from '../../../../../lib/data-transformations'
import SpotlightArticleTile from './SpotlightArticleTile'

export default function SpotlightArticleCard({ content = [] }) {
  return content?.map(
    ({ slug, image, title, topic, authors, issueDate }, idx) => (
      <Grid item key={idx}>
        <SpotlightArticleTile
          slug={slug}
          imageUrl={contentfulImageTransformation(image)}
          title={title}
          topic={topic?.title}
          authorName={`${authors?.[0]?.firstName} ${authors?.[0]?.lastName}`}
          issueDate={issueDate}
        />
      </Grid>
    )
  )
}
