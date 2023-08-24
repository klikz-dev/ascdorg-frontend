import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Grid, IconButton, Modal, Button, Typography } from '@mui/material'
import ReactToPrint from 'react-to-print'
import { constSnipcart } from '../../../const'
import { chapterPreviewOptions } from '../../../const/options'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import useChapterDetail from '../../../lib/hooks/useChapterDetail'
import useUserAccount from '../../../lib/hooks/useUserAccount'
import CartTile from '../../TileComponents/CartTile'
import MiniCartTile from '../../TileComponents/MiniCartTile'
import TopicTag from '../../TopicTag'
import ContentToPrint from '../ContentToPrint'
import NextButton from '../NextButton'
import PreviousButton from '../PreviousButton'

/**
 * The Chapter Preview displays book chapters based on access levels the user has.
 * Some chapters are free for everyone. The modal is displayed based on the url query parameter
 * and if the user has access to that chapter. The route is added to the browser history, so the user can use
 * the back and forward buttons on the browser and also bookmark the displayed chapter.
 *
 * @return {Component}
 * @todo: REFACTOR
 */
export default function ChapterPreview({
  digitalFileGuid,
  hasMemberBookAccess,
  bookTitle,
  slug,
  productNumber,
  thumbnail,
  description,
  price,
  chapters,
  authors,
  custom1Value,
  custom2Value,
  custom3Value,
  custom4Value,
  releaseDate,
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [currentChapter, setCurrentChapter] = useState()
  const [currentChapterIndex, setCurrentChapterIndex] = useState()
  const { userAccountUser } = useUserAccount()

  const hasAccessToChapter = (chapter) =>
    (hasMemberBookAccess && chapter) || chapter?.freeChapter ? true : false

  const setChapterPreview = (chapter) => {
    if (hasAccessToChapter(chapter)) {
      setCurrentChapter(chapter)
      setCurrentChapterIndex(
        chapters.items.findIndex((item) => item?.sys.id === chapter?.sys.id)
      )
      setOpen(true)
    } else {
      setOpen(false)
      setCurrentChapter(undefined)
      setCurrentChapterIndex()
    }
  }

  const printRef = useRef()

  useEffect(() => {
    if (router.query.chapter) {
      const chapter = chapters.items.find(
        (chapter) => chapter?.slug === router.query.chapter
      )
      setChapterPreview(chapter)
    } else {
      setChapterPreview()
    }
  }, [router.query])

  const imgUrl = contentfulImageTransformation(thumbnail)
  const topRef = useRef(null)

  const { loading, chapterDetails } = useChapterDetail(currentChapter?.slug)

  return (
    <Modal
      open={!!open}
      onClose={() => setOpen(false)}
      aria-labelledby={`chapter-modal-${currentChapter?.title}`}
      aria-describedby={`chapter-modal-description-${currentChapter?.title}`}
      disableAutoFocus
    >
      <Box
        sx={{
          color: 'common.white',
          bgcolor: 'grey.dark',
          height: { xs: '100vh', md: '75vh' },
          width: { xs: '100vw', md: '800px' },
          position: 'absolute',
          padding: (theme) => theme.spacing(2, 0, 0, 0),
          borderRadius: { md: '16px' },
          top: { md: '15%' },
          left: { md: '50%' },
          transform: { md: 'translate(-50%, -10%)' },
          boxShadow: { md: 5 },
        }}
      >
        <Box display='flex' alignItems='flex-end' mb={2} pl={2} pr={2}>
          <IconButton
            aria-label='Close modal button'
            sx={{
              mr: 2,
              color: 'common.white',
            }}
            size='large'
            onClick={() => setOpen(null)}
          >
            <CloseIcon size='small' />
          </IconButton>
          <Typography variant='h5'>Chapter Preview</Typography>
        </Box>
        <Grid
          container
          sx={{
            overflow: 'hidden',
            height: '95%',
            borderRadius: '0 0 16px 16px',
            backgroundColor: 'white',
            padding: { md: 3 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              position: 'absolute',
              width: { xs: '94%', sm: '100%', md: '109%' },
              top: '44%',
              left: {
                xs: '1%',
                sm: '1.5%',
                md: '-3.4%',
                lg: '-2.5%',
                xl: '-1.5%',
              },
              zIndex: '1',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Grid
              item
              xs={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <PreviousButton
                chapters={chapters}
                currentChapterIndex={currentChapterIndex}
                hasAccessToChapter={hasAccessToChapter}
                slug={slug}
                topRef={topRef}
              />
            </Grid>
            <Grid
              item
              xs={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <NextButton
                chapters={chapters}
                currentChapterIndex={currentChapterIndex}
                hasAccessToChapter={hasAccessToChapter}
                slug={slug}
                topRef={topRef}
              />
            </Grid>
          </Box>
          <Box
            sx={{
              height: { xs: '100vh', md: '68vh' },
              width: '100vw',
              overflowX: { md: 'scroll' },
              pb: '32px',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
            display='flex'
            flexDirection={['column', 'row']}
          >
            <Box
              sx={{
                overflowX: 'auto',
                msOverflowStyle: 'none',
              }}
              id={`chapter-modal-description-${currentChapter?.slug}`}
              color='black'
              pl={[6.5, 8, 3]}
              pt={3}
              pr={[6, 3, 7]}
              display='flex'
              flexDirection='column'
              minWidth={['80vw', '30vw', '35vw', '27vw']}
              height={['83vh', 'auto']}
              ref={topRef}
            >
              {userAccountUser?.name ? (
                <Box
                  width='100%'
                  display='flex'
                  justifyContent='flex-end'
                  /** provides blank space if there are no topic tags */
                  mb={currentChapter?.label ? 0 : '32px'}
                >
                  <ReactToPrint
                    copyStyles='true'
                    trigger={() => (
                      <Button color='primary' variant='outlined'>
                        Print Chapter
                      </Button>
                    )}
                    content={() => printRef.current}
                  />
                  <div style={{ display: 'none' }}>
                    <ContentToPrint
                      currentChapter={currentChapter}
                      userAccountUser={userAccountUser}
                      chapterDetails={chapterDetails}
                      loading={loading}
                      ref={printRef}
                    />
                  </div>
                </Box>
              ) : (
                <Box
                  width='100%'
                  display='flex'
                  justifyContent='flex-end'
                  /** provides blank space if there are no topic tags */
                  mb={currentChapter?.label ? 0 : '32px'}
                >
                  <Typography variant='h7'>
                    Log in for a printable version
                  </Typography>
                </Box>
              )}

              {currentChapter?.label && (
                <TopicTag
                  variant='special'
                  label={currentChapter?.label}
                  color='black'
                />
              )}

              <Typography color='black' variant='h3'>
                {currentChapter?.title}
              </Typography>
              {!loading
                ? documentToReactComponents(
                    chapterDetails[0]?.body?.json,
                    chapterPreviewOptions(chapterDetails[0]?.body?.links)
                  )
                : ''}
            </Box>
            <Box
              pt={3}
              pr={3}
              position='sticky'
              maxHeight='488px'
              top='0'
              display={['none', 'initial']}
            >
              <CartTile
                snipcart={{
                  label: custom4Value
                    ? constSnipcart.BTN_LABEL_PREORDER
                    : constSnipcart.BTN_LABEL_ADD,
                  dataItemId: productNumber,
                  dataItemName: bookTitle,
                  dataItemUrl: slug,
                  dataItemImage: imgUrl,
                  dataItemDescription: description,
                  dataItemPrice: price,
                  dataItemCustom1Value: custom1Value,
                  dataItemCustom2Value: custom2Value,
                  dataItemCustom3Value: custom3Value,
                  dataItemCustom4Value: custom4Value,
                  dataItemAuthors: authors,
                  digitalFileGuid: digitalFileGuid,
                  productReleaseDate: releaseDate,
                }}
                noHover
              />
            </Box>
            <Box display={['initial', 'none']} position='fixed' bottom='0'>
              <MiniCartTile
                snipcart={{
                  label: custom4Value
                    ? constSnipcart.BTN_LABEL_PREORDER
                    : constSnipcart.BTN_LABEL_ADD,
                  dataItemId: productNumber,
                  dataItemName: bookTitle,
                  dataItemUrl: slug,
                  dataItemImage: imgUrl,
                  dataItemDescription: description,
                  dataItemPrice: price,
                  dataItemCustom1Value: custom1Value,
                  dataItemCustom2Value: custom2Value,
                  dataItemCustom3Value: custom3Value,
                  dataItemCustom4Value: custom4Value,
                  dataItemAuthors: authors,
                  digitalFileGuid: digitalFileGuid,
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Box>
    </Modal>
  )
}
