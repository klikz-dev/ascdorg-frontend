import { useState } from 'react'
import { useRouter } from 'next/router'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import {
  Link,
  Button,
  Popover,
  Box,
  Typography,
  IconButton,
  ListItem,
} from '@mui/material'

export default function NavMenuItem({
  testId = 'nav-menu-item',
  id,
  label,
  labelIcon,
  startIcon,
  endIcon,
  items,
  rightLinks,
  href,
}) {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuClick = (event) => {
    setAnchorEl(event.target)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const buttonStyle = {
    color: 'initial',
    width: '100%',
    bgcolor: 'transparent',
    padding: { xs: '6px 12px 20px', mobileCutoff: '6px 12px' },
    fontSize: { xs: '20px', mobileCutoff: '0.875rem' },
    fontWeight: { xs: '700', mobileCutoff: '500' },
    lineHeight: { xs: '28px', mobileCutoff: '1.75' },
    '&:hover': {
      backgroundColor: 'transparent',
      color: 'hover.main',
      textDecoration: 'underline',
      '& .MuiButton-endIcon': {
        color: 'hover.main',
      },
    },
    '&:focus': {
      bgcolor: 'grey.extraLight',
      color: 'hover.main',
      textDecoration: 'underline',
      '& .MuiButton-endIcon': {
        color: 'hover.main',
      },
    },
    '&:focus-visible': {
      bgcolor: 'grey.extraLight',
      color: 'hover.main',
      textDecoration: 'underline',
    },
    '&:focus:not(:focus-visible)': {
      bgcolor: 'transparent',
      color: 'initial',
      textDecoration: 'none',
    },
    '& span.MuiButton-endIcon': {
      transition: '0.2s',
      marginLeft: 0,
    },
    '& .MuiButton-startIcon': {
      display: { mobileCutoff: 'none' },
      color: 'primary.light',
      marginLeft: 0,
      marginRight: '18px',
      '& .MuiSvgIcon-root': {
        width: '20px',
        height: '20px',
      },
    },
    '& .MuiButton-endIcon': {
      display: { xs: 'none', mobileCutoff: 'inherit' },
      color: 'primary.main',
    },
    '& .MuiButton-label': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    '&:hover ': {
      '& svg': {
        color: 'hover.main',
      },
    },
  }

  return (
    <>
      <ListItem
        key={label}
        sx={{
          minWidth: { xs: 'initial', sm: '275px', mobileCutoff: 'initial' },
          borderBottom: {
            xs: '1px solid rgba(33, 33, 33, 0.08)',
            mobileCutoff: 'none',
          },
          width: 'initial',
          padding: 0,
        }}
        data-testid={testId}
      >
        <Button
          id={id}
          variant='standard'
          startIcon={startIcon}
          endIcon={endIcon}
          disableElevation
          disableFocusRipple
          disableRipple
          sx={
            anchorEl
              ? {
                  ...buttonStyle,
                  '& .MuiButton-endIcon': {
                    ...buttonStyle['& .MuiButton-endIcon'],
                    transform: 'rotate(180deg)',
                  },
                }
              : buttonStyle
          }
          onClick={(e) => (href ? router.push(href) : handleMenuClick(e, id))}
        >
          {label}
          <KeyboardBackspaceIcon
            sx={{
              marginLeft: 'auto',
              color: 'grey.light',
              transform: 'rotate(180deg)',
              display: { mobileCutoff: 'none' },
            }}
          />
        </Button>
      </ListItem>
      <Popover
        id='mega-nav'
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={(theme) => ({
          '& .MuiPaper-rounded': {
            borderRadius: '16px',
            boxShadow:
              '0px 12px 17px rgba(0, 0, 0, 0.03), 0px 5px 22px rgba(0, 0, 0, 0.04), 0px 7px 8px rgba(0, 0, 0, 0.08)',
            [theme.breakpoints.down('sm')]: {
              borderRadius: 0,
              maxHeight: '100%',
              height: '100%',
              maxWidth: '100%',
              width: '100%',
              position: 'fixed',
              top: '0!important',
              left: '0!important',
              right: '0!important',
            },
          },
        })}
        elevation={0}
      >
        <Box
          sx={{
            borderRadius: { xs: 0, sm: '16px' },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'center', sm: 'flex-start' },
            justifyContent: 'flex-start',
            bgcolor: { xs: 'background.light', sm: 'grey.extraLight' },
            minWidth: '300px',
          }}
        >
          <Box
            sx={{
              bgcolor: 'background.light',
              width: '100%',
              minWidth: { xs: '120px', sm: '340px' },
              borderRadius: { xs: 0, sm: '16px' },
              boxShadow: {
                xs: 'none',
                sm: '0px 4px 5px rgba(0, 0, 0, 0.03), 0px 1px 10px rgba(0, 0, 0, 0.04), 0px 2px 4px rgba(0, 0, 0, 0.08)',
              },
              '& ul': {
                listStyleType: 'none',
                paddingLeft: 0,
                marginBlockStart: 0,
                marginBlockEnd: 0,
                width: '100%',
                marginTop: { xs: '32px', sm: 0 },
                marginBottom: { xs: 0, sm: '24px' },
                '& li': {
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  margin: { xs: '18px 20px', sm: '0 20px' },
                  padding: { xs: '4px 0', sm: '18px 12px' },
                  '& a': {
                    width: '100%',
                    textDecoration: 'none',
                    fontSize: { xs: '20px', sm: '14px', mobileCutoff: '16px' },
                    fontWeight: 700,
                    color: 'text.primary',
                  },

                  border: { sm: '1px solid transparent' },
                  borderTop: { sm: '1px solid rgba(33, 33, 33, 0.08)' },
                  '&:first-child': {
                    borderTop: { sm: '1px solid transparent' },
                  },

                  '&:hover': {
                    borderRadius: { sm: '4px' },
                    borderTop: { sm: '1px solid transparent' },
                    boxShadow: {
                      sm: '0px 6px 10px rgba(0, 0, 0, 0.03), 0px 1px 18px rgba(0, 0, 0, 0.04), 0px 3px 5px rgba(0, 0, 0, 0.08)',
                    },
                    '& a': {
                      color: 'hover.main',
                      textDecoration: 'underline',
                    },
                    '& svg': {
                      color: 'hover.main',
                    },
                  },
                },
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                bgcolor: { xs: 'primary.main', sm: 'background.light' },
                borderRadius: { xs: '0 0 0 32px', sm: '0 16px 0 32px' },
                padding: '20px',
                color: { xs: 'text.secondary', sm: 'unset' },
              }}
            >
              <IconButton
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'text.secondary',
                  },
                  display: { sm: 'none' },
                }}
                onClick={handleMenuClose}
                size='large'
              >
                <KeyboardBackspaceIcon />
              </IconButton>
              {labelIcon}
              <Typography
                variant='h4'
                sx={{
                  ml: 1,
                }}
              >
                {label}
              </Typography>
            </Box>
            <ul data-testid={`${testId}-link-items`}>
              {items.map(({ label, href, target, testId }, key) => (
                <li key={`${label}-${key}`}>
                  <Link href={href} target={target} data-testid={testId}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
          {rightLinks && (
            <Box
              sx={{
                position: 'relative',
                bgcolor: { xs: 'background.light', sm: 'grey.extraLight' },
                marginTop: '32px',
                marginLeft: { xs: 0, sm: '6px' },
                minWidth: { xs: '200px', sm: '220px', mobileCutoff: '240px' },
                width: '100%',
                borderRadius: '0 0 16px 16px',
                '& ul': {
                  listStyleType: 'none',
                  paddingLeft: 0,
                  marginBlockStart: 0,
                  marginBlockEnd: 0,
                  width: '100%',
                  paddingTop: { xs: 0, sm: '24px' },
                  marginTop: { xs: '32px', sm: 0 },
                  '& li': {
                    padding: '6px 24px',
                    '& a': {
                      textDecoration: 'none',
                      fontSize: { xs: '16px', sm: '14px' },
                      lineHeight: { xs: '26px', sm: '22px' },
                      fontWeight: 400,
                      color: 'text.primary',
                    },
                    '&:hover': {
                      '& a': {
                        color: 'hover.main',
                        textDecoration: 'underline',
                      },
                    },
                  },
                  '&:before': {
                    position: 'absolute',
                    top: 0,
                    left: '24px',
                    content: '""',
                    height: '8px',
                    width: '32px',
                    bgcolor: 'primary.light',
                  },
                },
              }}
            >
              <ul data-testid={`${testId}-right-link-items`}>
                {rightLinks.map(({ label, href, target, testId }, key) => (
                  <li key={`${label}-${key}`}>
                    <Link href={href} target={target} data-testid={testId}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      </Popover>
    </>
  )
}
