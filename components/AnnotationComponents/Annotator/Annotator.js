import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import useCreateAnnotation from '../../../lib/hooks/useCreateAnnotation'
import { useDeleteAnnotation } from '../../../lib/hooks/useDeleteAnnotation'
import { useGetAnnotationsByContentId } from '../../../lib/hooks/useGetAnnotation'
import useUpdateAnnotation from '../../../lib/hooks/useUpdateAnnotation'
import Highlight from '../Highlights'
import NoAnnotations from '../NoAnnotations'
import Note from '../Note/Note'

export default function Annotator({
  userId,
  contentId,
  contentTitle,
  contentImgSrc,
  contentSlug,
  domId,
  reload,
  refresherKey,
}) {
  const [sidebar, setSidebar] = useState(false)

  const { data: annotations } = useGetAnnotationsByContentId(userId, contentId)
  const [createAnnotation] = useCreateAnnotation()
  const [updateAnnotation] = useUpdateAnnotation()
  const [deleteAnnotation] = useDeleteAnnotation()

  const notes = annotations?.filter((annotation) => annotation?.note)

  const [selection, setSelection] = useState({
    range: null,
    highlightedText: '',
  })

  const [newAnnotation, setNewAnnotation] = useState(null)
  const [selectedAnnotationId, setSelectedAnnotationId] = useState(null)

  const [holdOff, setHoldOff] = useState(false)

  const createAnnotationAction = (highlight, note) => {
    let newAnnotationId = null
    createAnnotation({
      variables: {
        userId,
        contentId,
        contentTitle,
        contentImageSrc: contentImgSrc || null,
        contentSlug,
        ...highlight,
        note,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      context: { clientName: 'realm' },
    }).then(({ data }) => {
      newAnnotationId = data.insertOneAnnotation._id
    })

    setHoldOff(true)
    reload()
    setNewAnnotation(null)

    return newAnnotationId
  }

  const updateNoteAction = (id, note) => {
    updateAnnotation({
      variables: {
        id,
        updatedAt: new Date(),
        note,
      },
      context: { clientName: 'realm' },
    })

    setHoldOff(true)
    reload()
    setNewAnnotation(null)
  }

  const deleteAnnotationAction = (id, isHighlights) => {
    if (!id) {
      const element = document.querySelector(`mark[temporary]`)
      if (element) {
        const text = element.innerHTML.split('</span>')[1]
        element.insertAdjacentHTML('beforebegin', text)
        element.remove()
        return
      }
    }

    deleteAnnotation({
      variables: {
        id,
        updatedAt: new Date(),
      },
      context: { clientName: 'realm' },
    })

    const element = document.querySelector(`mark[annotation-id="${id}"]`)
    if (element) {
      let text = ''
      if (isHighlights) {
        text = element.innerHTML
      } else {
        text = element.innerHTML.split('</span>')[1]
      }
      element.insertAdjacentHTML('beforebegin', text)
      element.remove()
      return
    }

    setHoldOff(true)
    reload()
  }

  const viewArticleAnnotation = (id) => {
    const markedLine = document.getElementById(`annotation-line-${id}`)
    if (markedLine) {
      markedLine.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const cancelAnnotateAction = () => {
    setNewAnnotation(null)
    setSelection({
      range: null,
      highlightedText: '',
    })
  }

  return (
    <>
      {sidebar ? (
        <Box
          id='annotations-sidebar'
          sx={{
            width: { xs: '100%', md: '341px' },
            height: {
              xs: 'calc(100vh - 310px)',
              sm: 'calc(100vh - 400px)',
              md: 'calc(100vh - 72px)',
            },
            position: 'fixed',
            right: 0,
            bottom: 0,
            top: { md: '72px' },
            border: '1px solid #D8D8D8',
            bgcolor: 'common.white',
            overflowY: 'scroll',
            pb: 2,
            zIndex: '2',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            borderRadius: { md: 0 },
            boxShadow: { xs: '0 0 0 99999px rgba(0, 0, 0, .5)', md: 'none' },
          }}
        >
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            py={1}
            px={2}
            sx={{
              bgcolor: 'grey.extraLight',
            }}
          >
            <Box display='flex' alignItems='center'>
              <IconButton
                aria-label='Close annotations'
                onClick={() => setSidebar(false)}
                size='large'
              >
                <CloseIcon fontSize='small' />
              </IconButton>

              <Typography
                sx={{
                  lineHeight: '24px',
                  letterSpacing: '0.15px',
                  fontWeight: '700',
                }}
              >
                Notes
              </Typography>
            </Box>

            {notes && notes.length > 0 && (
              <Box>
                <Typography
                  sx={{
                    fontSize: '13px',
                    lineHeight: '18px',
                    letterSpacing: '0.2px',
                    fontWeight: '600',
                  }}
                >
                  {notes.length} {notes.length > 1 ? 'Notes' : 'Note'}
                </Typography>
              </Box>
            )}
          </Box>
          <Divider />

          {newAnnotation && newAnnotation.highlightedText && (
            <Box m={2}>
              <Note
                annotation={newAnnotation}
                saveAction={async (note) => {
                  const newId = newAnnotation?.id
                    ? updateNoteAction(newAnnotation?.id, note)
                    : await createAnnotationAction(newAnnotation, note)
                  const element = document.querySelector('mark[temporary]')
                  element.setAttribute('annotation-id', newId)
                  element.removeAttribute('temporary')
                }}
                cancelAction={() => cancelAnnotateAction()}
              />
            </Box>
          )}

          {notes &&
            notes.length > 0 &&
            notes.map((annotation, index) => {
              return (
                <Box
                  key={index}
                  m={2}
                  id={`annotation-sidelist-${annotation.id}`}
                >
                  <Note
                    annotation={annotation}
                    number={index + 1}
                    active={annotation.id === selectedAnnotationId}
                    updateAction={(id, note) => updateNoteAction(id, note)}
                    deleteAction={(id) => deleteAnnotationAction(id, false)}
                    viewAction={(id) => viewArticleAnnotation(id)}
                    cancelAction={() => setSelectedAnnotationId(null)}
                  />
                </Box>
              )
            })}

          {!notes ||
            (notes && notes.length == 0 && !newAnnotation && (
              <NoAnnotations message='Use the tool bar or start by highlighting some text.' />
            ))}
        </Box>
      ) : (
        <Box
          display='flex'
          justifyContent='center'
          sx={{
            minWidth: '130px',
            height: '65px',
            backgroundColor: 'primary.main',
            borderRadius: '100px',
            position: 'fixed',
            right: '32px',
            bottom: '32px',
          }}
        >
          <Button
            id='annotation-button'
            variant='contained'
            color='primary'
            size='large'
            sx={{
              margin: '8px',
              width: '130px',
              height: '48px',
              borderRadius: '100px',
              boxShadow: 'none',
              backgroundColor: sidebar ? '#BAD7FB' : undefined,
              color: sidebar ? 'primary.main' : undefined,
            }}
            startIcon={<FormatQuoteIcon />}
            onClick={() => setSidebar(true)}
          >
            {'Notes '}
            <Badge
              color='primary'
              badgeContent={notes?.length}
              sx={{
                ml: 2,
                '& span': {
                  width: '24px',
                  height: '24px',
                  bgcolor: '#134C3B',
                },
              }}
            />
          </Button>
        </Box>
      )}

      {annotations && (
        <Highlight
          domId={domId}
          annotations={annotations}
          setNewAnnotation={setNewAnnotation}
          setSidebar={setSidebar}
          selection={selection}
          setSelection={setSelection}
          selectedAnnotationId={selectedAnnotationId}
          setSelectedAnnotationId={setSelectedAnnotationId}
          createAnnotationAction={createAnnotationAction}
          deleteAnnotationAction={deleteAnnotationAction}
          reload={reload}
          holdOff={holdOff}
          setHoldOff={setHoldOff}
          refresherKey={refresherKey}
        />
      )}
    </>
  )
}
