import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { string } from 'prop-types'
import paths from '../../../../../paths/path'
import TopicTag from '../../../../TopicTag'

export default function BlogTile({
  testId = 'BlogTile',
  slug,
  imageUrl,
  title,
  topic,
  authorName,
  issueDate,
}) {
  TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo('en-US')

  function slugConfig(slug) {
    if (slug?.startsWith('/blogs')) {
      return slug
    }
    return paths.blog({ slug: slug })
  }

  return (
    <Card square elevation={0} data-testid={testId}>
      <CardActionArea
        href={slugConfig(slug)}
        disableRipple
        sx={{
          position: 'relative',
          width: '250px',
          height: '360px',
          padding: '6px',
          transition: 'all .2s ease-in-out',
          '&:hover': {
            boxShadow:
              '0px 8px 10px rgba(0, 0, 0, 0.03), 0px 3px 14px rgba(0, 0, 0, 0.04), 0px 5px 5px rgba(0, 0, 0, 0.08)!important',
            textDecoration: 'none',
          },
        }}
      >
        <CardMedia
          image={imageUrl}
          sx={{
            width: '238px',
            height: '127px',
            backgroundSize: '238px 127px',
            borderRadius: 4,
          }}
        />
        <CardContent sx={{ padding: '16px 0px' }}>
          {topic && (
            <TopicTag variant='special' label={topic} color={'black'} />
          )}
          <Typography variant='h6' sx={{ height: '72px', width: '238px' }}>
            {title}
          </Typography>
        </CardContent>
        <Typography
          sx={{
            fontSize: '12px',
          }}
          data-testid={`${testId}-authorName`}
        >
          {authorName ? authorName : ''}
        </Typography>
        <Typography
          sx={{
            fontSize: '12px',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {Date.parse(issueDate) ? timeAgo.format(Date.parse(issueDate)) : ''}
        </Typography>
      </CardActionArea>
    </Card>
  )
}

BlogTile.propTypes = {
  testId: string,
  slug: string,
  imageUrl: string,
  title: string,
  topic: string,
  authorName: string,
  issueDate: string,
}
