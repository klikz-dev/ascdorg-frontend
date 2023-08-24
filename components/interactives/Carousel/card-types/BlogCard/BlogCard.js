import { Grid } from '@mui/material'
import BlogTile from './BlogTile'

export default function BlogCard({ items = [] }) {
  return items.map(
    ({
      objectID,
      slug,
      url,
      thumbnail,
      title,
      topic,
      author,
      dateTimeStamp,
    }) => (
      <Grid item key={objectID}>
        <BlogTile
          slug={slug || url}
          imageUrl={thumbnail}
          title={title}
          topic={topic?.[0]}
          authorName={author?.[0]}
          issueDate={dateTimeStamp}
        />
      </Grid>
    )
  )
}
