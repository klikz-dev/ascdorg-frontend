import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Typography } from '@mui/material'
import { string, object, bool } from 'prop-types'
import { options } from '../../../const'

/**
 * Component Rich Text from Contentful
 * @param {object} props Component props
 * @param {object} props.item Rich Text Object from Contentful
 * @param {object} props.testId Test Id String
 * @returns {JSX.Element} React JSX
 */
const ComponentRichText = ({
  testId,
  title,
  centerTitle,
  centerBody,
  richTextBody,
}) => {
  return (
    <Box data-testid={testId}>
      {title && (
        <Typography
          variant='h4'
          sx={{
            textAlign: centerTitle ? 'center' : 'initial',
          }}
        >
          {title}
        </Typography>
      )}
      <Typography
        variant='body2'
        sx={{
          textAlign: centerBody ? 'center' : 'initial',
        }}
      >
        {documentToReactComponents(
          richTextBody?.json,
          options(richTextBody?.links)
        )}
      </Typography>
    </Box>
  )
}

ComponentRichText.propTypes = {
  testId: string,
  title: string,
  centerTitle: bool,
  centerBody: bool,
  richTextBody: object,
}

export default ComponentRichText
