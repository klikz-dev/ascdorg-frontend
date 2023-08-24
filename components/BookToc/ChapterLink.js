import Link from 'next/link'
import { Typography, Box } from '@mui/material'

/**
 * The Chapter Link component will display the name of the chapter and
 * also provide a link if the chapter can be previewed by the user
 *
 * @return {Component}
 */
const ChapterLink = ({ chapter, hasMemberBookAccess, pathname }) => {
  const ChapterText = () => (
    <>
      {chapter?.title && chapter?.label ? chapter.label + '. ' : chapter?.label}
      {chapter?.title}
    </>
  )

  return (
    <Box pt={1}>
      <Typography variant='body1'>
        {(hasMemberBookAccess && chapter?.slug) ||
        (chapter?.freeChapter && chapter?.slug) ? (
          <Link
            href={{
              pathname: pathname,
              query: { chapter: chapter.slug },
            }}
            scroll={false}
            shallow={true}
          >
            <a>
              <Typography variant='large-link' color='#005E47'>
                <ChapterText />
              </Typography>
            </a>
          </Link>
        ) : (
          <ChapterText />
        )}
      </Typography>
    </Box>
  )
}

export default ChapterLink
