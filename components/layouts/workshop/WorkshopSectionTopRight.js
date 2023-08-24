import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useReactiveVar } from '@apollo/client'
import { MenuBook as MenuBookIcon } from '@mui/icons-material'
import {
  Box,
  List,
  ListItem,
  Select,
  MenuItem,
  Typography,
} from '@mui/material'
import { string, number, shape, arrayOf } from 'prop-types'
import DisplayTime from '../../../components/info/DisplayTime'
import {
  hasMemberBookPriceVar,
  hasPaidMembershipVar,
} from '../../../lib/apollo-client/cache'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import {
  formatDateToCalendarLong,
  formatDateToTime,
  formatDateRangeToCalendarShort,
  pathName,
} from '../../../lib/utils'
import paths from '../../../paths/path'
import ShareButtons from '../../interactives/Buttons/ShareButtons'
import { SnipcartButton } from '../../Snipcart'

const InventorySummary = dynamic(() => import('../../info/InventorySummary'), {
  ssr: true,
})

/**
 * @todo: move this out of layouts as this is not a layout
 */

export default function WorkshopSectionTopRight({
  spotlightImage,
  variations,
  slug,
  title,
  materials,
  clockHours,
  selectedVariationId,
}) {
  /**
   * @todo find a more reusable solution for this
   */
  const mediaImg = contentfulImageTransformation(spotlightImage)

  const router = useRouter()

  const getSelectedVariation = (variationId) => {
    const variation = variationId
      ? variations?.items?.find(
          (v) => v?.variationId?.toLowerCase() === variationId?.toLowerCase()
        )
      : variations?.items[0]

    return variation || variations?.items[0]
  }

  const getMultipleProductDate = (items) => {
    const productDates = items?.map((item) =>
      getProductDate(
        item?.startDatetime?.slice(0, -6),
        item?.endDatetime?.slice(0, -6)
      )
    )
    return productDates?.join(', ')
  }
  const getProductDate = (startDate, endDate) =>
    `${formatDateToCalendarLong(startDate)} ${formatDateToTime(
      startDate
    )} - ${formatDateToCalendarLong(endDate)} ${formatDateToTime(
      endDate
    )} U.S Eastern Time`

  const [selectedVariation, setSelectedVariation] = useState(
    getSelectedVariation(selectedVariationId)
  )

  const handleChangeVariation = (event) => {
    setSelectedVariation(getSelectedVariation(event.target.value))
    if (
      !pathName()
        ?.toLowerCase()
        .includes(selectedVariation?.variationId.toLowerCase())
    ) {
      router.push(
        `/workshops/${slug}/${selectedVariation?.variationId.toLowerCase()}`,
        undefined,
        {
          scroll: false,
          shallow: true,
        }
      )
    }
  }

  const useMemberPrice = useReactiveVar(hasPaidMembershipVar)
  const useMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)

  const RequiredMaterials = () => {
    return (
      <>
        {materials?.items.length > 0 && (
          <>
            <MenuBookIcon
              sx={{
                fontSize: '15px',
                marginRight: '8px',
              }}
            />
            <Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: '20px',
                }}
              >
                {`Required Materials - $${materialsPrice.toFixed(2)}`}
              </Typography>
              {materials?.items?.map((item, i) => (
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    lineHeight: '20px',
                    color: 'primary.main',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    width: '100%',
                  }}
                  key={i}
                >
                  {item.title}
                </Typography>
              ))}
            </Box>
          </>
        )}
      </>
    )
  }

  const getSelectedVariantPrice = () =>
    selectedVariation
      ? useMemberPrice
        ? selectedVariation.memberPrice
        : selectedVariation.nonMemberPrice
      : 0
  const [variantPrice, setVariantPrice] = useState(getSelectedVariantPrice())
  const [materialsPrice, setMaterialsPrice] = useState(0)

  useEffect(() => {
    if (selectedVariation) {
      setVariantPrice(getSelectedVariantPrice())
    }
  }, [selectedVariation, useMemberPrice])

  useEffect(() => {
    if (selectedVariation) {
      const getMaterialsPrice = () => {
        if (materials?.items.length > 0) {
          return materials?.items.reduce((sum, item) => {
            let itemSum = 0
            switch (item['__typename']) {
              case 'Book':
                itemSum = item.bookVersions.items.reduce(
                  (sum, bookVersion) =>
                    sum +
                    (useMemberBookPrice
                      ? bookVersion.priceMember
                      : bookVersion.priceNonMember),
                  0
                )
                break
            }
            return sum + itemSum
          }, 0)
        }
        return 0
      }
      setMaterialsPrice(getMaterialsPrice())
    }
  }, [useMemberBookPrice])

  return (
    <>
      {selectedVariation ? (
        <Box
          sx={{
            bgcolor: 'grey.extraLight',
            padding: '20px',
          }}
        >
          <Typography variant='sessionDate'>Live Workshops - </Typography>
          <Typography
            variant='sessionDate'
            sx={{
              fontWeight: 400,
              fontSize: 20,
              lineHeight: '28px',
              letterSpacing: '2%',
            }}
          >
            {selectedVariation.sessions.items.length > 1
              ? `${selectedVariation.sessions.items.length} Sessions`
              : '1 Session'}{' '}
            for {`${clockHours} Clock Hours`}
          </Typography>
          <InventorySummary id={selectedVariation?.variationId} />
          <Box
            sx={{
              width: '100%',
              maxWidth: { xs: 'unset', sm: '592px' },
            }}
          >
            <List>
              {selectedVariation.sessions.items.map((session, idx) => (
                <ListItem
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    padding: '20px 0',
                    borderBottom: '1px',
                    borderBottomColor: 'text.primary',
                    '&:last-child': {
                      borderBottom: 'none',
                    },
                  }}
                >
                  <Typography variant='body3'>
                    {session?.displayTitle || session?.title}
                  </Typography>
                  <Typography variant='sessionDate'>
                    {formatDateToCalendarLong(session?.startDatetime)}
                  </Typography>
                  <DisplayTime
                    startTime={session?.startDatetime}
                    endTime={session?.endDatetime}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box display='flex' mt={[2, 3]}>
            {variations.items.length > 1 && (
              <Select
                sx={{
                  width: '136px',
                  fontSize: (theme) => theme.typography.pxToRem(13),
                  lineHeight: (theme) => theme.typography.pxToRem(18),
                  fontWeight: '600',
                  marginRight: '16px',
                  padding: '0 8px',
                  border: '1px',
                  borderColor: 'text.primary',
                  borderRadius: '5px',
                  '&::before': {
                    content: 'unset',
                  },
                  '& .MuiSelect-icon': {
                    color: 'text.primary',
                  },
                }}
                value={selectedVariation?.variationId}
                displayEmpty
                onChange={handleChangeVariation}
              >
                {variations.items.map((variation) => (
                  <MenuItem
                    value={variation?.variationId}
                    key={variation?.variationId}
                  >
                    <Typography variant='h7'>
                      {formatDateRangeToCalendarShort(
                        variation?.sessions.items[0].startDatetime,
                        variation?.sessions.items[
                          variation?.sessions.items.length - 1
                        ].startDatetime
                      )}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            )}
          </Box>
          <Box display='flex' mt={[2, 3]}>
            <RequiredMaterials />
          </Box>
          <Box mt={[2, 3]}>
            {variantPrice > 0 && (
              <SnipcartButton
                sx={{
                  bgcolor: 'primary.main',
                  color: 'text.secondary',
                  width: '100%',
                  height: 'min-content',
                  padding: '10px',
                  fontSize: (theme) => theme.typography.pxToRem(16),
                  lineHeight: (theme) => theme.typography.pxToRem(24),
                  fontWeight: '600',
                  letterSpacing: '0.2px',
                  '&:hover': {
                    bgcolor: 'hover.main',
                    textDecoration: 'underline',
                  },
                  minWidth: { md: '117px' },
                }}
                snipcart={{
                  label: `Register Now $${variantPrice?.toFixed(2)}`,
                  dataItemId: selectedVariation?.variationId,
                  dataItemName: selectedVariation?.title,
                  dataItemImage: mediaImg,
                  dataItemPrice: variantPrice,
                  dataItemQuantity: 1,
                  dataItemCustom1Value: selectedVariation?.taxJarId,
                  dataItemCustom5Value: 'workshop',
                  dataItemCustom6Value: `/workshops/${slug}?variation=${selectedVariation?.variationId}`,
                  dataItemCustom7Value: getMultipleProductDate(
                    selectedVariation?.sessions?.items
                  ),
                }}
              />
            )}
          </Box>
          {/* <Box mt={[2, 3]}>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              size='large'
              onClick={handleRegisterWithBook}
            >
              Register Now with Book $
              {(materialsPrice + variantPrice).toFixed(2)}
            </Button>
          </Box> */}
          <Box mt={[2, 3]} display='flex' justifyContent='center'>
            <Box>
              <ShareButtons
                url={paths.workshop({ slug: slug })}
                title={title}
              />
            </Box>
            <Box display='flex' alignItems='center' ml={1}>
              <Typography variant='buttonSmall'>SHARE</Typography>
            </Box>
          </Box>
          <Box mt={[2]} display='flex' justifyContent='center'>
            <Typography variant='buttonMedium'>
              Questions?{' '}
              <Link href={'/faq?service=Virtual%20Author%20Workshops'}>
                <a>
                  <Typography variant='medium-link' color='#005E47'>
                    {'Check out our FAQ'}
                  </Typography>
                </a>
              </Link>
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            bgcolor: 'grey.extraLight',
            padding: '20px',
          }}
        >
          <Typography variant='sessionDate'>
            Live Workshops - COMING SOON
          </Typography>
        </Box>
      )}
    </>
  )
}

WorkshopSectionTopRight.propTypes = {
  slug: string,
  title: string,
  clockHours: string,
  spotlightImage: shape({
    imageContentful: shape({ url: string }),
    imageBynder: arrayOf(shape({ src: string })),
  }),
  materials: shape({
    items: arrayOf(
      shape({
        title: string,
        versions: shape({
          items: arrayOf(
            shape({
              bookVersion: shape({
                priceMember: number,
                priceNonMember: number,
              }),
            })
          ),
        }),
      })
    ),
  }),
  variations: shape({
    items: arrayOf(
      shape({
        title: string,
        variationId: string,
        nonMemberPrice: number,
        memberPrice: number,
        taxJarId: string,
        dateRange: string,
        seatsRemaining: number,
        sessions: shape({
          title: string,
          sessionId: string,
          startDate: string,
          endTime: string,
        }),
      })
    ),
  }),

  selectedVariationId: string,
}
