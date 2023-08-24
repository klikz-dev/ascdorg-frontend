import { useRef, useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { string, object, number, bool } from 'prop-types'
import CarouselLeftButton from '../../CarouselLeftButton'
import CarouselRightButton from '../../CarouselRightButton'
import SpotlightCards from './SpotlightCards'

export default function SpotlightCarousel({
  testId = 'SpotlightCarousel',
  content,
  type,
  title,
  autoAdvanceFrequency = 8,
  autoAdvance,
}) {
  const scrollerRef = useRef()
  const [timer, setTimer] = useState()

  useEffect(() => {
    setTimer(autoScrollFunction(autoAdvance))
  }, [])

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const slideWidth = () => {
    if (scrollerRef.current.firstElementChild) {
      return scrollerRef.current.firstElementChild.clientWidth
    }
    /** return width of 0 if no element */
    return 0
  }

  const goLeft = async () => {
    scrollerRef.current.scrollBy({
      left: (-scrollerRef.current.scrollLeft % slideWidth()) - slideWidth(),
      top: 0,
      behavior: 'smooth',
    })

    await sleep(500)
  }

  const goRight = async () => {
    if (
      scrollerRef.current.scrollLeft ===
      slideWidth() * (content.length - 1)
    ) {
      scrollerRef.current.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
      return
    }
    scrollerRef.current.scrollBy({
      left: -(scrollerRef.current.scrollLeft % slideWidth()) + slideWidth(),
      top: 0,
      behavior: 'smooth',
    })

    await sleep(500)
  }

  const autoScrollFunction = (autoAdvance) => {
    if (autoAdvance) {
      return setInterval(function () {
        goRight()
      }, autoAdvanceFrequency * 1000)
    } else {
      return null
    }
  }

  const setButtonHeight = (type) => {
    if (type === 'author workshop') {
      return '100px'
    } else if (type === 'quote') {
      return '30px'
    } else {
      return '80px'
    }
  }

  return (
    <Box data-testid={testId}>
      <Box
        sx={{
          position: 'relative',
          maxWidth: '1600px',
          mr: { lg: '-16px' },
        }}
      >
        {title && (
          <Typography
            component='h5'
            variant='h5'
            data-testid={`${testId}-title`}
            sx={{ marginBottom: '10px' }}
          >
            {title}
          </Typography>
        )}
        <Grid
          container
          spacing={2}
          ref={scrollerRef}
          sx={{
            flexWrap: 'nowrap',
            transform: 'translateZ(0)',
            maxWidth: '1600px',
            overflowX: 'scroll',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <SpotlightCards content={content} type={type} />
        </Grid>
        <Box display='flex' justifyContent='center' alignItems='center' pt={2}>
          <Box
            sx={{
              position: 'absolute',
              left: '-10px',
              top: `calc(50% - ${setButtonHeight(type)})`,
              zIndex: 1,
            }}
          >
            <CarouselLeftButton
              buttonSize={60}
              goLeft={goLeft}
              autoScrollFunction={autoScrollFunction}
              autoAdvance={autoAdvance}
              timer={timer}
              setTimer={setTimer}
              sxProp={{
                width: '40px',
                height: '40px',
                '& svg': {
                  width: '28px',
                  height: '28px',
                },
                marginLeft: '-10px',
              }}
            />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              right: '-5px',
              top: `calc(50% - ${setButtonHeight(type)})`,
              zIndex: '1px',
            }}
          >
            <CarouselRightButton
              buttonSize={60}
              goRight={goRight}
              autoScrollFunction={autoScrollFunction}
              autoAdvance={autoAdvance}
              timer={timer}
              setTimer={setTimer}
              sxProp={{
                width: '40px',
                height: '40px',
                '& svg': {
                  width: '28px',
                  height: '28px',
                },
                marginRight: '-15px',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

SpotlightCarousel.propTypes = {
  testId: string,
  content: object,
  type: string,
  title: string,
  autoAdvanceFrequency: number,
  autoAdvance: bool,
}
