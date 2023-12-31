import { useEffect } from 'react'
import { Box } from '@mui/material'
import { string } from 'prop-types'

/**
 * Creates a Hubspot form based on the provided form id.
 *
 * @param {string} formId - The Hubspot form id.
 * @return {Component}
 */
export default function HubSpotForm({ formId, testId = 'hubspot-form' }) {
  const elementId = `hubform-${formId}`

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.hbspt !== 'undefined') {
      // prevent duplicate forms from being created
      if (!document.querySelector(`#${elementId} iframe`)) {
        window.hbspt.forms.create({
          target: `[id=${elementId}]`,
          region: 'na1',
          portalId: '8020079',
          formId: formId,
        })
      }
    }
  }, [])

  return <Box id={elementId} mt={2} data-testid={testId} />
}

HubSpotForm.propType = {
  formId: string,
  testId: string,
}
