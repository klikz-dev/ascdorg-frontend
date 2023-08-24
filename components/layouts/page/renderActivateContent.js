import { useState } from 'react'
import Link from 'next/link'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Container,
  Divider,
  Grid,
  Hidden,
  Modal,
  IconButton,
  Typography,
} from '@mui/material'
import paths from '../../../paths/path'
import CtaButton from '../../interactives/Buttons/CtaButton'
import ContactForm from './ContactForm'

export function RenderActivateContent({ title, variant, buttonLink }) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <Box
      sx={{ backgroundColor: 'background.main', width: '100%' }}
      py={4}
      px={[1, 0]}
    >
      <Container maxWidth='lg'>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={5}
            sx={{
              marginTop: { xs: 1, md: 6 },
              marginBottom: { xs: 1, md: 6 },
              textAlign: { xs: 'center', sm: 'initial' },
              '&:first-of-type': {
                paddingBottom: { xs: '32px', sm: 0 },
                marginBottom: { xs: '16px', sm: '48px' },
                borderBottom: {
                  xs: '1px solid rgba(0, 0, 0, 0.2)',
                  sm: 'none',
                },
              },
              '& > div': {
                width: { xs: '100%', sm: 'unset' },
              },
            }}
            container
            alignItems='center'
          >
            <Box mb={2}>
              <Typography variant='h2'>{title}</Typography>
            </Box>
            <Typography variant='subtitle2'>
              If you have specific questions or want more information, we’re
              just an email or phone call away.
            </Typography>
          </Grid>
          <Grid item xs={false} sm={2} container justifyContent='center'>
            <Hidden smDown>
              <Divider
                orientation='vertical'
                flexItem
                sx={{
                  minHeight: 150,
                  height: '100%',
                }}
              />
            </Hidden>
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
            sx={{
              marginTop: { xs: 1, md: 6 },
              marginBottom: { xs: 1, md: 6 },
              textAlign: { xs: 'center', sm: 'unset' },
              '&:first-of-type': {
                paddingBottom: { xs: '32px', sm: 0 },
                marginBottom: { xs: '16px', sm: 0 },
                borderBottom: {
                  xs: '1px solid rbga(0, 0, 0, 0.2)',
                  sm: 'none',
                },
              },
              '& > div': {
                width: { xs: '100%', sm: 'unset' },
              },
            }}
            container
            alignItems='center'
          >
            <Box>
              <Box mt={1}>
                <Typography variant='subtitle1'>
                  1-800-933-2723 or 1-703-578-9600
                </Typography>
              </Box>
              <Box mt={1}>
                <Typography variant='subtitle1'>
                  <Link href='mailto:programteam@ascd.org'>
                    <a>
                      <Typography variant='medium-link'>
                        {'programteam@ascd.org'}
                      </Typography>
                    </a>
                  </Link>
                </Typography>
              </Box>
            </Box>
            {variant === 'activate' && (
              <Box
                mt={5}
                display='flex'
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'center', sm: 'unset' },
                  '& a, button': {
                    width: { xs: '100%', sm: 'initial' },

                    '&:first-child': {
                      marginRight: { xs: 0, sm: '16px' },
                      marginBottom: { xs: '16px', sm: 0 },
                    },
                  },
                }}
              >
                <CtaButton
                  variant='contained'
                  color='primary'
                  width='100%'
                  size='large'
                  label='Contact Us'
                  href={paths.contact}
                />
                <CtaButton
                  variant='outlined'
                  color='primary'
                  width='100%'
                  size='large'
                  label='FAQ'
                  href={paths.faq({ slug: 'ACTIVATE' })}
                />
              </Box>
            )}
            {variant === 'services' && (
              <Box
                mt={5}
                display='flex'
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'center', sm: 'unset' },
                  '& a, button': {
                    width: { xs: '100%', sm: 'initial' },

                    '&:first-child': {
                      marginRight: { xs: 0, sm: '16px' },
                      marginBottom: { xs: '16px', sm: 0 },
                    },
                  },
                }}
              >
                {buttonLink ? (
                  <CtaButton
                    variant='contained'
                    color={
                      buttonLink.buttonStyle?.includes('Secondary')
                        ? 'secondary'
                        : 'primary'
                    }
                    width='100%'
                    size='large'
                    label={buttonLink.linkLabel}
                    href={buttonLink.linkUrl}
                    target={buttonLink.linkTarget}
                  />
                ) : (
                  <CtaButton
                    variant='contained'
                    color='primary'
                    width='100%'
                    size='large'
                    label='Contact Us'
                    onclick={() => setOpenModal(true)}
                  />
                )}
                <CtaButton
                  variant='outlined'
                  color='primary'
                  width='100%'
                  size='large'
                  label='FAQ'
                  href={paths.faq({ slug: 'Professional Learning Services' })}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <Box
          sx={{
            backgroundColor: 'common.white',
            color: 'grey.dark',
            height: { xs: '100vh', md: '85vh' },
            width: { xs: '100vw', md: '60vw' },
            maxWidth: { md: 550 },
            position: 'absolute',
            borderRadius: { md: '16px' },
            padding: (theme) => theme.spacing(2, 0, 0, 0),
            overflow: 'scroll',
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
                marginRight: 5,
                color: 'grey.dark',
              }}
              size='large'
              onClick={() => setOpenModal(false)}
            >
              <CloseIcon size='small' />
            </IconButton>
          </Box>
          <Box textAlign='center'>
            <Typography variant='h3'>{`Let's Talk`}</Typography>
          </Box>
          <ContactForm />
        </Box>
      </Modal>
    </Box>
  )
}
