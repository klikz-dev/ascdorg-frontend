import { useRef, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import algoliasearch from 'algoliasearch'
/**@todo when out of experimental use react InstantSearch hooks https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react-hooks/*/
import { string, number, bool, arrayOf } from 'prop-types'
import { InstantSearch, connectHits, Configure } from 'react-instantsearch-dom'
import { algoliaAppId, algoliaSearchApiKey } from '../../../../../lib/algolia'
import { createFilterQuery } from '../../../../../lib/utils'
import ViewAllCTA from '../../../Buttons/ViewAllCTA'
import CarouselLeftButton from '../../CarouselLeftButton'
import CarouselRightButton from '../../CarouselRightButton'
import SearchCards from './SearchCards'

const searchClient = algoliasearch(algoliaAppId, algoliaSearchApiKey)

export default function SearchCarousel({
  testId = 'SearchCarousel',
  indexName,
  topics,
  type,
  dateLowerRange,
  dateUpperRange,
  keywords,
  authors,
  title,
  ctaLink,
  ctaLabel,
  ctaTarget,
  featured,
  scrollByAmount = 1,
  elArticleType,
  premium,
  memberBook,
  quickRead,
}) {
  const scrollerRef = useRef()

  const [sliderLeftArrow, showSliderLeftArrow] = useState(false)
  const [sliderRightArrow, showSliderRightArrow] = useState(true)

  /** React Hooks must be called before conditional rendering */
  if (!indexName) return null

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

  return (
    <Box data-testid={`${testId}`}>
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
        mt={type === 'event' ? 2.5 : 1}
        ml={type === 'event' ? -0.5 : -1.25}
        sx={{
          position: 'relative',
          maxWidth: '1600px',
          mr: { lg: '-8px' },
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
          <InstantSearch searchClient={searchClient} indexName={indexName}>
            <Configure
              filters={createFilterQuery(
                [type],
                topics,
                keywords,
                authors,
                dateLowerRange,
                dateUpperRange,
                featured,
                elArticleType,
                premium,
                memberBook,
                quickRead
              )}
              hitsPerPage={12}
            />
            <CustomHits />
          </InstantSearch>
        </Grid>
        <Box display='flex' justifyContent='center' alignItems='center' pt={2}>
          <Box
            sx={{
              position: 'absolute',
              _left: '-8px',
              get left() {
                return this._left
              },
              set left(value) {
                this._left = value
              },
              top: 'calc(50% - 40px)',
              zIndex: '1px',
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
                    width: '25px',
                    height: '25px',
                  },
                  marginLeft: type === 'event' ? '-28px' : '-10px',
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              position: 'absolute',
              right: '-8px',
              top: 'calc(50% - 40px)',
              zIndex: '1px',
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
                    width: '25px',
                    height: '25px',
                  },
                  marginRight: type === 'event' ? '-10px' : '-15px',
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const CustomHits = connectHits(SearchCards)

SearchCarousel.propTypes = {
  testId: string,
  indexName: string,
  topics: string,
  type: string,
  dateLowerRange: string,
  dateUpperRange: string,
  keywords: arrayOf(string),
  authors: arrayOf(string),
  title: string,
  ctaLink: string,
  ctaLabel: string,
  ctaTarget: string,
  featured: bool,
  scrollByAmount: number,
  elArticleType: string,
  premium: bool,
  memberBook: string,
  quickRead: bool,
}
