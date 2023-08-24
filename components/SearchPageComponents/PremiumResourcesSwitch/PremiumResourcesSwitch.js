import { Box, Typography, Switch } from '@mui/material'
import { string, bool, func } from 'prop-types'

export default function PremiumResourcesSwitch({
  testId = 'premium-resources-switch',
  checked,
  onChange,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: { xs: '24px 24px 18px', md: 0 },
      }}
      data-testid={testId}
    >
      <Switch
        sx={{
          width: (theme) => theme.typography.pxToRem(44),
          height: (theme) => theme.typography.pxToRem(22),
          padding: 0,
          overflow: 'unset',
          '& .MuiSwitch-switchBase': {
            padding: (theme) => theme.typography.pxToRem(3),
          },
          '& .Mui-checked': {
            color: 'text.secondary',
            transform: (theme) =>
              `translateX(calc(${theme.typography.pxToRem(
                44
              )} - ${theme.typography.pxToRem(16)} - ${theme.typography.pxToRem(
                5
              )}))`,
          },
          '& .Mui-checked + .MuiSwitch-track': {
            opacity: '1 !important',
          },
          '& .MuiSwitch-track': {
            borderRadius: 40,
            border: 'none',
            borderWidth: 2,
            backgroundColor: 'grey.light',
            opacity: 1,
            transition: (theme) =>
              theme.transitions.create(['background-color', 'border']),
            boxSizing: 'border-box',
          },

          '& .MuiSwitch-thumb': {
            boxShadow: 'none',
            backgroundColor: 'text.secondary',
            width: (theme) => theme.typography.pxToRem(16),
            height: (theme) => theme.typography.pxToRem(16),
          },
        }}
        inputProps={{ 'aria-label': 'Premium resources' }}
        checked={checked}
        onChange={onChange}
        data-testid={`${testId}-switch`}
      />
      <Box
        component='img'
        src='/images/premium.png'
        alt='premium resources logo'
        style={{ width: '24px', margin: '0 8px 0 16px' }}
      />
      <Typography
        sx={{
          color: 'accent.darkOrange',
        }}
        variant='overline'
      >
        Premium resources
      </Typography>
    </Box>
  )
}

PremiumResourcesSwitch.propTypes = {
  testId: string,
  checked: bool,
  onChange: func,
}
