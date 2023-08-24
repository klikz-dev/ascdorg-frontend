import { Box, Typography } from '@mui/material'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { string, bool } from 'prop-types'
import { formatAuthor } from '../../../lib/utils'
import TopicTag from '../../TopicTag'

export default function ArticleInfo({
  premium,
  topicTag,
  topicTagColor,
  title,
  authorName,
  datePublished,
  titleVariant,
}) {
  TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo('en-US')

  return (
    <Box
      sx={{
        height: { md: '100%' },
      }}
      display='flex'
      flexDirection='column'
      justifyContent='flex-start'
    >
      {topicTag && (
        <Box display='flex'>
          <TopicTag
            variant='special'
            label={topicTag}
            color={topicTagColor ? topicTagColor : 'white'}
            premium={premium}
          />
        </Box>
      )}
      <Box
        sx={
          topicTagColor
            ? {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2' /* number of lines to show */,
                WebkitBoxOrient: 'vertical',
                height: '5.25rem',
                '&:hover': {
                  color: 'hover.main',
                  textDecoration: 'underline',
                },
              }
            : undefined
        }
      >
        <Typography variant={titleVariant || 'h4'}>{title}</Typography>
      </Box>
      <Box
        sx={{
          mt: { xs: -1, md: 1 },
        }}
      >
        <Typography
          variant='subtitle3'
          sx={
            topicTagColor
              ? {
                  color: 'accent.lightGrey',
                }
              : undefined
          }
        >
          <Box>
            {Date.parse(datePublished) ? (
              timeAgo.format(Date.parse(datePublished))
            ) : (
              <Box data-testid='blank-timeago' />
            )}
          </Box>
          <Box>{formatAuthor(authorName)}</Box>
        </Typography>
      </Box>
    </Box>
  )
}

ArticleInfo.propTypes = {
  titleVariant: string,
  premium: bool,
  topicTag: string,
  topicTagColor: string,
  title: string,
  authorName: string,
  datePublished: string,
}
