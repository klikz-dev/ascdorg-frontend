import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  Delete,
  Edit,
  FormatQuote,
  MoreVert,
  Visibility,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
  Skeleton,
} from '@mui/material'
import paths from '../../../paths/path'
import DaysAgo from '../../info/DaysAgo'

export default function DashboardNote({
  key,
  annotation,
  totalCount,
  notesCount,
  deleteAction,
}) {
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState(null)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)

  const confirmDelete = (e) => {
    e.stopPropagation()
    setAnchorEl(null)
    setOpenDeleteConfirmation(true)
  }

  const handleClose = () => {
    setOpenDeleteConfirmation(false)
  }

  const clickMoreOptions = (e) => {
    e.stopPropagation()
    setAnchorEl(e.target)
  }

  const closePopover = (e) => {
    e.stopPropagation()
    setAnchorEl(null)
  }

  const clickDeleteNote = () => {
    deleteAction(annotation.contentId, annotation.userId)
  }

  const iconStyle = {
    fontSize: (theme) => theme.typography.pxToRem(16),
    marginRight: '4px',
  }

  return (
    <Box key={key} display='flex'>
      <ListItem
        button
        sx={{
          '& *': {
            color: 'common.black',
          },
        }}
        onClick={() =>
          router.push(paths.article({ slug: annotation.contentSlug }))
        }
      >
        <ListItemAvatar
          sx={{
            marginRight: 1,
            height: 70,
            width: 70,
          }}
        >
          {annotation.contentImageSrc ? (
            <Image
              src={annotation.contentImageSrc}
              width={70}
              height={70}
              objectFit='cover'
              placeholder='blur'
              blurDataURL='/images/blurrImg.png'
            />
          ) : (
            <Skeleton
              variant='rectangular'
              width={'100%'}
              height={'100%'}
              animation={false}
            />
          )}
        </ListItemAvatar>
        <Box>
          <Typography
            variant='body2'
            sx={{
              lineHeight: (theme) => theme.typography.pxToRem(18),
            }}
          >
            {annotation.contentTitle}
          </Typography>
          <Box display='flex' my={1}>
            <Box
              display='flex'
              alignItems='center'
              mr={1}
              sx={{
                backgroundColor: '#D6ECFF',
                padding: '0px 4px',
              }}
            >
              <FormatQuote sx={iconStyle} /> {notesCount}
            </Box>
            <Box
              display='flex'
              alignItems='center'
              mr={1}
              sx={{
                backgroundColor: '#FEF7AC',
                padding: '0px 4px',
              }}
            >
              <Edit sx={iconStyle} />
              {totalCount - notesCount}
            </Box>
            <Box>
              <DaysAgo input={annotation.updatedAt} />
            </Box>
          </Box>
        </Box>
      </ListItem>
      <IconButton
        aria-label='more options for this annotation'
        sx={{
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
        onClick={(e) => clickMoreOptions(e)}
        size='large'
      >
        <MoreVert fontSize='small' />
      </IconButton>
      <Popover
        id='more-options-for-note'
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={(e) => closePopover(e)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <List component='nav' aria-label='Note action options'>
          <ListItem
            button
            onClick={() =>
              router.push(paths.article({ slug: annotation.contentSlug }))
            }
          >
            <ListItemIcon>
              <Visibility />
            </ListItemIcon>
            <ListItemText primary='View' />
          </ListItem>
          <ListItem button onClick={(e) => confirmDelete(e)}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText primary='Delete' />
          </ListItem>
        </List>
      </Popover>
      <Dialog
        open={openDeleteConfirmation}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            sx={{
              color: 'common.black',
            }}
          >
            You will delete all of the notes and highlights associated with this
            article.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANCEL</Button>
          <Button
            onClick={clickDeleteNote}
            sx={{
              color: 'primary.main',
            }}
          >
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
