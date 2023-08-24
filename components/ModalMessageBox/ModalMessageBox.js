import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Modal,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
} from '@mui/material'

export default function ModalMessageBox({
  openMessageBox,
  onMessageBoxClose,
  message,
  itemlist = [],
  ...restProps
}) {
  return (
    <Modal
      open={openMessageBox}
      onClose={() => {
        openMessageBox = false
        onMessageBoxClose(openMessageBox)
      }}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      {...restProps}
    >
      <Box
        sx={{
          backgroundColor: 'common.white',
          color: 'grey.dark',
          height: '35vh',
          width: { xs: '100vw', md: '60vw' },
          maxWidth: { md: '550px' },
          position: 'absolute',
          padding: (theme) => theme.spacing(2, 4, 2, 4),
          overflowY: 'auto',
          top: { md: '15%' },
          left: { md: '50%' },
          transform: { md: 'translate(-50%, -10%)' },
          boxShadow: { md: 5 },
        }}
      >
        <Box
          display='flex'
          alignItems='left'
          justifyContent='flex-end'
          mb={2}
          pl={2}
          pr={2}
        >
          <IconButton
            aria-label='Close modal button'
            sx={{
              mr: '5px',
              color: 'grey.dark',
            }}
            size='large'
            onClick={() => {
              openMessageBox = false
              onMessageBoxClose(openMessageBox)
            }}
          >
            <CloseIcon size='small' />
          </IconButton>
        </Box>
        <Box display='flex'>
          <Box pr={2}>
            <Avatar
              sx={{
                width: '60px',
                height: '60px',
                bgcolor: 'warning.light',
                color: 'text.primary',
                fontWeight: '600',
                fontSize: '36px',
              }}
            >
              !
            </Avatar>
          </Box>
          <Box textAlign='left'>
            {message}
            {itemlist.length > 0 && (
              <List>
                {itemlist.map((item, key) => {
                  return (
                    <ListItem
                      sx={{
                        margin: '0px 0px 4px 0px',
                        padding: '0px',
                      }}
                      key={key}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: '16px',
                        }}
                      >
                        •
                      </ListItemIcon>
                      {item}
                    </ListItem>
                  )
                })}
              </List>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
