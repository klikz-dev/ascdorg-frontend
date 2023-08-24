import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Typography } from '@mui/material'
import { string, oneOfType, object } from 'prop-types'
import { options } from '../../const'

export default function CalloutBlock({ sidelabel, title, body, background }) {
  return (
    <Box display='flex'>
      <Box
        sx={{
          minWidth: '62px',
          bgcolor: 'primary.main',
          color: 'common.white',
          textAlign: 'center',
          '& *': {
            fontWeight: 700,
          },
        }}
        pt={2}
      >
        {sidelabel && <Typography variant='body1'>{sidelabel}</Typography>}
      </Box>
      <Box
        sx={{
          backgroundColor: background || 'common.white',
        }}
        p={3}
      >
        {title && (
          <Box mb={2}>
            <Typography color='#005E47' variant='h3'>
              {title}
            </Typography>
          </Box>
        )}
        <Typography variant='body1'>
          {documentToReactComponents(body?.json, options(body?.links))}
        </Typography>
      </Box>
    </Box>
  )
}

CalloutBlock.propTypes = {
  sidelabel: string,
  title: string,
  body: oneOfType([string, object]),
  background: string,
}
