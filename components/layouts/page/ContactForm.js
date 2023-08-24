import { Box } from '@mui/material'
import HubSpotForm from '../../../components/HubSpotForm'
import hubspotFormIds from '../../../const/hubspot-form-ids'

export default function ContactForm() {
  return (
    <Box pt={0} pb={10} px={[2, 10]}>
      <HubSpotForm formId={hubspotFormIds.CONTACT_FORM} />
    </Box>
  )
}
