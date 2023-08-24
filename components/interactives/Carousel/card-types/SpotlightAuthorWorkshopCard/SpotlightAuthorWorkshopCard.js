import { Grid } from '@mui/material'
import { contentfulImageTransformation } from '../../../../../lib/data-transformations'
import SpotlightAuthorTile from './SpotlightAuthorWorkshopTile'

export default function SpotlightAuthorWorkshopCard({ content = [] }) {
  return content?.map(
    (
      {
        slug,
        spotlightImage,
        clockHours,
        type,
        authors,
        title,
        variations,
        details,
      },
      idx
    ) => (
      <Grid item key={idx}>
        <SpotlightAuthorTile
          slug={slug}
          imageUrl={contentfulImageTransformation(spotlightImage)}
          clockHours={clockHours}
          topicType={type?.title}
          authorName={authors}
          title={title}
          memberPrice={variations?.[0]?.memberPrice}
          nonMemberPrice={variations?.[0]?.nonMemberPrice}
          details={details}
        />
      </Grid>
    )
  )
}
