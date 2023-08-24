import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useReactiveVar } from '@apollo/client'
import { MenuBook as MenuBookIcon } from '@mui/icons-material'
import {
  Box,
  Button,
  List,
  ListItem,
  Select,
  MenuItem,
  Typography,
  Link,
} from '@mui/material'
import { string, arrayOf, shape, number, bool, object } from 'prop-types'
import {
  hasMemberBookPriceVar,
  hasPaidMembershipVar,
} from '../../../lib/apollo-client/cache'
import { pathName } from '../../../lib/utils'
import paths from '../../../paths/path'
import ShareButtons from '../../interactives/Buttons/ShareButtons'
import { SnipcartButton } from '../../Snipcart'
import { addItemsToCart } from '../../Snipcart/SnipcartManager'

const InventorySummary = dynamic(() => import('../../info/InventorySummary'), {
  ssr: false,
})
export default function LiveWorkshop({
  slug,
  clockHours,
  variations,
  mediaImg,
  bookCartItems,
  currentVariationId,
}) {
  const router = useRouter()
  const getSelectedVariation = () => {
    if (currentVariationId) {
      const foundVariation = variations?.find(
        (v) =>
          v.variationId?.toLowerCase() === currentVariationId?.toLowerCase()
      )
      return foundVariation || variations[0]
    }
    return variations[0]
  }
  const [otherDates, setOtherDates] = useState(
    getSelectedVariation().variationId
  )
  const [selectedVariation, setSelectedVariation] = useState(
    getSelectedVariation()
  )

  const [sessions, setSessions] = useState([])
  const [variantPrice, setVariantPrice] = useState(0)
  const useMemberPrice = useReactiveVar(hasPaidMembershipVar)
  const useMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)
  const [VariationCartItem, setVariationCartItem] = useState()
  const materialPrice = useMemberBookPrice
    ? bookCartItems.reduce(
        (sum, bookCartItem) => sum + bookCartItem.memberPrice,
        0
      )
    : bookCartItems.reduce(
        (sum, bookCartItem) => sum + bookCartItem.nonMemberPrice,
        0
      )
  const handleChange = (event) => {
    router.push(
      `${pathName()}/${event.target.value?.toLowerCase()}`,
      undefined,
      {
        scroll: false,
        shallow: true,
      }
    )
    setOtherDates(event.target.value)
  }

  const handleRegisterWithBook = () => {
    addItemsToCart([
      VariationCartItem,
      ...bookCartItems.map((bookCartItem) => ({
        ...bookCartItem,
        dataItemPrice: useMemberBookPrice
          ? bookCartItem.memberPrice
          : bookCartItem.nonMemberPrice,
      })),
    ])
  }
  useEffect(() => {
    const currentVariation = variations.find(
      (variation) => variation.variationId === otherDates
    )

    setSelectedVariation(currentVariation)
    setSessions(currentVariation.sessions)
    setVariantPrice(
      useMemberPrice
        ? currentVariation.memberPrice
        : currentVariation.nonMemberPrice
    )

    setVariationCartItem({
      label: `Register Now $${variantPrice}`,
      dataItemId: currentVariation?.variationId,
      dataItemName: currentVariation?.title,
      dataItemImage: mediaImg,
      dataItemPrice: useMemberPrice
        ? currentVariation.memberPrice
        : currentVariation.nonMemberPrice,
      dataItemQuantity: 1,
      dataItemCustom1Value: currentVariation.taxJarId,
      dataItemCustom5Value: 'workshop',
      dataItemCustom6Value: `/workshops/${slug}?variation=${currentVariation?.variationId}`,
      dataItemCustom7Value: `${currentVariation?.sessions[0]?.startDate},  ${currentVariation?.sessions[0]?.startTime} - ${currentVariation?.sessions[0]?.endTime}`,
    })
  }, [otherDates, useMemberPrice])

  if (sessions && sessions[0]) {
    // do nothing
  }
  return (
    <Box
      sx={{
        backgroundColor: 'grey.extraLight',
        padding: '20px',
      }}
    >
      <Typography variant='sessionDate'>Live Workshops</Typography>
      <Typography
        variant='sessionDate'
        sx={{
          fontWeight: 400,
          fontSize: 20,
          lineHeight: '28px',
          letterSpacing: '2%',
        }}
      >
        {sessions.length > 1 ? `${sessions.length} Sessions` : '1 Session'} for{' '}
        {clockHours}
      </Typography>
      <InventorySummary id={selectedVariation?.variationId} />
      <Box
        sx={{
          width: '100%',
          maxWidth: { xs: '592px', sm: 'unset' },
        }}
      >
        <List>
          {sessions.map((session, idx) => {
            return (
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
                  {session.displayTitle || session.title}
                </Typography>
                <Typography variant='sessionDate'>
                  {session.startDate}
                </Typography>
                <Typography variant='h7'>
                  {session.startTime}-{session.endTime}
                </Typography>
              </ListItem>
            )
          })}
        </List>
      </Box>
      <Box display='flex' mt={[2, 3]}>
        {variations.length > 1 && (
          <Select
            sx={{
              width: '136px',
              fontSize: (theme) => theme.typography.pxToRem(13),
              lineHeight: (theme) => theme.typography.pxToRem(18),
              fontWeight: 600,
              marginRight: '16px',
              padding: '0 8px',
              border: 'solid 1px ' + 'text.primary',
              borderRadius: '5px',
              '&::before': {
                content: 'unset',
              },
              '& .MuiSelect-icon': {
                color: 'text.primary',
              },
            }}
            value={otherDates}
            displayEmpty
            onChange={handleChange}
          >
            {variations.map((variation) => (
              <MenuItem
                value={variation.variationId}
                key={variation.variationId}
              >
                <Typography variant='h7'>{variation.dateRange}</Typography>
              </MenuItem>
            ))}
          </Select>
        )}
      </Box>
      <Box display='flex' mt={[2, 3]}>
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
            Required Materials - ${materialPrice.toFixed(2)}
          </Typography>
          {bookCartItems?.map((book, i) => (
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
              {book.dataItemBookName}
            </Typography>
          ))}
        </Box>
      </Box>
      <Box mt={[2, 3]}>
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
            minWidth: { md: '117px' },
            '&:hover': {
              bgcolor: 'hover.main',
              textDecoration: 'underline',
            },
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
            dataItemCustom7Value: `${selectedVariation?.sessions[0]?.startDate},  ${selectedVariation?.sessions[0]?.startTime} - ${selectedVariation?.sessions[0]?.endTime}`,
          }}
        />
      </Box>
      <Box mt={[2, 3]}>
        <Button
          variant='contained'
          color='primary'
          fullWidth
          size='large'
          onClick={handleRegisterWithBook}
        >
          Register Now with Book ${(materialPrice + variantPrice).toFixed(2)}
        </Button>
      </Box>
      <Box mt={[2, 3]} display='flex' justifyContent='center'>
        <Box>
          <ShareButtons url={paths.workshop({ slug: '' })} title={''} />
        </Box>
        <Box display='flex' alignItems='center'>
          <Typography variant='buttonSmall'>SHARE</Typography>
        </Box>
      </Box>
      <Box mt={[2]} display='flex' justifyContent='center'>
        <Typography variant='buttonMedium'>
          Questions?{' '}
          <Link
            sx={{
              fontSize: 14,
              fontWeight: 600,
              lineHeight: '20px',
              color: 'primary.main',
              paddingTop: '5px',
              paddingBottom: '5px',
              width: '100%',
            }}
          >
            Check out our FAQ
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}

LiveWorkshop.propTypes = {
  slug: string,
  clockHours: string,
  mediaImg: string,
  variations: arrayOf(
    shape({
      title: string,
      variationId: string,
      nonMemberPrice: number,
      memberPrice: number,
      taxJarId: string,
      dateRange: string,
      seatsRemaining: number,
      sessions: arrayOf(
        shape({
          title: string,
          sessionId: string,
          startDate: string,
          endTime: string,
        })
      ),
    })
  ),
  currentVariationId: string,
  bookCartItems: arrayOf(
    shape({
      label: string,
      dataItemId: string,
      dataItemName: string,
      dataItemUrl: string,
      dataItemImage: string,
      dataItemDescription: object,
      memberPrice: number,
      nonMemberPrice: number,
      dataItemCustom1Value: string,
      dataItemCustom2Value: bool,
      dataItemCustom3value: arrayOf(string),
      dataItemCustom4Value: bool,
      dataItemQuantity: number,
      digitalFileGuid: string,
      productReleaseDate: string,
    })
  ),
}
