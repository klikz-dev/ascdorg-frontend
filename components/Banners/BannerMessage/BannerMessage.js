import { Paper } from '@mui/material'
import { node, string } from 'prop-types'

export default function BannerMessage({ variant, children }) {
  const rootStyle = {
    textAlign: 'center',
    minHeight: '48px',
    padding: '12px 24px',
    borderRadius: { xs: '8px', md: '100px' },
    backgroundColor:
      variant === 'special' ? 'accent.paleGreen' : 'common.white',
    '& p': {
      margin: 0,
      fontSize: (theme) => theme.typography.pxToRem(18),
      fontWeight: '400',
      lineHeight: (theme) => `${theme.typography.pxToRem(24)} !important`,
      letterSpacing: '0.2px',
    },
    '& a': {
      color: variant === 'special' ? 'inherit' : 'primary.main',
    },
  }
  return (
    <>
      {variant === 'special' ? (
        <Paper sx={rootStyle} elevation={0}>
          {children}
        </Paper>
      ) : (
        <Paper sx={rootStyle} elevation={6}>
          {children}
        </Paper>
      )}
    </>
  )
}

BannerMessage.propTypes = {
  children: node,
  variant: string,
}
