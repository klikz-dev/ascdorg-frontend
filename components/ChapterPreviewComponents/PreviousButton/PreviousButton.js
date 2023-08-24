import { useRouter } from 'next/router'
import { Box, IconButton } from '@mui/material'

/** @todo: combine with NextButton */
export default function PreviousButton({
  chapters,
  currentChapterIndex,
  hasAccessToChapter,
  slug,
  topRef,
}) {
  const router = useRouter()
  const prevChapter =
    chapters?.items &&
    chapters.items
      .filter(
        (item, index) => index < currentChapterIndex && hasAccessToChapter(item)
      )
      .pop()

  return (
    <>
      {prevChapter && (
        <IconButton
          aria-label='go to previous chapter'
          sx={{
            width: '44px',
            height: '44px',
            border: '1px solid #C5CED1',
            boxShadow: 4,
            bgcolor: 'common.white',
            '&:hover': {
              bgcolor: 'common.white',
            },
            img: {
              '& svg': {
                width: '44px',
                height: '44px',
              },
            },
          }}
          onClick={() =>
            router
              .push(
                {
                  pathname: `/books/${slug}`,
                  query: { chapter: prevChapter.slug },
                },
                null,
                {
                  scroll: false,
                  shallow: true,
                }
              )
              .then(() => topRef.current.scrollTo(0, 0))
          }
          size='large'
        >
          <Box component='img' src='/images/left.svg' alt={'left icon'} />
        </IconButton>
      )}
    </>
  )
}
