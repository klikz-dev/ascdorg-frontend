import { Box } from '@mui/material'
import { string, arrayOf } from 'prop-types'
import CtaButton from '../../interactives/Buttons/CtaButton'
import ViewAllCTA from '../../interactives/Buttons/ViewAllCTA'

/**
 * Button Link Component from Contentful as Embedded Component
 * @todo: merge other Button Components into this one and deprecate others
 * @param {object} props Component props
 * @param {object} props.item Rich Text Object from Contentful
 * @param {object} props.testId Test Id String
 * @returns {JSX.Element} React JSX
 */
const ButtonLinkComponent = ({
  testId,
  buttonStyle = [],
  id,
  linkLabel,
  linkTarget,
  linkUrl,
  color,
}) => {
  const isChip = buttonStyle?.includes(
    'Shape: Oval (Note: No text underline on hover)'
  )

  const buttonColor = (myColor, buttonStyle) => {
    if (myColor) {
      return myColor
    } else if (
      buttonStyle?.includes('Color: White w/gray border and black text') ||
      buttonStyle?.includes('Color: Light green w/black text') ||
      buttonStyle?.includes('Color: Light gray w/black text') ||
      buttonStyle?.includes('Color: Dark red w/white text')
    ) {
      return 'primary'
    }
  }

  const alignButton = (buttonStyle) => {
    if (
      buttonStyle?.includes('Right') ||
      buttonStyle?.includes('Alignment: Right')
    ) {
      return 'flex-end'
    } else if (
      buttonStyle?.includes('Center') ||
      buttonStyle?.includes('Alignment: Center')
    ) {
      return 'center'
    } else {
      return 'flex-start'
    }
  }

  return buttonStyle?.includes('Text Link w/Arrow (Preset #2)') ? (
    <ViewAllCTA
      testId={`${testId}-button-2`}
      label={linkLabel}
      href={linkUrl}
      target={linkTarget}
      align={alignButton(buttonStyle)}
    />
  ) : (
    <Box pt={3} sx={{ display: 'flex' }}>
      <CtaButton
        id={id}
        testId={testId}
        variant={
          buttonStyle?.includes('Color: White w/gray border and black text')
            ? 'outlined'
            : 'contained'
        }
        size={buttonStyle?.includes('Large') ? 'large' : undefined}
        color={buttonColor(color, buttonStyle)}
        width='auto'
        height='42'
        label={linkLabel}
        target={linkTarget}
        href={linkUrl}
        align={alignButton(buttonStyle)}
        isChip={isChip}
        buttonLinkStyle={buttonStyle}
      />
    </Box>
  )
}

ButtonLinkComponent.propTypes = {
  testId: string,
  id: string,
  buttonStyle: arrayOf(string),
  linkUrl: string,
  linkLabel: string,
  linkTarget: string,
  color: string,
}

export default ButtonLinkComponent
