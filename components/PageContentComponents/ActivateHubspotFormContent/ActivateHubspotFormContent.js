import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import { Box, Divider, Grid, Button, Typography } from '@mui/material'
import HubSpotForm from '../../../components/HubSpotForm'
import { hubspotFormIds } from '../../../const'

export default function ActivateHubSpotFormContent() {
  let hbspt = undefined
  if (typeof window !== 'undefined' && typeof window.hbspt !== 'undefined') {
    hbspt = window.hbspt

    if (hbspt) {
      hbspt.forms.create({
        target: '[id="activateform"]',
        region: 'na1',
        portalId: '8020079',
        formId: '9d7a7496-8391-406c-a4c3-8e93db114c8b',
      })
    }
  }

  return (
    <Box id='free-trial'>
      <Divider />
      <Box py={[5, 10]} px={[1, 1, 3]}>
        <Grid container spacing={1} style={{ justifyContent: 'space-evenly' }}>
          <Grid item xs={12} sm={6} style={{ maxWidth: 325 }}>
            <Box mb={[3, 0]}>
              <Typography variant='h2'>Start your free trial today</Typography>
              <Box mt={3}>
                <Button
                  variant='outlined'
                  color='primary'
                  size='large'
                  onClick={() => {
                    window.location.href =
                      'https://library.ascd.org/m/23462641544790ff/original/ASCD-Activate-Brochure.pdf'
                  }}
                  startIcon={
                    <CloudDownloadIcon
                      color='primary'
                      style={{ marginRight: 8 }}
                    />
                  }
                >
                  Download Brochure
                </Button>
              </Box>
              <Box mt={6}>
                <Box display='flex'>
                  <CheckCircleIcon style={{ color: '#00A77E' }} />
                  <Box ml={1}>
                    <Typography variant='body2'>
                      24-hour on-demand professional development
                    </Typography>
                  </Box>
                </Box>
                <Box display='flex' mt={2}>
                  <CheckCircleIcon style={{ color: '#00A77E' }} />
                  <Box ml={1}>
                    <Typography variant='body2'>
                      All digital: videos, courses, books, articles, webinars,
                      and more
                    </Typography>
                  </Box>
                </Box>
                <Box display='flex' mt={2}>
                  <CheckCircleIcon style={{ color: '#00A77E' }} />
                  <Box ml={1}>
                    <Typography variant='body2'>
                      Comprehensive and robust, covers all subjects
                    </Typography>
                  </Box>
                </Box>
                <Box display='flex' mt={2}>
                  <CheckCircleIcon style={{ color: '#00A77E' }} />
                  <Box ml={1}>
                    <Typography variant='body2'>
                      Evidence and research-based content
                    </Typography>
                  </Box>
                </Box>
                <Box display='flex' mt={2}>
                  <CheckCircleIcon style={{ color: '#00A77E' }} />
                  <Box ml={1}>
                    <Typography variant='body2'>
                      Great for teams that need customizable learning plans
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box pl={[0, 0, 5]}>
              <HubSpotForm formId={hubspotFormIds.ACTIVATE_FORM} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
