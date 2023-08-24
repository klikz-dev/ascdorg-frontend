import { useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Box, IconButton, Typography } from '@mui/material'
import NextImageWrapper from '../images/NextImageWrapper'

export default function ImageCarousel({ images }) {
  const sliderBtnStyle = {
    width: 32,
    height: 32,
    marginLeft: '20px',
    color: 'text.primary',
    backgroundColor: 'background.light',
    border: '1px solid #C5CED1',
    boxShadow:
      '0px 2px 4px rgba(0, 0, 0, 0.03), 0px 2px 8px rgba(0, 0, 0, 0.04), 0px 3px 3px rgba(0, 0, 0, 0.08)',
    '&:hover': {
      backgroundColor: 'hover.main',
      color: 'text.secondary',
      border: '1px solid #0C8671',
    },
    '& svg': {
      width: 28,
      height: 28,
    },
  }
  const [currentImage, setCurrentImage] = useState(0)

  const goLeft = () => {
    setCurrentImage((prevState) =>
      prevState === 0 ? images.length - 1 : prevState - 1
    )
  }

  const goRight = () => {
    setCurrentImage((prevState) =>
      prevState < images.length - 1 ? prevState + 1 : 0
    )
  }

  return (
    <Box>
      <Box boxShadow={10}>
        <NextImageWrapper
          src={images[currentImage]}
          height={428}
          width={307}
          style={{
            padding: 0,
          }}
        />
      </Box>
      <Box display='flex' justifyContent='center' alignItems='center' pt={2}>
        <Box>
          <IconButton
            aria-label='slide left'
            sx={sliderBtnStyle}
            onClick={() => goLeft()}
            size='large'
          >
            <KeyboardArrowLeftIcon style={{ fontSize: 30 }} />
          </IconButton>
        </Box>
        <Box pl={2}>
          <Typography variant='h5'>
            {currentImage + 1} of {images.length}
          </Typography>
        </Box>
        <Box>
          <IconButton
            aria-label='slide right'
            sx={sliderBtnStyle}
            onClick={() => goRight()}
            size='large'
          >
            <KeyboardArrowRightIcon style={{ fontSize: 30 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
