import { Box, Typography } from '@mui/material'
import Proptypes from 'prop-types'

export default function InvoiceShipping({
  testId = 'invoice-shipping',
  singleLineFormat,
  color = 'black',
  title,
  name,
  email,
  address1,
  address2,
  city,
  state,
  country,
  zip,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: singleLineFormat ? 'row' : 'column',
        'span, h5': {
          pr: 1,
        },
      }}
      data-testid={testId}
    >
      <Typography color={color} variant='h5' data-testid={`${testId}-title`}>
        {title}
      </Typography>
      <Typography color={color} variant='body' data-testid={`${testId}-name`}>
        {name}
      </Typography>
      <Typography color={color} variant='body' data-testid={`${testId}-email`}>
        {email}
      </Typography>
      <Typography
        color={color}
        variant='body'
        data-testid={`${testId}-address1`}
      >
        {address1}
      </Typography>
      <Typography
        color={color}
        variant='body'
        data-testid={`${testId}-address2`}
      >
        {address2}
      </Typography>
      <Typography
        color={color}
        variant='body'
        data-testid={`${testId}-city-state-zip`}
      >
        {city}, {state} {zip}
      </Typography>
      <Typography
        color={color}
        variant='body'
        data-testid={`${testId}-country`}
      >
        {country}
      </Typography>
    </Box>
  )
}

InvoiceShipping.propTypes = {
  testId: Proptypes.string,
  singleLineFormat: Proptypes.bool,
  color: Proptypes.string,
  title: Proptypes.string,
  name: Proptypes.string,
  email: Proptypes.string,
  address1: Proptypes.string,
  address2: Proptypes.string,
  city: Proptypes.string,
  state: Proptypes.string,
  country: Proptypes.string,
  zip: Proptypes.string,
}
