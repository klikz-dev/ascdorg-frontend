import { useState } from 'react'
import Link from 'next/link'
import { Box, MenuItem, Button, Menu, Typography } from '@mui/material'

export default function SubNavDropDown({ subNav, testId = 'subNavDropDown' }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = anchorEl

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box data-testid={testId}>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='textPrimary'
        onClick={handleClick}
      >
        <Typography subtitles='h2'>More...</Typography>
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={!!open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {subNav?.map(
          ({ dropDownLinkLabel, dropDownLinkUrl, dropDownLinkTarget }, idx) => {
            return (
              <MenuItem onClick={handleClose} key={idx}>
                <Link href={dropDownLinkUrl} target={dropDownLinkTarget}>
                  <a>{dropDownLinkLabel}</a>
                </Link>
              </MenuItem>
            )
          }
        )}
      </Menu>
    </Box>
  )
}
