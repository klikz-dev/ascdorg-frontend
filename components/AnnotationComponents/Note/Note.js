import { useState, useEffect, useRef } from 'react'
import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import dateFormat from 'dateformat'

export default function Note({
  annotation,
  number,
  saveAction,
  updateAction,
  cancelAction,
  deleteAction,
  viewAction,
  isUpdate,
}) {
  const { _id: id, highlightedText, note: currentNote, updatedAt } = annotation

  const [note, setNote] = useState(currentNote)
  const [editing, setEditing] = useState(false)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)

  const inputRef = useRef()

  useEffect(() => {
    if (!id) {
      const timeout = setTimeout(() => {
        inputRef.current.focus()
      }, 100)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [id])

  const cancelClicked = () => {
    setEditing(false)
    cancelAction()
  }

  const saveClicked = () => {
    setEditing(false)
    if (editing) {
      updateAction(id, note)
    } else {
      saveAction(note)
    }
  }

  const deleteClicked = () => {
    handleClose()
    setEditing(false)
    deleteAction(id)
  }

  const confirmDelete = () => {
    setOpenDeleteConfirmation(true)
  }

  const handleClose = () => {
    setOpenDeleteConfirmation(false)
  }

  return (
    <>
      <Paper
        square
        sx={{
          padding: '2px',
          '&.active': {
            border: '1px',
            borderColor: 'primary.main',
          },
        }}
      >
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box display='flex'>
            <Box
              sx={{
                width: 22,
                height: 22,
                borderRadius: 10,
                backgroundColor: 'primary.main',
                color: 'common.white',
                fontWeight: 700,
                textAlign: 'center',
              }}
              mr={2}
            >
              <Typography variant='button'>{number}</Typography>
            </Box>
            <Box>
              <Typography variant='body2'>
                {dateFormat(updatedAt, 'mmmm d, yyyy')}
              </Typography>
            </Box>
          </Box>
          {id && (
            <Box display='flex' justifyContent='flex-end' my={1}>
              <Button
                size='small'
                style={{ marginRight: 1, minWidth: 50 }}
                onClick={(e) => confirmDelete(e)}
              >
                Delete
              </Button>
              <Button
                size='small'
                onClick={() => setEditing(true)}
                style={{ minWidth: 50 }}
              >
                Edit
              </Button>
            </Box>
          )}
        </Box>
        <Box my={2}>
          <Button
            style={{ textTransform: 'none' }}
            onClick={() => viewAction(id)}
          >
            <Typography
              sx={{
                backgroundColor: 'background.main',
                padding: '10px',
                fontSize: '15px',
                lineHeight: '17px',
                letterSpacing: '0.2px',
                fontWeight: 600,
              }}
            >
              {highlightedText}
            </Typography>
          </Button>
        </Box>
        <Divider />
        <Box p={1}>
          <TextField
            id={`note-${id ? id : 'temp'}`}
            placeholder='Write a note'
            disabled={!editing && id && !isUpdate}
            multiline
            maxRows={4}
            InputProps={{
              disableUnderline: true,
              root: {
                fontSize: (theme) => theme.typography.pxToRem(14),
                fontWeight: 400,
                lineHeight: (theme) => theme.typography.pxToRem(24),
                letterSpacing: 0.2,
              },
            }}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            fullWidth
            inputRef={inputRef}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
        </Box>
        {(!id || editing || isUpdate) && (
          <>
            <Divider />
            <Box display='flex' justifyContent='flex-end' my={1}>
              <Button
                variant='outlined'
                color='primary'
                style={{ marginRight: 15 }}
                onClick={() => cancelClicked()}
              >
                Cancel
              </Button>

              <Button
                variant='contained'
                color='primary'
                disabled={note == ''}
                onClick={() => saveClicked()}
              >
                Save
              </Button>
            </Box>
          </>
        )}
      </Paper>
      <Dialog
        open={openDeleteConfirmation}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            sx={{ color: 'common.black' }}
          >
            Are you sure you want to delete this note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANCEL</Button>
          <Button onClick={deleteClicked} sx={{ color: 'primary.main' }}>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
