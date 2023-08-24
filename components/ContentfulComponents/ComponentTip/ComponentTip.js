import { Box } from '@mui/material'
import { string, shape, object } from 'prop-types'
import CalloutBlock from '../../CalloutBlock'

/**
 * Component Tip from Contentful
 * @param {object} props Component props
 * @param {object} props.item Rich Text Object from Contentful
 * @param {object} props.testId Test Id String
 * @returns {JSX.Element} React JSX
 */
const ComponentTip = ({ testId, title, tipBody }) => {
  return (
    <Box width={['100%', '80%']} data-testid={testId}>
      <CalloutBlock
        sidelabel={title ? '' : 'TIP'}
        title={title}
        body={tipBody}
      />
    </Box>
  )
}

ComponentTip.propTypes = {
  testId: string,
  title: string,
  tipBody: shape({
    json: object,
  }),
}

export default ComponentTip
