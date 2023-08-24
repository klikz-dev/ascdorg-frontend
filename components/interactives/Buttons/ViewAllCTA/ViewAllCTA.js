import CallMadeIcon from '@mui/icons-material/CallMade'
import { Box, Typography, Link } from '@mui/material'
import { string, bool } from 'prop-types'

export default function ViewAllCTA({
  testId = 'view-all',
  label,
  href,
  target,
  sm,
  lg,
  align,
}) {
  const popUpOnClick = () => {
    window.open(`${href}`, 'popup', 'width=480,height=640')
    return false
  }

  const textSize = (sm, lg, label) => {
    if (sm) {
      return (
        <Typography component='span' variant='buttonSmall'>
          {label}
        </Typography>
      )
    } else if (lg) {
      return (
        <Typography component='span' variant='buttonLarge'>
          {label}
        </Typography>
      )
    } else {
      return (
        <Typography component='span' variant='buttonMedium'>
          {label}
        </Typography>
      )
    }
  }

  return (
    <>
      {href && (
        <Link
          href={href}
          aria-label='View All link'
          onClick={target === 'popup' ? popUpOnClick : null}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: align || 'flex-start',
            alignItems: 'center',
            color: 'text.primary',
            textDecoration: 'none',
            '&:hover': {
              color: 'hover.main',
              '& .MuiSvgIcon-root': {
                color: 'hover.main',
              },
            },
          }}
          target={target}
          data-testid={`${testId}-cta-link`}
        >
          {textSize(sm, lg, label)}
          <Box pl={0.75}>
            <CallMadeIcon
              sx={{
                width: '22px',
                paddingTop: '6px',
                color: 'primary.main',
                transform: 'rotate(45deg)',
              }}
            />
          </Box>
        </Link>
      )}
    </>
  )
}

ViewAllCTA.propTypes = {
  testId: string,
  label: string,
  href: string,
  target: string,
  sm: bool,
  lg: bool,
  align: string,
}
