import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Typography,
} from '@mui/material'
import { useDeleteAnnotationsByContentId } from '../../../lib/hooks/useDeleteAnnotation'
import { useGetAnnotationsByUserId } from '../../../lib/hooks/useGetAnnotation'
import DashboardNote from '../DashboardNote'
import NoAnnotations from '../NoAnnotations'

export default function DashboardAnnotations({ userId, open, toggleOpen }) {
  const { data: annotationsData } = useGetAnnotationsByUserId(userId)

  const annotations = annotationsData?.reduce((group, annotation) => {
    const { contentId } = annotation
    group[contentId] = group[contentId] ?? []
    group[contentId].push(annotation)
    return group
  }, {})

  const [deleteAnnotationsByContentId] = useDeleteAnnotationsByContentId()

  const deleteAnnotationsAction = (contentId, userId) => {
    deleteAnnotationsByContentId({
      variables: {
        contentId,
        userId,
        updatedAt: new Date(),
      },
      context: { clientName: 'realm' },
    })
  }

  return (
    <Drawer anchor='right' open={open} onClose={() => toggleOpen(false)}>
      <Box
        sx={{
          width: '375px',
        }}
        role='presentation'
        onClick={() => toggleOpen(false)}
        onKeyDown={() => toggleOpen(false)}
      >
        <Box display='flex' alignItems='center' p={2}>
          <IconButton
            aria-label='Close notes and annotations dashboard button'
            sx={{
              mr: '5px',
            }}
            size='large'
            onClick={() => toggleOpen(false)}
          >
            <CloseIcon size='small' />
          </IconButton>
          <Typography variant='h5'>Notes & Highlights</Typography>
        </Box>

        <Divider />

        <List>
          {annotations && Object.values(annotations).length > 0 ? (
            Object.values(annotations).map((group, index) => {
              return (
                <DashboardNote
                  key={index}
                  annotation={group[0]}
                  totalCount={group.length}
                  notesCount={group.filter((g) => g.note).length}
                  deleteAction={(contentId, userId) =>
                    deleteAnnotationsAction(contentId, userId)
                  }
                />
              )
            })
          ) : (
            <NoAnnotations message='Go to an article and start by highlighting some text.' />
          )}
        </List>
      </Box>
    </Drawer>
  )
}
