import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import { IconButton } from '@mui/material'
import { func, object, number, bool } from 'prop-types'

export default function CarouselLeftButton({
  goLeft,
  buttonSize,
  sxProp,
  timer,
  setTimer,
  autoScrollFunction,
  autoAdvance,
}) {
  return (
    <>
      <IconButton
        aria-label='slide left'
        onClick={() => {
          goLeft()
          if (autoAdvance) {
            clearInterval(timer)
            setTimer(autoScrollFunction(autoAdvance))
          }
        }}
        size='large'
        sx={{
          width: '42px',
          height: '42px',
          '& svg': {
            width: '30px',
            height: '30px',
          },
          marginLeft: '-21px',
          zIndex: '1',
          color: 'text.primary',
          bgcolor: 'background.light',
          border: '1px solid #C5CED1',
          '&:hover': {
            bgcolor: 'hover.main',
            color: 'text.secondary',
            border: '1px solid #0C8671',
          },
          boxShadow:
            '0px 2px 4px rgba(0, 0, 0, 0.03), 0px 2px 8px rgba(0, 0, 0, 0.04), 0px 3px 3px rgba(0, 0, 0, 0.08)',
          ...sxProp,
        }}
      >
        <KeyboardArrowLeftIcon style={{ fontSize: buttonSize }} />
      </IconButton>
    </>
  )
}

CarouselLeftButton.propTypes = {
  goLeft: func,
  buttonSize: number,
  sxProp: object,
  timer: number,
  setTimer: func,
  autoScrollFunction: func,
  autoAdvance: bool,
}
