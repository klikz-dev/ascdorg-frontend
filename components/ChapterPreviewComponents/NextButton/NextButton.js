import { useRouter } from 'next/router'
import { Box, IconButton } from '@mui/material'

/** @todo: combine with PreviousButton */
export default function NextButton({
  chapters,
  currentChapterIndex,
  hasAccessToChapter,
  slug,
  topRef,
}) {
  const router = useRouter()
  const nextChapter =
    chapters?.items &&
    chapters.items.find(
      (item, index) => index > currentChapterIndex && hasAccessToChapter(item)
    )

  return (
    <>
      {nextChapter && (
        <IconButton
          aria-label='go to next chapter'
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
                width: '44',
                height: '44',
              },
            },
          }}
          onClick={() =>
            router
              .push(
                {
                  pathname: `/books/${slug}`,
                  query: { chapter: nextChapter.slug },
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
          <Box component='img' src='/images/right.svg' alt={'right icon'} />
        </IconButton>
      )}
    </>
  )
}
