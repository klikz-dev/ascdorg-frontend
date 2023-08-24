import Link from 'next/link'
import { Box, Container, Grid, Typography } from '@mui/material'
import MemberCard from '../MemberCard'

export default function BecomeMember({ ...props }) {
  const gridItemStyle = {
    mb: { xs: '24px', md: 0 },
    maxWidth: { lg: 'initial' },
  }

  const basic = [
    'Unlimited Access to Educational Leadership Magazine online',
    'Collaboration with passionate thinkers in the ASCD Professional Learning Community',
    'Member-only Webinars',
    'Member-only Discounts',
    'Originally called Basic Online Membership',
  ]
  const select = [
    'Everything in Digital plus:',
    'Five (5) member books sent to your door each year',
    'Eight (8) print issues of EL Magazine',
    'Online access to the 20 most recent member books',
    'Originally called Select Membership',
  ]
  const premium = [
    'Everything in Digital + Print plus:',
    'Four (4) additional member books - a total of 9 per year',
    '$100 voucher for full-day conference*',
    'Originally called Premium Membership',
  ]

  return (
    <Box
      sx={{
        backgroundColor: props.noBackground ? 'transparent' : '#FEC7C8',
        minHeight: {
          xs: props.noBackground ? '1800px' : '1870px',
          md: props.noBackground ? '700px' : '863px',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pb: 5,
      }}
      id='subscribe'
    >
      {!props.noTitle && (
        <Box
          sx={{
            mt: { xs: 6, md: 12 },
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant='h2'>Become a Member</Typography>
          <Link href='/membership-details'>
            <a>
              <Typography
                color='primary'
                fontWeight={'500'}
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                    color: 'hover.main',
                  },
                  textDecoration: 'underline',
                  mr: '5px',
                }}
              >
                Explore all membership options.
              </Typography>
            </a>
          </Link>
          ASCD memberships are subject to sales tax.
        </Box>
      )}

      <Container maxWidth='lg'>
        <Grid
          container
          justifyContent='center'
          sx={{
            width: '100%',
            mt: { xs: 6, md: 9 },
          }}
        >
          <Grid
            item
            xs={12}
            md={4}
            container
            justifyContent='center'
            sx={gridItemStyle}
          >
            <MemberCard
              title='Digital'
              points={basic}
              price='4.99'
              id='subscription-basic'
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            container
            justifyContent='center'
            sx={gridItemStyle}
          >
            <MemberCard
              title='Digital + Print'
              points={select}
              popular
              price='8.99'
              id='subscription-select'
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            container
            justifyContent='center'
            sx={gridItemStyle}
          >
            <MemberCard
              title='Premium'
              points={premium}
              price='23.99'
              id='subscription-premium'
              ps='* Available after 3 months of paid membership.'
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
