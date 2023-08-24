import { Grid } from '@mui/material'
import ArticleTile from './ArticleTile'

export default function ArticleCard({ items }) {
  return items.map((item, idx) => (
    <Grid item key={idx}>
      <ArticleTile
        slug={item?.url}
        imageUrl={item?.thumbnail}
        title={item?.title}
        topic={item?.topic?.[0]}
        authorName={item?.author?.[0]}
        issueDate={item?.dateTimeStamp}
      />
    </Grid>
  ))
}
