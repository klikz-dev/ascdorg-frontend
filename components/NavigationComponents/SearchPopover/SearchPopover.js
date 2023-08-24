import { forwardRef } from 'react'
import Link from 'next/link'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import { Popover, Box, Typography, InputBase, IconButton } from '@mui/material'
import { string, bool, func, arrayOf, shape } from 'prop-types'
import SearchPopoverTopicsList from '../SearchPopoverTopicsList'

export const SearchPopover = forwardRef(
  (
    {
      testId = 'search-popover',
      searchPopover,
      closeSearchPopover,
      searchPopoverValue,
      setSearchPopoverValue,
      resetSearchPopoverValue,
      searchPopoverPlaceholder,
      triggerSearch,
      onEnterKeyPress,
      onCancelKeyPress,
      topics,
      grades,
      subjects,
    },
    ref
  ) => {
    const searchTopicsBoxStyle = {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: { xs: '24px 12px', sm: '24px 0', md: '24px 16px' },
    }

    const searchPopoverTopicsBoxHeadingStyle = {
      fontSize: { xs: '14px', md: '12px' },
      fontWeight: { xs: '700', md: '600' },
      lineHeight: { xs: '21px', md: '18px' },
      paddingLeft: '4px',
    }

    return (
      <Popover
        id='search-popover'
        open={searchPopover}
        anchorEl={ref?.current}
        onClose={closeSearchPopover}
        sx={{
          borderRadius: 0,
          '& .MuiPopover-paper': {
            top: '0!important',
            left: '0!important',
            right: { sm: 'initial!important', md: '0!important' },
            maxWidth: '100vw',
            width: { sm: '323px', md: 'initial' },
            minHeight: { xs: '100%', md: '420px' },
            borderRadius: 0,
            padding: { xs: '12px', sm: '24px' },
          },
        }}
        data-testid={testId}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconButton
            onClick={closeSearchPopover}
            sx={{
              display: 'flex',
              alignSelf: 'flex-end',
            }}
            size='large'
            data-testid={`${testId}-button`}
          >
            <CloseIcon />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: { xs: '100%', md: '80%', lg: '100%' },
              maxWidth: '960px',
              padding: { xs: '24px 12px', lg: '32px 20px 12px' },
              borderBottom: '1px solid rgba(0, 0, 0, 0.4)',
            }}
          >
            <InputBase
              value={searchPopoverValue}
              placeholder={searchPopoverPlaceholder}
              onChange={setSearchPopoverValue}
              onKeyPress={onEnterKeyPress}
              sx={{
                color: 'inherit',
                width: '90%',
                '& .MuiInputBase-input': {
                  width: '100%',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: 'grey.medium',
                  transition: (theme) => theme.transitions.create('width'),

                  '&::-moz-placeholder': {
                    /* Mozilla Firefox 19+ */
                    color: 'grey.medium',
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    lineHeight: '1.125rem',
                    letterSpacing: '0.2px',
                    opacity: '1',
                  },

                  '&::-ms-input-placeholder': {
                    /* Internet Explorer 10+ */
                    color: 'grey.medium',
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    lineHeight: '1.125rem',
                    letterSpacing: '0.2px',
                    opacity: '1',
                  },
                  '&::-webkit-input-placeholder': {
                    /* WebKit browsers */
                    color: 'grey.medium',
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    lineHeight: '1.125rem',
                    letterSpacing: '0.2px',
                    opacity: '1',
                  },
                },
              }}
              color='primary'
              variant='subtitle2'
              inputProps={{ 'aria-label': 'search' }}
              // autoFocus removed for accessiblity reasons: jsx-a11y/no-autofocus
              data-testid={`${testId}-input`}
            />
            <IconButton
              sx={
                searchPopoverValue !== ''
                  ? {
                      color: 'grey.medium',
                      marginRight: { xs: '22px', md: '20px', lg: '2px' },
                      display: 'flex',
                    }
                  : {
                      color: 'grey.medium',
                      marginRight: { xs: '22px', md: '20px', lg: '2px' },
                      display: 'none',
                    }
              }
              onClick={resetSearchPopoverValue}
              onKeyPress={onCancelKeyPress}
              size='large'
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              sx={{
                position: 'relative',
                color: 'grey.medium',
                '&:before': {
                  position: 'absolute',
                  left: '-13px',
                  top: '-8px',
                  content: '""',
                  height: '40px',
                  width: '2px',
                  bgcolor: 'grey.light',
                },
              }}
              onClick={triggerSearch}
              size='large'
              data-testid={`${testId}-search`}
            >
              <SearchIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              maxWidth: '960px',
              width: '80%',
              textAlign: 'right',
              marginTop: '4px',
              '& a': {
                color: '#FF2E45',
                fontWeight: '500',
                width: '80%',
              },
            }}
            data-testid={`${testId}-searchFAQ`}
          >
            <Link href='/faq'>
              <a>Search FAQ</a>
            </Link>
          </Box>
          <Box
            sx={{
              width: { xs: '100%', md: '80%' },
              maxWidth: '960px',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'flex-start',
              justifyContent: 'space-evenly',
              marginTop: '32px',
            }}
          >
            <Box sx={searchTopicsBoxStyle}>
              <Typography sx={searchPopoverTopicsBoxHeadingStyle}>
                Search by Topic
              </Typography>
              {topics && (
                <SearchPopoverTopicsList
                  items={topics}
                  closeSearchPopover={closeSearchPopover}
                  path='topics'
                />
              )}
            </Box>
            <Box sx={searchTopicsBoxStyle}>
              <Typography sx={searchPopoverTopicsBoxHeadingStyle}>
                Search by Grade
              </Typography>
              {grades && (
                <SearchPopoverTopicsList
                  items={grades}
                  closeSearchPopover={closeSearchPopover}
                  path='grades'
                />
              )}
            </Box>
            <Box sx={searchTopicsBoxStyle}>
              <Typography sx={searchPopoverTopicsBoxHeadingStyle}>
                Search by Subject
              </Typography>
              {subjects && (
                <SearchPopoverTopicsList
                  items={subjects}
                  closeSearchPopover={closeSearchPopover}
                  path='subjects'
                />
              )}
            </Box>
          </Box>
        </Box>
      </Popover>
    )
  }
)

export default SearchPopover

SearchPopover.propTypes = {
  testId: string,
  searchPopover: bool,
  closeSearchPopover: func,
  searchPopoverValue: string,
  setSearchPopoverValue: func,
  resetSearchPopoverValue: func,
  searchPopoverPlaceholder: string,
  triggerSearch: func,
  onEnterKeyPress: func,
  onCancelKeyPress: func,
  topics: arrayOf(
    shape({
      title: string,
    })
  ),
  grades: arrayOf(
    shape({
      title: string,
    })
  ),
  subjects: arrayOf(
    shape({
      title: string,
    })
  ),
}
