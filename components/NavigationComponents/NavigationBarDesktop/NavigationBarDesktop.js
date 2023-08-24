import { useRef } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Box, Divider, Grid, IconButton, Toolbar, Link } from '@mui/material'
import { string, func, shape, arrayOf, bool, object } from 'prop-types'
import { showSignIn, signOutUser } from '../../../lib/apollo-client/cache'
import NextImageWrapper from '../../images/NextImageWrapper'
import UserAccountToolbarMenu from '../../UserAccount'
import NavMenu from '../NavMenu'
import SearchPopover from '../SearchPopover'

export default function NavigationBarDesktop({
  testId = 'navigation-bar-desktop',
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
  return (
    <Toolbar
      disableGutters
      sx={{
        height: '72px',
        position: 'relative',
      }}
      data-testid={testId}
    >
      <Grid container alignItems='center'>
        <Grid mobileCutoff={10} container>
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
          <Box mr={1.75} tabIndex='0'>
            <Link
              href='/'
              sx={{
                paddingTop: 0,
                cursor: 'pointer',
                position: 'static',
              }}
            >
              <NextImageWrapper
                testId='ascd-logo-desktop'
                priority
                src={'/images/logo.svg'}
                alt='ascd logo'
                width={109}
                height={36}
              />
            </Link>
          </Box>
          <NavMenu />
        </Grid>
        <Grid mobileCutoff={2}>
          <Box display='flex' alignItems='center' justifyContent='flex-end'>
            <Box mr={3}>
              <IconButton
                aria-label='Open search panel'
                onClick={openSearchPopover}
                size='large'
                data-testid={`${testId}-open-search`}
                ref={anchorElRef}
              >
                <SearchIcon />
              </IconButton>
              <SearchPopover
                testId={`${testId}-search-popover`}
                searchPopover={searchPopover}
                closeSearchPopover={closeSearchPopover}
                searchPopoverPlaceholder={
                  'Search articles, topics, people, events, books, and more…'
                }
                searchPopoverValue={searchPopoverValue}
                setSearchPopoverValue={(event) =>
                  setSearchPopoverValue(event.target.value)
                }
                resetSearchPopoverValue={() => setSearchPopoverValue('')}
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
            <Divider
              orientation='vertical'
              flexItem
              sx={{
                backgroundColor: '#C5CED1',
                height: '32px',
                margin: '4px',
              }}
            />
            <Box ml={3} mr={1}>
              <IconButton
                aria-label='checkout cart'
                className='header__summary snipcart-checkout snipcart-summary'
                size='large'
              >
                <ShoppingCartIcon />
              </IconButton>
            </Box>
            <Box sx={{ minWidth: 80, marginTop: 1 }}>
              <Link
                href={witsbyURL}
                sx={{
                  paddingTop: 0,
                  cursor: 'pointer',
                  position: 'static',
                }}
              >
                <NextImageWrapper
                  testId='witsby-logo-desktop'
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
            />
          </Box>
        </Grid>
      </Grid>
    </Toolbar>
  )
}

NavigationBarDesktop.propTypes = {
  testId: string,
  openSearchPopover: func,
  searchPopover: bool,
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
