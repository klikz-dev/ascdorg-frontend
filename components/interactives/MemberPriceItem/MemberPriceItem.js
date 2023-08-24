import { useState } from 'react'
import { Box, Popover, Typography } from '@mui/material'
import SvgIcon from '../SvgIcon'

export default function MemberPriceItem({
  description,
  checkIcon,
  infoIcon,
  infoIconPopoverMessage,
  testId = 'memberPriceItem',
}) {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  return (
    <Box
      data-testid={testId}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 2,
        paddingRight: 2,
        marginTop: -1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {checkIcon && (
          <SvgIcon
            icon='MembershipCheckSvg'
            sx={{ width: '28px', height: '21px' }}
          />
        )}
        <Typography
          sx={{
            fontSize: '16px',
            lineHeight: '24px',
          }}
          data-testid={`${testId}-description`}
        >
          {description}
        </Typography>
      </Box>
      {infoIcon && (
        <Box
          sx={{ display: 'flex', flexDirection: 'flex-end' }}
          data-testid={`${testId}-infoIcon`}
        >
          <SvgIcon
            aria-describedby={id}
            onClick={handleClick}
            icon='InfoIconSvg'
            sx={{ '&:hover': { cursor: 'pointer' } }}
          />
          {infoIconPopoverMessage && (
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Typography sx={{ fontSize: '16px', lineHeight: '24px' }}>
                {infoIconPopoverMessage}
              </Typography>
            </Popover>
          )}
        </Box>
      )}
    </Box>
  )
}
