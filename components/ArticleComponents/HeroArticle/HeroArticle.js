import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Grid, Box, Avatar, AvatarGroup, Typography } from '@mui/material'
import dateFormat from 'dateformat'
import { string, arrayOf, shape, number, func } from 'prop-types'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import paths from '../../../paths/path'
import ShareButtons from '../../interactives/Buttons/ShareButtons'
import TopicTag from '../../TopicTag'

export default function HeroArticle({
  testId,
  volumeNo,
  issueNo,
  date,
  authors,
  tagLabel,
  tagLink,
  title,
  slug,
  contentType,
  minuteRead,
}) {
  const [min, setMin] = useState(0)

  useEffect(() => {
    if (document) {
      const time = minuteRead()
      setMin(time)
    }
  }, [minuteRead])

  const dateField = date || Date.now()

  const articleDate = dateFormat(dateField, 'UTC:mmmm d, yyyy')

  const authorThumbnails = authors?.items?.filter(
    (author) => !!author?.thumbnail
  )

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      sx={{
        backgroundColor: 'grey.extraLight',
        borderBottomLeftRadius: { xs: 64, md: 156 },
        padding: '50px 10px',
        width: '100%',
        height: { md: '384px' },
        paddingTop: { md: '80px' },
        paddingBottom: { md: '80px' },
        margin: { md: 0 },
      }}
      data-testid={testId}
    >
      <Box
        sx={{
          width: '100%',
          margin: 'auto',
          maxWidth: { md: '674px' },
        }}
      >
        <Box mb={2} display='flex'>
          <Typography variant='body3'>{articleDate}</Typography>
          <Box mx={1}>•</Box>
          <Typography variant='body3'>{min > 0 ? `${min} min` : ''}</Typography>
          {volumeNo && (
            <>
              <Box mx={1}>•</Box>
              <Typography variant='body3'>Vol. {volumeNo}</Typography>
              <Box mx={1}>•</Box>
              <Typography variant='body3'>No. {issueNo}</Typography>
            </>
          )}
        </Box>
        <Box mb={2} mt={2}>
          {tagLabel && (
            <TopicTag
              label={tagLabel}
              variant='special'
              textTransform='capitalize'
              href={tagLink}
            />
          )}
        </Box>
        <Box mb={5}>
          <Typography variant='h1' data-testid={`${testId}-title`}>
            {title}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7} container alignItems='center'>
            {authors && (
              <>
                <AvatarGroup max={2}>
                  {authorThumbnails?.map((author, key) => (
                    <Avatar
                      key={`author-avatar-${key}`}
                      src={contentfulImageTransformation(
                        author.thumbnail,
                        true
                      )}
                      alt='author avatar'
                    />
                  ))}
                </AvatarGroup>
                {authors?.items?.map((author, key) => (
                  <Box
                    key={`author-link-${key}`}
                    ml={authorThumbnails && authorThumbnails.length > 0 ? 1 : 0}
                    mr={authorThumbnails && authorThumbnails.length > 0 ? 0 : 1}
                  >
                    {author && (
                      <Link href={paths.author({ slug: author.slug })}>
                        <a>
                          <Typography variant='medium-link' color='#005E47'>
                            {author.title}
                          </Typography>
                        </a>
                      </Link>
                    )}

                    {authors.length - 1 > key && ','}
                  </Box>
                ))}
              </>
            )}
          </Grid>
          <Grid item xs={12} md={5} container justifyContent='flex-end'>
            <ShareButtons
              url={
                contentType === 'blog'
                  ? paths.blog({ slug: slug })
                  : paths.article({ slug: slug })
              }
              title={title}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

HeroArticle.propTypes = {
  testId: string,
  issueDate: string,
  date: string,
  authors: arrayOf(
    shape({
      thumbnail: shape({
        imageBynder: string,
        imageContentful: string,
      }),
      slug: string,
      title: string,
    })
  ),
  title: string,
  contentType: string,
  slug: string,
  tagLabel: string,
  tagLink: string,
  issueNo: number,
  volumeNo: number,
  minuteRead: func,
}
