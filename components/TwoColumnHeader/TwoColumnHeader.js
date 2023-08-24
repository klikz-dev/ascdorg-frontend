import { Box, Typography } from '@mui/material'
import { string, oneOfType, object, arrayOf, element } from 'prop-types'
import CtaButton from '../interactives/Buttons/CtaButton'

export default function TwoColumnHeader({
  title,
  body,
  ctaLabel,
  ctaLink,
  ctaTarget,
}) {
  return (
    <Box>
      <Typography
        variant='h2'
        sx={{
          fontSize: (theme) => ({
            xs: theme.typography.pxToRem(34),
            md: theme.typography.pxToRem(32),
          }),
          lineHeight: (theme) => ({
            xs: theme.typography.pxToRem(42),
            md: theme.typography.pxToRem(40),
          }),
        }}
      >
        {title}
      </Typography>
      <Box mt={1} mb={4}>
        <Typography variant='subtitle2'>{body}</Typography>
      </Box>
      {ctaLabel && (
        <Box
          sx={{
            width: { xs: '100%', md: 'fit-content' },
          }}
        >
          <CtaButton
            variant='outlined'
            color='primary'
            label={ctaLabel}
            href={ctaLink}
            target={ctaTarget}
            fullWidth
          />
        </Box>
      )}
    </Box>
  )
}

TwoColumnHeader.propTypes = {
  title: string,
  body: oneOfType([string, object, arrayOf(element)]),
  ctaLabel: string,
  ctaLink: string,
  ctaTarget: string,
}
