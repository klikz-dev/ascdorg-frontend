import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { arrayOf, string } from 'prop-types'
import NextImageWrapper from '../../../../images/NextImageWrapper'
import CarouselLeftButton from '../../CarouselLeftButton'
import CarouselRightButton from '../../CarouselRightButton'

export default function SingleItemCarousel({ items }) {
  const [currentImage, setCurrentImage] = useState(0)
  if (!items) return null

  const goLeft = () => {
    setCurrentImage((prevState) =>
      prevState === 0 ? items?.length - 1 : prevState - 1
    )
  }

  const goRight = () => {
    setCurrentImage((prevState) =>
      prevState < items?.length - 1 ? prevState + 1 : 0
    )
  }

  return (
    <Box>
      <Box boxShadow={10}>
        <NextImageWrapper
          src={items[currentImage]}
          height={428}
          width={307}
          sx={{
            p: '0px',
          }}
        />
      </Box>
      <Box display='flex' justifyContent='center' alignItems='center' pt={2}>
        <CarouselLeftButton
          goLeft={goLeft}
          buttonSize={30}
          sxProp={{
            width: '32px',
            height: '32px',
            '& svg': {
              width: '28px',
              height: '28px',
            },
          }}
        />
        <Box pl={2}>
          <Typography variant='h5'>
            {currentImage + 1} of {items.length}
          </Typography>
        </Box>
        <CarouselRightButton
          goRight={goRight}
          buttonSize={30}
          sxProp={{
            width: '32px',
            height: '32px',
            '& svg': {
              width: '28px',
              height: '28px',
            },
          }}
        />
      </Box>
    </Box>
  )
}

SingleItemCarousel.propTypes = {
  items: arrayOf(string),
}
