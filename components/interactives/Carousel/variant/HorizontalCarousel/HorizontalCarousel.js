import { useRef, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { string, number, object } from 'prop-types'
import ViewAllCTA from '../../../Buttons/ViewAllCTA'
import CarouselLeftButton from '../../CarouselLeftButton'
import CarouselRightButton from '../../CarouselRightButton'
import HorizontalCards from './HorizontalCards'

export default function HorizontalCarousel({
  testId = 'HorizontalCarousel',
  content,
  title,
  ctaLink,
  ctaLabel,
  ctaTarget,
  scrollByAmount = 4,
  type,
}) {
  const scrollerRef = useRef()

  const [sliderLeftArrow, showSliderLeftArrow] = useState(false)
  const [sliderRightArrow, showSliderRightArrow] = useState(true)

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const isElementVisible = (el) => {
    if (el) {
      const rect = el.getBoundingClientRect()
      const efp = (x, y) => document.elementFromPoint(x, y)

      return el.contains(efp(rect.left, rect.top))
    }
    /** if no element */
    return false
  }

  const slideWidth = () => {
    if (scrollerRef.current.firstElementChild) {
      return scrollerRef.current.firstElementChild.clientWidth * scrollByAmount
    }
    /** return width of 0 if no element */
    return 0
  }

  const goLeft = async () => {
    const el = scrollerRef.current.firstElementChild
    scrollerRef.current.scrollBy({
      left: -slideWidth(),
      top: 0,
      behavior: 'smooth',
    })
    showSliderRightArrow(true)

    await sleep(500)

    if (isElementVisible(el)) {
      showSliderLeftArrow(false)
    }
  }

  const goRight = async () => {
    const el = scrollerRef.current.lastElementChild
    scrollerRef.current.scrollBy({
      left: slideWidth(),
      top: 0,
      behavior: 'smooth',
    })
    showSliderLeftArrow(true)

    await sleep(500)

    if (isElementVisible(el)) {
      showSliderRightArrow(false)
    }
  }

  const setLeftButton = (type) => {
    switch (type) {
      case 'grid':
        return '10px'
      case 'videos':
        return '10px'
      case 'events':
        return '-5px'
      case 'webinars':
        return '10px'
      default:
        return '-10px'
    }
  }

  const setRightButton = (type) => {
    switch (type) {
      case 'grid':
        return '-15px'
      case 'videos':
        return '-12px'
      case 'events':
        return '-13px'
      case 'webinars':
        return '-12px'
      default:
        return '-15px'
    }
  }

  return (
    <Box data-testid={testId}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography component='h2' variant='h4' data-testid={`${testId}-title`}>
          {title}
        </Typography>
        {ctaLink && (
          <ViewAllCTA
            href={ctaLink}
            label={ctaLabel}
            target={ctaTarget}
            testId={testId}
          />
        )}
      </Box>

      <Box
        mt={type === 'events' ? 3 : 1}
        ml={type === 'events' ? 0.5 : -1.25}
        sx={{
          position: 'relative',
          maxWidth: '1600px',
          marginRight: { xs: '-8px', lg: '-16px' },
        }}
      >
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
          <HorizontalCards content={content} type={type} />
        </Grid>
        <Box display='flex' justifyContent='center' alignItems='center' pt={2}>
          <Box
            sx={{
              position: 'absolute',
              top: 'calc(50% - 40px)',
              zIndex: '1px',
              left: { xs: '-10px', md: '-30px' },
            }}
          >
            {sliderLeftArrow && (
              <CarouselLeftButton
                buttonSize={60}
                goLeft={goLeft}
                sxProp={{
                  width: '40px',
                  height: '40px',
                  '& svg': {
                    width: '28px',
                    height: '28px',
                  },
                  marginLeft: `${setLeftButton(type)}`,
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: 'calc(50% - 40px)',
              zIndex: '1px',
              right: { xs: '2px', sm: '-5px' },
            }}
          >
            {sliderRightArrow && (
              <CarouselRightButton
                buttonSize={60}
                goRight={goRight}
                sxProp={{
                  width: '40px',
                  height: '40px',
                  '& svg': {
                    width: '28px',
                    height: '28px',
                  },
                  marginRight: `${setRightButton(type)}`,
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

HorizontalCarousel.propTypes = {
  testId: string,
  content: object,
  title: string,
  ctaLink: string,
  ctaLabel: string,
  ctaTarget: string,
  scrollByAmount: number,
  type: string,
}
