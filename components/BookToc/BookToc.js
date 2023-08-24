import { useState } from 'react'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Button, Typography } from '@mui/material'
import ChapterLink from './ChapterLink'

/**
 * The Book Table of Contents component displays all the chapters of a book. It will provide
 * links to chapters that are available for preview by the user
 *
 * @return {Component}
 */
export default function BookToc({
  title,
  hasMemberBookAccess,
  slug,
  chapters,
}) {
  const [limit, setLimit] = useState(6)

  const readMoreChapters = () => {
    if (limit < chapters.items.length) {
      const newLimit = chapters.items.length
      setLimit(newLimit)
    } else if (limit >= chapters.items.length) {
      const newLimit = 6
      setLimit(newLimit)
    }
  }

  return (
    <Box>
      <Typography variant='h3'>{title}</Typography>
      <Box my={2}>
        {chapters.items.slice(0, limit).map((chapter, key) => (
          <ChapterLink
            key={`chapter-${key}`}
            chapter={chapter}
            pathname={`/books/${slug}`}
            hasMemberBookAccess={hasMemberBookAccess}
          />
        ))}
        {limit < chapters.items.length && (
          <Box my={2}>
            <Button
              style={{ padding: '0' }}
              onClick={() => readMoreChapters()}
              endIcon={<ExpandMoreIcon style={{ color: '#005E47' }} />}
            >
              Read more
            </Button>
          </Box>
        )}
        {limit >= chapters.items.length && chapters.items.length > 6 && (
          <Box my={2}>
            <Button
              style={{ padding: '0' }}
              onClick={() => readMoreChapters()}
              endIcon={<ExpandLessIcon style={{ color: '#005E47' }} />}
            >
              Read less
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}
