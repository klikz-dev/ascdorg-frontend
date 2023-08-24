import { Box } from '@mui/material'
import { string } from 'prop-types'
import CtaButton from '../../interactives/Buttons/CtaButton'

/**
 * @deprecated please use ButtonLinkComponent
 * @todo: merge content with ButtonLinkComponent
 * @param {object} props Component props
 * @param {object} props.item Rich Text Object from Contentful
 * @param {object} props.testId Test Id String
 * @returns {JSX.Element} React JSX
 */
const ComponentButton = ({ testId, label, url }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        textAlign: 'center',
      }}
      data-testid={testId}
    >
      <Box
        pt={3}
        sx={{
          width: { xs: '100%', md: 'auto' },
          paddingRight: { md: 3 },
          '& a': {
            justifyContent: 'center !important',
          },
          '& button': {
            width: '100%',
          },
        }}
        pr={[0, 2]}
      >
        <CtaButton
          variant='contained'
          color='primary'
          width='100%'
          height='42'
          label={label}
          href={url}
        />
      </Box>
    </Box>
  )
}

ComponentButton.propTypes = {
  testId: string,
  label: string,
  url: string,
}

export default ComponentButton
