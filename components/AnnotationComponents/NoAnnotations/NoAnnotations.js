import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import { Box, Typography } from '@mui/material'
import { string } from 'prop-types'

export default function NoAnnotations({ message }) {
  return (
    <Box
      m={2}
      p={2}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      textAlign='center'
      sx={{
        height: '248px',
        bgcolor: 'accent.paleGreen',
      }}
    >
      <FormatQuoteIcon style={{ fontSize: '60px', color: '#969696' }} />
      <Typography
        sx={{
          fontSize: '20px',
          fontWeight: 700,
          lineHeight: '24px',
          letterSpacing: '0.2px',
        }}
      >
        You don&apos;t have any
      </Typography>
      <Typography
        sx={{
          fontSize: '20px',
          fontWeight: 700,
          lineHeight: '24px',
          letterSpacing: '0.2px',
        }}
      >
        notes at the moment
      </Typography>
      <Typography
        sx={{
          fontSize: '15px',
          fontWeight: 600,
          lineHeight: '20px',
          letterSpacing: '0.2px',
          color: '#5F5858',
          marginTop: '8px',
        }}
      >
        {message}
      </Typography>
    </Box>
  )
}

NoAnnotations.propTypes = {
  message: string,
}
