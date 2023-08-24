import { useRouter } from 'next/router'
import { Box, Grid, Typography } from '@mui/material'
import { string, arrayOf, shape } from 'prop-types'
import { contentfulImageTransformation } from '../../lib/data-transformations'
import NextImageWrapper from '../images/NextImageWrapper'

export default function CtaItem({ icon, tagline, subtagline, url }) {
  const router = useRouter()

  return (
    <Box
      sx={{
        width: { xs: '100%', md: '199px' },
        cursor: url ? 'pointer' : 'auto',
      }}
      role='button'
      aria-label={`${tagline} button`}
      onClick={() => (url ? router.push(url) : void 0)}
    >
      <Grid container alignItems='center'>
        <Grid
          item
          xs={4}
          md={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'flex-start', md: 'center' },
          }}
        >
          <Box
            sx={{
              width: { xs: '96px', sm: '80px', md: '96px' },
              height: { xs: '96px', sm: '80px', md: '96px' },
            }}
          >
            <NextImageWrapper
              src={contentfulImageTransformation(icon)}
              alt={icon?.alternate}
              height={96}
              width={96}
              priority
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={8}
          md={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'flex-start', md: 'center' },
          }}
        >
          <Box
            sx={{
              ml: { xs: 0, sm: 1.5, md: 0 },
            }}
          >
            <Typography
              sx={{
                fontSize: (theme) => theme.typography.pxToRem(18),
                fontWeight: 700,
                lineHeight: (theme) => theme.typography.pxToRem(18),
                letterSpacing: '0.2px',
                marginTop: '8px',
                textAlign: { xs: 'left', md: 'center' },
              }}
            >
              {tagline}
            </Typography>
            <Typography
              sx={{
                fontSize: (theme) => theme.typography.pxToRem(16),
                fontWeight: 400,
                lineHeight: (theme) => theme.typography.pxToRem(22),
                letterSpacing: '0.2px',
                marginTop: '8px',
                textAlign: { xs: 'left', md: 'center' },
              }}
            >
              {subtagline}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

CtaItem.propTypes = {
  icon: shape({
    imageBynder: arrayOf(
      shape({
        src: string,
      })
    ),
    imageContentful: shape({
      fields: shape({
        file: shape({
          url: string,
        }),
      }),
    }),
    alternate: string,
  }),

  tagline: string,
  subtagline: string,
  url: string,
}
