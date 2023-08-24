import { Box, Typography } from '@mui/material'
import { string } from 'prop-types'

export default function PdfIframe({ title, pdf, testId = 'PdfIframe' }) {
  const pdfUrl = pdf?.startsWith('//') ? pdf?.substring(2) : pdf
  const url = 'https://docs.google.com/gview?embedded=true&url=' + pdfUrl

  return (
    <Box
      sx={{
        minHeight: '800px',
        width: '100%',
        bgcolor: 'grey.extraLight',
      }}
      data-testid={testId}
    >
      <Box
        mt={5}
        px={3}
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        sx={{
          width: '100%',
          height: '76px',
          bgcolor: 'primary.main',
          color: 'common.white',
        }}
      >
        <Box data-testid={`${testId}-title`}>
          <Typography variant='subtitle1'>{title}</Typography>
        </Box>
      </Box>
      <Box data-testid={`${testId}-pdf`}>
        <Box
          component='object'
          sx={{
            minHeight: '800px',
            width: '100%',
            backgroundColor: 'grey.extraLight',
          }}
          data={url}
          aria-label={'pdf object'}
          type='application/pdf'
        />
      </Box>
    </Box>
  )
}

PdfIframe.propTypes = {
  title: string,
  pdf: string,
  testId: string,
}
