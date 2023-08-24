import { useState, Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useReactiveVar } from '@apollo/client'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import LoyaltySharpIcon from '@mui/icons-material/LoyaltySharp'
import { Box, Grid, Divider, Typography } from '@mui/material'
import {
  bool,
  shape,
  string,
  arrayOf,
  array,
  number,
  func,
  object,
} from 'prop-types'
import SnipcartButton from '../../../components/Snipcart/SnipcartButton'
import { constSnipcart } from '../../../const'
import { hasMemberBookPriceVar } from '../../../lib/apollo-client/cache'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import { getCartButtonCaptionLabel } from '../../../lib/utils'
import paths from '../../../paths/path'
import NextImageWrapper from '../../images/NextImageWrapper'
import SingleItemCarousel from '../../interactives/Carousel/variant/SingleItemCarousel'
import FilterDropdown from '../../interactives/FilterDropdown'
import BookBannerPrice from './BookBannerPrice'

/** @todo: testing and storybook */
export default function BookBanner({
  bookVersions,
  thumbnail,
  slug,
  title,
  authors,
  description,
  memberOriginalPrice,
  originalPrice,
  memberDiscountedPrice,
  discountedPrice,
  taxJar,
  items,
  isCollection = false,
  productNumber,
  updateProductNumber,
  showShipping,
  noColor,
}) {
  const router = useRouter()
  const [qty, setQty] = useState(1)
  const [version, setVersion] = useState(
    !isCollection
      ? productNumber
        ? bookVersions.find(
            (version) => version?.productNumber == productNumber
          ) || bookVersions[0]
        : bookVersions[0]
      : ''
  )

  const snipcartBtnStyle = {
    bgcolor: 'primary.main',
    color: 'text.secondary',
    border: '2px solid #fff',
    ml: 1,
    minWidth: { md: '117px' },
    '&:hover': {
      bgcolor: 'hover.main',
      textDecoration: 'underline',
    },
  }

  const hasMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)

  const changeVersion = (productNumber) => {
    const newVersion = bookVersions.find(
      (version) => version.productNumber === productNumber
    )
    updateProductNumber(productNumber)
    setVersion(newVersion)

    router.push(
      {
        pathname: `/books/${slug}`,
        query: { variant: productNumber },
      },
      undefined,
      { shallow: true }
    )
  }

  const imgUrl = contentfulImageTransformation(thumbnail)

  const bookImages = isCollection
    ? [imgUrl].concat(
        items.map((book) => contentfulImageTransformation(book.thumbnail))
      )
    : null

  const cartButtonCaptionLabel = getCartButtonCaptionLabel(version?.dateRelease)

  return (
    <Grid container alignItems='center' spacing={5}>
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {isCollection ? (
          <SingleItemCarousel items={bookImages} />
        ) : (
          <NextImageWrapper
            src={imgUrl}
            alt={`Book banner image for ${thumbnail?.title}`}
            style={{ padding: 0 }}
            width={307}
            height={428}
          />
        )}
      </Grid>
      <Grid
        item
        xs={12}
        md={7}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pl: { sm: 1 },
        }}
      >
        <Box my={1}>
          <Typography variant='h2'>{title}</Typography>
        </Box>
        <Box my={1} display='flex' alignItems='center' flexWrap='wrap'>
          <Box mr={1}>
            {isCollection ? (
              <Link href={paths.search({ types: ['collection'] })}>
                <a>
                  <Typography variant='medium-link' color='#005E47'>
                    {'ASCD Collections'}
                  </Typography>
                </a>
              </Link>
            ) : (
              <Typography variant='body3'>By </Typography>
            )}
          </Box>
          {authors &&
            authors.items?.map((author, key) => (
              <Fragment key={key}>
                <Link href={paths.author({ slug: author.slug })}>
                  <a>
                    <Typography variant='medium-link' color='#005E47'>
                      {`${author.firstName} ${author.lastName}`}
                      {key < authors.items.length - 1 ? ',' : ''}
                    </Typography>
                  </a>
                </Link>
                &nbsp;
              </Fragment>
            ))}
        </Box>
        <Box my={1}>
          <BookBannerPrice
            memberOriginalPrice={memberOriginalPrice}
            originalPrice={originalPrice}
            memberDiscountedPrice={memberDiscountedPrice}
            discountedPrice={discountedPrice}
            isCollection={isCollection}
            version={!isCollection ? version : ''}
            versions={!isCollection ? bookVersions : ''}
            onChange={(pn) => changeVersion(pn)}
            hasMemberBookPrice={hasMemberBookPrice}
          />
        </Box>
        <Box my={1} display='flex' alignItems='center'>
          <FilterDropdown
            items={Array(99)
              .fill('')
              .map((_, i) => {
                return { value: i + 1, label: `${i + 1}` }
              })}
            currentRefinement={qty}
            refine={(filterVal) => setQty(Number(filterVal))}
            customHeight={'40px'}
            customWidth={'65px'}
          />
          {version && (
            <SnipcartButton
              sx={snipcartBtnStyle}
              snipcart={{
                label: cartButtonCaptionLabel,
                dataItemId: version.productNumber,
                dataItemName: version.title,
                dataItemUrl: slug,
                dataItemImage: imgUrl,
                dataItemDescription: description,
                dataItemPrice: hasMemberBookPrice
                  ? version.priceMember
                  : version.priceNonMember,
                dataItemCustom1Value: version?.taxJar?.taxJarId
                  ? version.taxJar.taxJarId
                  : '',
                dataItemCustom2Value: version?.royaltyFlag
                  ? version?.royaltyFlag
                  : false,
                dataItemCustom3Value: authors?.items?.map(
                  (author) =>
                    author.title + (author.email ? '/' + author.email : '')
                ),
                dataItemCustom4Value:
                  cartButtonCaptionLabel === constSnipcart.BTN_LABEL_PREORDER,
                dataItemQuantity: qty,
                digitalFileGuid: version.digitalFileGuid,
                productReleaseDate: version?.dateRelease,
              }}
            />
          )}
          {isCollection && (
            <SnipcartButton
              sx={snipcartBtnStyle}
              snipcart={{
                label: 'Add to Cart',
                dataItemId: productNumber,
                dataItemName: title,
                dataItemUrl: slug,
                dataItemImage: imgUrl,
                dataItemDescription: description,
                dataItemPrice: hasMemberBookPrice
                  ? memberDiscountedPrice
                  : discountedPrice,
                dataItemCustom1Value: taxJar?.taxJarId ? taxJar.taxJarId : '',
                dataItemQuantity: qty,
              }}
            />
          )}
        </Box>
        {showShipping && (
          <Box my={1}>
            <Divider />
            <Box my={1}>
              <Box display='flex' alignItems='center'>
                <Box mr={1}>
                  <LocalShippingIcon
                    sx={{
                      width: '32px',
                      left: '20px',
                      top: '29.49%',
                      bottom: '29.49%',
                      color: '#969696',
                    }}
                  />
                </Box>
                <Box display='inline'>
                  <Box>
                    {' '}
                    <Typography variant='h6'>Ships in 1-3 days</Typography>
                  </Box>
                  <Box
                    sx={{
                      color: noColor ? 'transparent' : '#546366',
                    }}
                  >
                    <Typography variant='caption'>
                      Free shipping on orders over $50
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box my={1}>
              <Box display='flex' alignItems='center'>
                <Box mr={1}>
                  <LoyaltySharpIcon
                    sx={{
                      width: '32px',
                      left: '20px',
                      top: '29.49%',
                      bottom: '29.49%',
                      color: '#969696',
                    }}
                  />
                </Box>
                <Box display='inline'>
                  <Box>
                    {' '}
                    <Typography variant='h6'>Discounts</Typography>
                  </Box>
                  <Box
                    sx={{
                      color: noColor ? 'transparent' : '#546366',
                    }}
                  >
                    <Typography variant='caption'>
                      Buy 15 books, save 35%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Divider />
          </Box>
        )}
        <Typography variant='caption'>
          For 100 or more copies of a single title call 1-800-933-2723 x5773 or
          dial direct 1-703-575-5773.
        </Typography>
      </Grid>
    </Grid>
  )
}

BookBanner.propTypes = {
  bookVersions: array,
  thumbnail: object,
  slug: string,
  title: string,
  authors: shape({
    items: arrayOf(
      shape({
        slug: string,
        firstName: string,
        lastName: string,
      })
    ),
  }),
  description: string,
  memberOriginalPrice: number,
  originalPrice: number,
  memberDiscountedPrice: number,
  discountedPrice: number,
  taxJar: shape({
    taxJarId: string,
  }),
  items: array,
  isCollection: bool,
  productNumber: string,
  updateProductNumber: func,
  showShipping: bool,
  noColor: bool,
}
