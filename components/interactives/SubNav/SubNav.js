import { Box, Button, Divider, Typography } from '@mui/material'
import { string, arrayOf, shape } from 'prop-types'
import SubNavDropDown from '../SubNavDropDown/SubNavDropDown'

export default function SubNav({ items, subNav, testId = 'SubNav' }) {
  const renderDivider = (key) => {
    if (key < subNav ? items?.length : items?.length - 1) {
      return (
        <Divider
          orientation='vertical'
          sx={{
            display: { md: 'block' },
          }}
          flexItem
        />
      )
    }
  }
  const _horizontalDivider = (key) => {
    if (key < subNav ? items?.length : items?.length - 1) {
      return (
        <Divider
          orientation='horizontal'
          variant='fullWidth'
          flexItem
          sx={{
            height: '1px',
            margin: '16px 0px',
            display: { md: 'none' },
          }}
        />
      )
    }
  }
  return (
    <Box
      data-testid={testId}
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        a: {
          ml: '24px',
          mr: '24px',
        },
      }}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      {items?.map(
        ({ subNavLinkLabel, subNavLinkUrl, subNavLinkTarget }, key) => {
          return (
            <>
              <Button
                key={`horizontal-nav-${key}`}
                href={subNavLinkUrl}
                target={subNavLinkTarget}
                variant='textPrimary'
                sx={{
                  minWidth: 'unset',
                  marginLeft: 8,
                  marginRight: 8,
                }}
                data-testid={`${testId}-link`}
              >
                <Typography subtitle2='h2'>{subNavLinkLabel}</Typography>
              </Button>
              {renderDivider(key)}
              {_horizontalDivider(key)}
            </>
          )
        }
      )}
      {subNav && (
        <Box sx={{ marginLeft: 8, marginRight: 8 }}>
          <SubNavDropDown subNav={subNav} />
        </Box>
      )}
    </Box>
  )
}

SubNav.propTypes = {
  testId: string,
  items: arrayOf(
    shape({
      linkLabel: string,
      linkUrl: string,
      linkTarget: string,
    }).isRequired
  ),
  subNav: arrayOf(
    shape({
      linkLabel: string,
      linkUrl: string,
      linkTarget: string,
    })
  ),
}
