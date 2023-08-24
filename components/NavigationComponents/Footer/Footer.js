import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  Modal,
  IconButton,
  Button,
  Link as MUILink,
} from '@mui/material'
import { hubspotFormIds } from '../../../const'
import { about, involved, partner } from '../../../const/menuItems'
import HubSpotForm from '../../HubSpotForm'
import CtaButton from '../../interactives/Buttons/CtaButton'
import SocialButtons from '../../interactives/Buttons/SocialButtons'
import FooterMenu from '../FooterMenu/FooterMenu'

export default function Footer({ grey }) {
  const [openModal, setOpenModal] = useState(false)

  const footerColumnStyle = {
    flex: '1',
    '& > .MuiBox-root': {
      pr: { xs: 0 },
      mb: { xs: '28px' },
      mt: { xs: 0 },
      ml: { md: '20px', xl: '60px' },
    },
    '&:last-of-type': {
      minWidth: { md: '240px' },
      '& > .MuiBox-root': {
        ml: { lg: '20px' },
        mb: { xs: '32px' },
      },
    },
    '&:nth-of-type(3)': {
      '& > .MuiBox-root': {
        mb: { xs: '48px', md: 0 },
      },
    },
  }

  const copywriteLineStyle = {
    flexDirection: { xs: 'column-reverse', md: 'row' },
    alignItems: { md: 'center' },
    textAlign: 'center',
    maxWidth: { xs: '450px', md: '100%' },
    ml: { xs: 'auto', md: 0 },
    mr: { xs: 'auto', md: 0 },
    '& $copyrightLine > .MuiBox-root': {
      mr: 0,
      mt: { xs: '10px', md: 0 },
      justifyContent: { xs: 'space-between', md: 'unset' },
      '& $subLink': {
        margin: { xs: '0 12px', md: 0 },
      },
    },
  }

  const subLinkStyle = {
    '& a': {
      opacity: '0.8',
      textDecoration: 'underline',
      '&:hover': {
        opacity: '1',
      },
    },
  }

  const _renderNewsletterForm = () => (
    <Box pt={0} pb={10} px={[2, 10]}>
      <h1>Sign Up for our Newsletter</h1>
      <HubSpotForm formId={hubspotFormIds.NEWSLETTER_FORM} />
    </Box>
  )

  return (
    <Box
      component='footer'
      sx={
        grey
          ? {
              backgroundColor: 'background.main',
            }
          : undefined
      }
    >
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignContent: { xs: 'center', md: 'flex-start' },
          bgcolor: 'accent.darkGreen',
          borderTopLeftRadius: { xs: '48px', md: '96px' },
          height: { md: '400px' },
          '& *': {
            color: 'common.white',
          },
        }}
      >
        <Grid
          container
          sx={{
            padding: { xs: '50px 3vw 5px', xl: '50px 10vw 5px' },
            textAlign: { xs: 'center', md: 'left' },
            justifyContent: { md: 'space-between' },
            '& > div': {
              maxWidth: { xs: '450px', md: 'unset' },
              marginLeft: { xs: 'auto', md: 0 },
              marginRight: { xs: 'auto', md: 0 },
            },
          }}
        >
          <Grid
            sx={{
              width: { xs: '100%', md: '25%', xl: '30%' },
              mb: { xs: '48px', md: 0 },
              '& > .MuiBox-root': {
                mr: { xs: 0, md: '56px' },
              },
            }}
          >
            <Box
              mb={3}
              sx={{
                '& > div': {
                  display: 'inline-block',
                  margin: { xs: 'auto', md: 0 },
                },
              }}
            >
              <MUILink
                href='/'
                sx={{
                  paddingTop: 0,
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  position: 'static',
                }}
              >
                <Image
                  priority
                  src={'/images/fulllogo_white.svg'}
                  alt='ascd logo'
                  width={109}
                  height={29}
                  placeholder='blur'
                  blurDataURL='/images/blurrImg.png'
                />
              </MUILink>
            </Box>
            <Box mr={[0, 7]}>
              <Typography
                sx={{
                  fontSize: '14px',
                  lineHeight: '22px',
                  fontWeight: '400',
                }}
              >
                We create practical, timely, affordable professional learning to
                help educators and instructional leaders provide students with a
                modern, equitable, and quality education.
              </Typography>
            </Box>
          </Grid>
          <Grid
            container
            justifyContent='flex-end'
            sx={{
              flexDirection: { xs: 'column', md: 'row' },
              flexWrap: 'nowrap',
              width: { xs: '65%', sm: '100%', md: '70%', lg: '60%', xl: '65%' },
              ml: { xs: 0, lg: '40px' },
            }}
          >
            <Grid item sx={footerColumnStyle}>
              <FooterMenu title='About ASCD' items={about} />
            </Grid>
            <Grid item sx={footerColumnStyle}>
              <FooterMenu title='Get Involved' items={involved} />
            </Grid>
            <Grid item sx={footerColumnStyle}>
              <FooterMenu title='Partner with Us' items={partner} />
            </Grid>
            <Grid item sx={footerColumnStyle}>
              <Box mt={[4, 0]}>
                <Box
                  mb={4}
                  sx={{
                    display: 'flex',
                    justifyContent: {
                      xs: 'center',
                      sm: 'center',
                      md: 'left',
                    },
                  }}
                >
                  <CtaButton
                    variant='contained'
                    color='primary'
                    width='100%'
                    size='large'
                    label='Sign up for our newsletters'
                    href='http://information.ascd.org/newsletters'
                    target='popup'
                  />
                </Box>
                <Typography variant='h5'>Questions?</Typography>
                <Box mt={0.75}>
                  <Link href='/faq'>
                    <a>
                      <Typography variant='small-link'>
                        {'Check out our FAQ'}
                      </Typography>
                    </a>
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Box
          mb={2}
          mt={0}
          sx={{
            padding: { xs: '0 1vw 5px', lg: '0 3vw 5px', xl: '0 10vw 5px' },
          }}
        >
          <Divider
            sx={{
              marginBottom: '18px',
              bgcolor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          <Box
            display='flex'
            justifyContent='space-between'
            sx={copywriteLineStyle}
          >
            <Box display='flex' sx={copywriteLineStyle}>
              <Box mr={[0, 5]} mt={[3, 0]}>
                <Typography variant='caption'>
                  &copy;
                  {` ${new Date().getFullYear()} ASCD. All Rights Reserved.`}
                </Typography>
              </Box>
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                mt={[3, 0]}
              >
                <Box mr={3} sx={subLinkStyle}>
                  <Typography variant='caption'>
                    <Link href='/privacy-policy'>
                      <a>Privacy Policy</a>
                    </Link>
                  </Typography>
                </Box>
                <Box mr={3} sx={subLinkStyle}>
                  <Typography variant='caption'>
                    <Link href='/terms-of-use'>
                      <a>Terms of Use</a>
                    </Link>
                  </Typography>
                </Box>
                <Box mr={3} sx={subLinkStyle}>
                  <Typography variant='caption'>
                    <Link href='/governance'>
                      <a>Governance</a>
                    </Link>
                  </Typography>
                </Box>
                <Box mr={3}>
                  <Typography variant='caption'>
                    <Button
                      sx={{
                        fontFamily: 'Poppins',
                        color: 'unset !important',
                        backgroundColor: 'transparent !important',
                        border: 'none !important',
                        opacity: '0.8',
                        padding: '0 !important',
                        fontWeight: '500 !important',
                        fontSize: '0.75rem !important',
                        lineHeight: '1.66 !important',
                        textDecoration: 'underline',
                        minHeight: '0',
                        '&:hover': {
                          opacity: '1',
                        },
                      }}
                      id='ot-sdk-btn'
                      className='ot-sdk-show-settings'
                    >
                      Cookie Settings
                    </Button>
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: { xs: '90%', md: '30%' },
                ml: { xs: 'auto', md: 0 },
                mr: { xs: 'auto', md: 0 },
              }}
            >
              <SocialButtons />
            </Box>
          </Box>
        </Box>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby='Newsletter Signup'
          aria-describedby='A pop-up form to sign up for the newsletter'
        >
          <Box
            sx={{
              bgcolor: 'common.white',
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
                  mr: '5px',
                  color: 'grey.dark',
                }}
                size='large'
                onClick={() => setOpenModal(false)}
              >
                <CloseIcon size='small' />
              </IconButton>
            </Box>

            {_renderNewsletterForm()}
          </Box>
        </Modal>
      </Container>
    </Box>
  )
}
