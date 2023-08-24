import { Box } from '@mui/material'
import { string } from 'prop-types'

export default function AnchorComponent({ testId = 'anchor-component', id }) {
  return <Box id={id} data-testid={testId} />
}

AnchorComponent.propTypes = {
  testId: string,

  id: string,
}
