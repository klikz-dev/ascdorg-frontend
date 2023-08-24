import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button, Box } from '@mui/material'
import { node, string, bool, object, func, arrayOf } from 'prop-types'

export default function CtaButton({
  testId,
  label,
  onclick,
  id = '',
  href,
  variant = 'contained',
  size,
  color = 'primary',
  underlined = false,
  fullWidth = false,
  target,
  styles,
  children,
  align = 'flex-start',
  isChip,
  buttonLinkStyle = [],
}) {
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)

  const usedForWitsbyTrial = () => {
    return !href && !target && !id
  }

  const WitsbyTrialComponent = usedForWitsbyTrial()
    ? dynamic(
        () =>
          import('../../../../components/WitsbyTrialModal/WitsbyTrialModal'),
        { ssr: false }
      )
    : null

  const popUpOnClick = () => {
    window.open(`${href}`, 'popup', 'width=480,height=640')
    return false
  }

  const colorMapHover = {
    'light-green-w/black-text': ['rgba(0, 0, 0, 0.12)', 'text.primary'],
    'light-gray-w/black-text': ['accent.paleGreen', 'text.primary'],
    'dark-red-w/white-text': ['#BE1D3F', 'text.secondary'],
  }

  const colorMapDefault = {
    'light-gray-w/black-text': ['rgba(0, 0, 0, 0.12)', 'text.primary'],
    'light-green-w/black-text': ['accent.paleGreen', 'text.primary'],
    'dark-red-w/white-text': ['#A61E3B', 'text.secondary'],
  }

  const buttonColor = (colors) => {
    const style = buttonLinkStyle.find((s) => s.startsWith('Color:'))
    if (!style) {
      return {}
    }
    const colorType = style.substring(7).toLowerCase().replace(/ /g, '-')
    const [backgroundColor, color] = colors[colorType] || []

    return {
      ...(backgroundColor ? { backgroundColor } : {}),
      ...(color ? { color } : {}),
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: align,
      }}
      data-testid={testId}
    >
      <Button
        variant={variant}
        size={size}
        color={color}
        onClick={() =>
          onclick
            ? onclick()
            : target === 'popup'
            ? popUpOnClick()
            : usedForWitsbyTrial()
            ? setOpen(true)
            : null
        }
        sx={{
          textDecoration: underlined ? 'underline' : 'none',
          whiteSpace: 'nowrap',
          '&:hover': {
            textDecoration: isChip ? 'none' : 'underline',
            ...buttonColor(colorMapHover),
          },
          borderRadius: isChip ? 8 : 0,
          ...buttonColor(colorMapDefault),
        }}
        href={href}
        fullWidth={fullWidth}
        id={id}
        target={target}
        style={styles}
        data-testid={`${testId}-button`}
      >
        {label || children}
      </Button>
      {open && WitsbyTrialComponent && (
        <WitsbyTrialComponent handleClose={handleClose} showButton={true} />
      )}
    </Box>
  )
}

CtaButton.propTypes = {
  children: node,
  testId: string,
  label: string,
  onclick: func,
  id: string,
  href: string,
  variant: string,
  size: string,
  color: string,
  underlined: bool,
  fullWidth: bool,
  target: string,
  styles: object,
  align: string,
  isChip: bool,
  buttonLinkStyle: arrayOf(string),
}
