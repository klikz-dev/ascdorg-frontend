import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useReactiveVar } from '@apollo/client'
import {
  AccountCircle,
  ExitToApp,
  FormatQuote,
  History,
  PermIdentity,
  Password,
  //Bookmark,
  //Receipt
} from '@mui/icons-material'
import {
  Box,
  IconButton,
  Avatar,
  Popover,
  Grid,
  Divider,
  Button,
  Typography,
} from '@mui/material'
import {
  hasPaidMembershipVar,
  showResetPassword,
} from '../../lib/apollo-client/cache'
import useUserAccount from '../../lib/hooks/useUserAccount'
import paths from '../../paths/path'
import CtaButton from '../interactives/Buttons/CtaButton'

const DashboardAnnotations = dynamic(
  () => import('../AnnotationComponents/DashboardAnnotations'),
  {
    ssr: false,
  }
)

const UserAccountToolbarMenu = ({ loginHandler, logoutHandler, mobile }) => {
  const router = useRouter()
  const { userAccountUser } = useUserAccount()
  const hasPaidMembership = useReactiveVar(hasPaidMembershipVar)

  const iconBtnRef = useRef(null)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)

  /** if any route with this component rendered has pathname#login, it will initiate login */
  useEffect(() => {
    if (
      router?.asPath?.split('#').pop() === 'login' &&
      loginHandler &&
      !userAccountUser?.uid
    ) {
      loginHandler()
    }
  }, [loginHandler, router?.asPath, userAccountUser?.uid])

  const toggleAnnotationsDrawerHandler = (open) => {
    setPopoverOpen(false)
    setNotesOpen(open)
  }

  const logoutOutClickHandler = () => {
    setPopoverOpen(false)
    logoutHandler && logoutHandler()
  }

  return userAccountUser ? (
    <>
      <Box ml={[2, 0]}>
        <IconButton
          aria-label='profile button'
          component='span'
          ref={iconBtnRef}
          onClick={() => setPopoverOpen(true)}
          data-testid='profile-button'
        >
          <Avatar
            alt={userAccountUser.name}
            src='/static/images/avatar/3.jpg'
            sx={{
              width: 32,
              height: 32,
              border: '2px solid white',
              boxShadow: 3,
            }}
          />
        </IconButton>
      </Box>
      {!mobile && !hasPaidMembership && (
        <Box ml={3}>
          <CtaButton
            variant='contained'
            color='primary'
            label='Upgrade'
            href={paths.subscribe}
          />
        </Box>
      )}
      <Popover
        id='header-profile'
        open={popoverOpen}
        anchorEl={iconBtnRef?.current}
        onClose={() => setPopoverOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Grid
          container
          sx={{
            width: 300,
            borderRadius: '8px',
          }}
          spacing={2}
        >
          <Grid item xs={12}>
            <Box display='flex' alignItems='center' pt={2} px={2}>
              <AccountCircle />
              <Box ml={2}>
                <Typography variant='h6' data-testid='account-username'>
                  {userAccountUser.name}
                </Typography>
                {userAccountUser.membershipType && (
                  <Typography variant='subtitle3'>
                    {userAccountUser.membershipType}
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Box px={2}>
              <Button
                startIcon={<PermIdentity />}
                sx={{
                  opacity: 0.6,
                  '& a:hover': {
                    textDecoration: 'none !important',
                  },
                }}
              >
                <Link href='/user/account'>
                  <a>Edit Account</a>
                </Link>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box px={2}>
              <Button
                sx={{
                  opacity: 0.6,
                }}
                startIcon={<FormatQuote />}
                onClick={() => toggleAnnotationsDrawerHandler(true)}
              >
                Notes & Highlights
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box px={2}>
              <Button
                startIcon={<History />}
                sx={{
                  opacity: 0.6,
                  '& a:hover': {
                    textDecoration: 'none !important',
                  },
                }}
              >
                <Link href='/user/downloads'>
                  <a>My Benefits</a>
                </Link>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box px={2}>
              <Button
                startIcon={<History />}
                sx={{
                  opacity: 0.6,
                  '& a:hover': {
                    textDecoration: 'none !important',
                  },
                }}
              >
                <Link href='/account/orders'>
                  <a>Book Order History</a>
                </Link>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box px={2}>
              <Button
                onClick={() => {
                  setPopoverOpen(false)
                  showResetPassword(true)
                }}
                startIcon={<Password />}
                sx={{
                  opacity: 0.6,
                  '& a:hover': {
                    textDecoration: 'none !important',
                  },
                }}
                data-testid='account-reset-password'
              >
                <div>Reset Password</div>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Box px={2} mb={2}>
              <Button
                sx={{
                  opacity: 0.6,
                }}
                startIcon={
                  <ExitToApp style={{ transform: 'rotate(-180deg)' }} />
                }
                onClick={() => logoutOutClickHandler()}
                data-testid='account-sign-out'
              >
                Sign Out
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Popover>
      <DashboardAnnotations
        userId={userAccountUser.uid}
        open={notesOpen}
        toggleOpen={(open) => toggleAnnotationsDrawerHandler(open)}
      />
    </>
  ) : (
    <>
      {!mobile && (
        <Box ml={1}>
          <CtaButton
            variant='contained'
            color='primary'
            label='Join ASCD'
            id='subscribe'
            href={paths.subscribe}
          />
        </Box>
      )}
      <Box ml={1}>
        <CtaButton
          testId='login-button'
          variant='outlined'
          color='primary'
          label='Log In'
          onclick={() => loginHandler && loginHandler()}
        />
      </Box>
    </>
  )
}

export default UserAccountToolbarMenu
