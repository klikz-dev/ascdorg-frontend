import { useRef } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Toolbar,
  Button,
  Link,
} from '@mui/material'
import {
  string,
  shape,
  func,
  bool,
  oneOfType,
  arrayOf,
  object,
  number,
  element,
} from 'prop-types'
import { showSignIn, signOutUser } from '../../../lib/apollo-client/cache'
import NextImageWrapper from '../../images/NextImageWrapper'
import UserAccountToolbarMenu from '../../UserAccount'
import NavMenu from '../NavMenu'
import SearchPopover from '../SearchPopover'

export default function NavigationBarMobile({
  testId = 'navigation-bar-mobile',
  drawerOpen,
  setDrawerOpen,
  openSearchPopover,
  searchPopover,
  closeSearchPopover,
  searchPopoverValue,
  setSearchPopoverValue,
  triggerSearch,
  onEnterKeyPress,
  selectedTopics,
  grades,
  subjects,
}) {
  const anchorElRef = useRef(null)
  const witsbyURL =
    process.env.NEXT_PUBLIC_WITSBY_URL || 'http://witsby.ascd.org/'
  const handleDrawerOpen = () => setDrawerOpen(true)
  const handleDrawerClose = () => setDrawerOpen(false)
  return (
    <Toolbar
      sx={{
        height: '56px !important',
        minHeight: '56px !important',
      }}
      data-testid={testId}
    >
      <Link
        href='#mainContent'
        sx={{
          position: 'absolute',
          color: 'text.secondary',
          background: 'primary.main',
          fontSize: '18px',
          padding: '12px 16px',
          borderRadius: '4px',
          boxShadow: 3,
          left: { xs: '35%', sm: '43.5%' },
          transform: 'translate(-50%, -180%)',
          transition: 'transform 0.3s',
          zIndex: '100',
          '&:focus': {
            background: 'hover.main',
            transform: 'translateY(-20%)',
          },
        }}
      >
        Skip to content
      </Link>
      <IconButton
        edge={'start'}
        color={'inherit'}
        aria-label={'menu'}
        aria-haspopup={'true'}
        onClick={handleDrawerOpen}
        size='large'
        data-testid={`${testId}-drawerOpen`}
      >
        <MenuIcon />
      </IconButton>

      <Grid container alignItems='center'>
        <Grid item xs={3}>
          <Box ml={1}>
            <Link
              href='/'
              sx={{
                paddingTop: 0,
                position: 'static',
              }}
            >
              <NextImageWrapper
                testId='ascd-logo-mobile'
                priority
                src={'/images/logo.svg'}
                alt='ascd logo'
                width={109}
                height={29}
              />
            </Link>
          </Box>
        </Grid>
        <Grid item xs={9} container justifyContent='flex-end'>
          <IconButton
            aria-label='checkout cart'
            className='header__summary snipcart-checkout snipcart-summary'
            style={{ marginRight: '10px' }}
            size='large'
          >
            <ShoppingCartIcon />
          </IconButton>
          <Box sx={{ minWidth: 80 }}>
            <Link
              href={witsbyURL}
              sx={{
                paddingTop: 0,
                cursor: 'pointer',
                position: 'static',
              }}
            >
              <NextImageWrapper
                testId='witsby-logo-mobile'
                src={'/images/200X95_WitsbyLogin.jpg'}
                alt='Log in to Witsby: ASCD’s Next-Generation Professional Learning and Credentialing Platform'
                width={80}
                height={38}
              />
            </Link>
          </Box>
          <UserAccountToolbarMenu
            loginHandler={() => showSignIn(true)}
            logoutHandler={() => signOutUser(true)}
            mobile
          />
        </Grid>
      </Grid>

      <Drawer anchor={'left'} open={drawerOpen} onClose={handleDrawerClose}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            bgcolor: 'primary.main',
            borderRadius: '0px 0px 0px 32px',
            padding: '20px 20px 32px',
          }}
          data-testid={`${testId}-drawer`}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginBottom: '28px',
            }}
          >
            <IconButton
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.secondary',
                },
              }}
              onClick={handleDrawerClose}
              size='large'
            >
              <CloseIcon />
            </IconButton>
            <Box tabIndex='0'>
              <Link
                href='/'
                sx={{
                  paddingTop: 0,
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  position: 'static',
                }}
              >
                <NextImageWrapper
                  testId='ascd-white-logo-mobile'
                  priority
                  src={'/images/fulllogo_white.svg'}
                  alt='ascd logo'
                  width={109}
                  height={29}
                />
              </Link>
            </Box>
          </Box>
          <Button
            id='search-button-mobile'
            variant='contained'
            endIcon={<SearchIcon />}
            sx={{
              width: '100%',
              fontWeight: '400',
              height: '56px',
              justifyContent: 'flex-start',
              color: 'text.secondary',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: 'hover.main',
              },
              '& .MuiButton-label': {
                justifyContent: 'space-between',
              },
            }}
            onClick={openSearchPopover}
            ref={anchorElRef}
          >
            Search topics, events, books...
          </Button>
          <SearchPopover
            testId={`${testId}-search-popover`}
            searchPopover={searchPopover}
            closeSearchPopover={closeSearchPopover}
            searchPopoverValue={searchPopoverValue}
            setSearchPopoverValue={(event) =>
              setSearchPopoverValue(event.target.value)
            }
            resetSearchPopoverValue={() => setSearchPopoverValue('')}
            searchPopoverPlaceholder={'Search…'}
            triggerSearch={triggerSearch}
            onEnterKeyPress={onEnterKeyPress}
            onCancelKeyPress={() => setSearchPopoverValue('')}
            topics={selectedTopics}
            grades={grades}
            subjects={subjects}
            center={false}
            maxWidth={'100%'}
            background={'transparent'}
            ref={anchorElRef}
          />
        </Box>
        <NavMenu mobile />
      </Drawer>
    </Toolbar>
  )
}

NavigationBarMobile.propTypes = {
  testId: string,
  drawerOpen: bool,
  setDrawerOpen: func,
  openSearchPopover: func,
  searchPopover: oneOfType([number, element]),
  closeSearchPopover: func,
  searchPopoverValue: string,
  setSearchPopoverValue: func,
  triggerSearch: func,
  onEnterKeyPress: func,
  selectedTopics: arrayOf(
    shape({
      fields: shape({ title: string }),
      metadata: object,
      sys: object,
    })
  ),
  grades: arrayOf(
    shape({
      fields: shape({ title: string }),
      metadata: object,
      sys: object,
    })
  ),
  subjects: arrayOf(
    shape({
      fields: shape({ title: string }),
      metadata: object,
      sys: object,
    })
  ),
}
