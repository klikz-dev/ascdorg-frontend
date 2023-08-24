import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import PropTypes from 'prop-types'
import CtaButton from '../../../components/interactives//Buttons/CtaButton'
import { ORDERS } from '../../../const/myaccount-tabs'
import path from '../../../paths/path'

export default function AccountBanner({ title }) {
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'grey.extraLight',
          width: '100%',
          paddingBottom: { xs: (theme) => theme.spacing(7), md: 0 },
          display: 'flex',
          alignItems: 'center',
          background: (theme) =>
            'linear-gradient(to bottom left, grey.extraLight 50%,' +
            alpha(theme.palette.background.light, 0.4) +
            ' 50%)',
          height: { md: 306 },
          borderBottomLeftRadius: { xs: 48, sm: 0, md: 180 },
          padding: { xs: 0 },
        }}
        data-testid={`account-banner`}
      >
        <Container>
          <Typography variant='h3'>Welcome,</Typography>
          <Typography variant='h1'>{title}</Typography>
        </Container>
      </Box>
      <Box mt={1} pr={4} justifyContent='center' display='flex'>
        <CtaButton
          variant='contained'
          color='primary'
          label='Book Order History'
          href={path.account({ slug: ORDERS })}
        />
      </Box>
    </>
  )
}

AccountBanner.propTypes = {
  title: PropTypes.string,
  tab: PropTypes.string,
}
