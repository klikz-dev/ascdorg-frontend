import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Grid, Typography, Modal, IconButton } from '@mui/material'
import { hubspotFormIds } from '../../../const'
import HubSpotForm from '../../HubSpotForm'
import CtaButton from '../../interactives/Buttons/CtaButton'

export default function NeverMiss() {
  const [openModal, setOpenModal] = useState(false)
  const _renderWorkshopForm = () => (
    <Box pt={0} pb={10} px={[2, 10]}>
      <h1>Sign Up</h1>
      <HubSpotForm formId={hubspotFormIds.NEVER_MISS_WORKSHOP_FORM} />
    </Box>
  )
  return (
    <Box
      sx={{
        backgroundColor: 'background.lightGreen',
        padding: '77px 40px',
        margin: '80px 0',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant='h3'
            sx={{
              textAlign: 'center',
              marginBottom: '16px',
            }}
          >
            Keep Up with ASCD Authors
          </Typography>
          <Typography
            variant='body2'
            sx={{
              textAlign: 'center',
              maxWidth: { xs: 'unset' },
            }}
          >
            Don&apos;t miss the latest thinking from ASCD&apos;s community of
            authors and education leaders. Get notified about upcoming author
            events, including workshops, live talks, webinars, chats, and more.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box
            display='flex'
            alignItems='center'
            width='100%'
            height='100%'
            justifyContent='center'
          >
            <CtaButton
              variant='contained'
              color='primary'
              width='100%'
              size='large'
              label='Sign up'
              onclick={() => setOpenModal(true)}
            />
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby='Workshop Signup'
        aria-describedby='A pop-up form to sign up for the Workshops'
      >
        <Box
          sx={{
            backgroundColor: 'common.white',
            color: 'grey.dark',
            height: { xs: '100vh', md: '85vh' },
            width: { xs: '100vw', md: '50vw' },
            position: 'absolute',
            padding: (theme) => theme.spacing(2, 0, 0, 0),
            overflow: 'scroll',
            borderRadius: { md: '16px' },
            top: { md: '15%' },
            left: { md: '50%' },
            transform: { md: 'translate(-50%, -10%)' },
            boxShadow: { md: 5 },
          }}
        >
          <Box
            display='flex'
            alignItems='center'
            justifyContent='flex-end'
            mb={2}
            pl={2}
            pr={2}
          >
            <IconButton
              aria-label='Close modal button'
              sx={{
                marginRight: (theme) => theme.typography.pxToRem(5),
                color: 'grey.dark',
              }}
              onClick={() => setOpenModal(false)}
            >
              <CloseIcon size='small' />
            </IconButton>
          </Box>
          {_renderWorkshopForm()}
        </Box>
      </Modal>
    </Box>
  )
}
