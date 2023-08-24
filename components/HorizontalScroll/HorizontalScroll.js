import { useRef, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import dateFormat from 'dateformat'
import {
  string,
  oneOfType,
  arrayOf,
  object,
  bool,
  number,
  shape,
} from 'prop-types'
import { constSnipcart } from '../../const'
import { hasMemberBookPriceVar } from '../../lib/apollo-client/cache'
import { contentfulImageTransformation } from '../../lib/data-transformations'
import { getCartButtonCaptionLabel } from '../../lib/utils'
import ViewAllCTA from '../interactives/Buttons/ViewAllCTA'
import CartTile from '../TileComponents/CartTile'
import IssueTile from '../TileComponents/IssueTile/IssueTile'

export default function HorizontalScroll({
  testId = 'horizontal-scroll',
  title,
  ctaLabel,
  ctaLink,
  ctaTarget,
  items,
  type,
}) {
  const hasMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)

  const scrollerRef = useRef()

  //To refactor later to acheve proper show/hide arrows logic
  const [sliderLeftArrow, showSliderLeftArrow] = useState(false)
  const [sliderRightArrow, showSliderRightArrow] = useState(true)

  const gridItemStyle = {
    paddingBottom: `30px !important`,
  }

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
      const childWidth = scrollerRef.current.firstElementChild.clientWidth
      const containerWidth = scrollerRef.current.clientWidth
      const containerLeftPadding = parseFloat(
        window
          .getComputedStyle(scrollerRef.current)
          .getPropertyValue('padding-left')
      )
      const scrollwidth = containerWidth - (childWidth + containerLeftPadding)
      return scrollwidth
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

  const sliderItems = items?.slice(0, 12)

  const _renderSliderLeft = () => {
    if (sliderLeftArrow) {
      return (
        <Box
          sx={{
            position: 'absolute',
            left: { xs: '-22px', md: '-30px' },
            top: type === 'carttile' ? 'calc(50% - 50px)' : 'calc(50% - 68px)',
            zIndex: '1',
          }}
        >
          <IconButton
            aria-label='slide left'
            sx={{
              width: '40px',
              height: '40px',
              marginLeft: '20px',
              color: 'text.primary',
              bgcolor: 'background.light',
              border: '1px solid #C5CED1',
              boxShadow:
                '0px 2px 4px rgba(0, 0, 0, 0.03), 0px 2px 8px rgba(0, 0, 0, 0.04), 0px 3px 3px rgba(0, 0, 0, 0.08)',
              '&:hover': {
                backgroundColor: 'hover.main',
                color: 'text.secondary',
                border: '1px solid #0C8671',
              },
              '& svg': {
                width: '28px',
                height: '28px',
              },
            }}
            onClick={() => goLeft()}
            size='large'
          >
            <KeyboardArrowLeftIcon style={{ fontSize: 65 }} />
          </IconButton>
        </Box>
      )
    } else {
      return
    }
  }

  const _renderSliderRight = () => {
    if (sliderRightArrow) {
      return (
        <Box
          sx={{
            position: 'absolute',
            right: { xs: '2px', sm: '-5px', md: '-25px' },
            top: type === 'carttile' ? 'calc(50% - 50px)' : 'calc(50% - 68px)',
            zIndex: '1',
            display: {
              xs: items?.length > 2 ? 'block' : 'none',
              md: items?.length > 4 ? 'block' : 'none',
            },
          }}
        >
          <IconButton
            aria-label='slide right'
            sx={{
              width: '40px',
              height: '40px',
              marginLeft: '20px',
              color: 'text.primary',
              bgcolor: 'background.light',
              border: '1px solid #C5CED1',
              boxShadow:
                '0px 2px 4px rgba(0, 0, 0, 0.03), 0px 2px 8px rgba(0, 0, 0, 0.04), 0px 3px 3px rgba(0, 0, 0, 0.08)',
              '&:hover': {
                backgroundColor: 'hover.main',
                color: 'text.secondary',
                border: '1px solid #0C8671',
              },
              '& svg': {
                width: '28px',
                height: '28px',
              },
            }}
            onClick={() => goRight()}
            size='large'
          >
            <KeyboardArrowRightIcon style={{ fontSize: 65 }} />
          </IconButton>
        </Box>
      )
    } else {
      return
    }
  }

  const _renderCartTile = (items) => {
    return items
      ?.filter((item) => !!item)
      ?.map(
        ({
          bookVersions,
          memberOriginalPrice,
          originalPrice,
          memberDiscountedPrice,
          discountedPrice,
          memberBook,
          authors,
          slug,
          thumbnail,
          description,
        }) => {
          return bookVersions?.items?.map(
            ({
              productNumber,
              dateRelease,
              title,
              priceMember,
              priceNonMember,
              taxJar,
              royaltyFlag,
              digitalFileGuid,
            }) => {
              const cartButtonCaptionLabel =
                getCartButtonCaptionLabel(dateRelease)
              return (
                <Grid item key={productNumber} sx={gridItemStyle}>
                  <CartTile
                    memberOriginalPrice={memberOriginalPrice}
                    originalPrice={originalPrice}
                    memberDiscountedPrice={memberDiscountedPrice}
                    discountedPrice={discountedPrice}
                    memberBook={memberBook}
                    snipcart={{
                      label: cartButtonCaptionLabel,
                      dataItemId: productNumber,
                      dataItemName: title,
                      dataItemAuthors: authors.items,
                      dataItemUrl: slug,
                      dataItemImage: contentfulImageTransformation(thumbnail),
                      dataItemDescription: description,
                      dataItemPrice: hasMemberBookPrice
                        ? priceMember
                        : priceNonMember,
                      dataItemCustom1Value: taxJar || '',
                      dataItemCustom2Value: !!royaltyFlag,
                      dataItemCustom3Value: authors?.items?.map(
                        (author) =>
                          author.title +
                          (author.email ? '/' + author.email : '')
                      ),
                      dataItemCustom4Value:
                        cartButtonCaptionLabel ===
                        constSnipcart.BTN_LABEL_PREORDER,
                      digitalFileGuid: digitalFileGuid,
                      productReleaseDate: dateRelease,
                    }}
                  />
                </Grid>
              )
            }
          )
        }
      )
  }

  const _renderCollectionTile = (items) => {
    return items.map(
      ({
        productNumber,
        memberOriginalPrice,
        originalPrice,
        discountedPrice,
        memberDiscountedPrice,
        title,
        slug,
        thumbnail,
        description,
        taxJar,
      }) => (
        <Grid item key={productNumber} sx={gridItemStyle}>
          <CartTile
            variant='collection'
            memberOriginalPrice={memberOriginalPrice}
            originalPrice={originalPrice}
            memberDiscountedPrice={memberDiscountedPrice}
            discountedPrice={discountedPrice}
            hasMemberBookPrice={hasMemberBookPrice}
            snipcart={{
              label: 'Add to Cart',
              dataItemId: productNumber,
              dataItemName: title,
              dataItemUrl: slug,
              dataItemImage: contentfulImageTransformation(thumbnail),
              dataItemDescription: description,
              dataItemPrice: hasMemberBookPrice
                ? memberDiscountedPrice
                : discountedPrice,
              dataItemCustom1Value: taxJar || '',
            }}
          />
        </Grid>
      )
    )
  }

  const _renderIssueTile = (items) => {
    return items.map(
      ({ issueNo, slug, thumbnail, alternate, publicationDate, volNo }) => (
        <Grid item key={issueNo} sx={gridItemStyle}>
          <IssueTile
            slug={slug}
            imageUrl={contentfulImageTransformation(thumbnail)}
            title={alternate}
            publicationDate={publicationDate}
            volNo={volNo}
            issueNo={issueNo}
          />
        </Grid>
      )
    )
  }

  const _renderBookOrIssueTile = (items) => {
    return items.map((item) => {
      if (item?.__typename === 'Book') {
        return item.bookVersions?.map((version) => {
          const cartButtonCaptionLabel = getCartButtonCaptionLabel(
            version.dateRelease
          )
          return (
            <Grid item key={version.productNumber} sx={gridItemStyle}>
              <CartTile
                memberOriginalPrice={item?.memberOriginalPrice}
                originalPrice={item?.originalPrice}
                memberDiscountedPrice={item?.memberDiscountedPrice}
                discountedPrice={item?.discountedPrice}
                memberBook={item?.memberBook}
                snipcart={{
                  label: cartButtonCaptionLabel,
                  dataItemId: version.productNumber,
                  dataItemName: version.title,
                  dataItemAuthors: item?.authors?.items,
                  dataItemUrl: item.slug,
                  dataItemImage: contentfulImageTransformation(item.thumbnail),
                  dataItemDescription: item.description,
                  dataItemPrice: hasMemberBookPrice
                    ? version.priceMember
                    : version.priceNonMember,
                  dataItemCustom1Value: version?.taxJar ? version.taxJar : '',
                  dataItemCustom2Value: version?.royaltyFlag
                    ? version?.royaltyFlag
                    : false,
                  dataItemCustom3Value: item.authors.items?.map(
                    (author) =>
                      author.title + (author.email ? '/' + author.email : '')
                  ),
                  dataItemCustom4Value:
                    cartButtonCaptionLabel === constSnipcart.BTN_LABEL_PREORDER,
                  digitalFileGuid: version.digitalFileGuid,
                  productReleaseDate: version.dateRelease,
                }}
              />
            </Grid>
          )
        })
      } else if (item?.__typename === 'Pubissue') {
        const cartButtonCaptionLabel = getCartButtonCaptionLabel(
          item?.bookVersion?.dateRelease
        )
        return (
          <Grid item key={item.issueNo} sx={gridItemStyle}>
            <CartTile
              variant='pubissue'
              publicationDate={dateFormat(
                item?.publicationDate || 0 + 'T00:00:00',
                'UTC:mmmm yyyy'
              )}
              showCart={!!item?.bookVersion} //show cart button if true
              snipcart={{
                label: cartButtonCaptionLabel,
                dataItemId: item?.bookVersion?.productNumber,
                dataItemName: item?.bookVersion?.title || item?.title,
                dataItemUrl: item.slug,
                dataItemImage: contentfulImageTransformation(item.thumbnail),
                dataItemDescription: item.pubissueDesc,
                dataItemPrice: hasMemberBookPrice
                  ? item?.bookVersion?.priceMember
                  : item?.bookVersion?.priceNonMember,
                dataItemCustom1Value: item?.bookVersion?.taxJar || '',
                dataItemCustom2Value: item?.bookVersion?.royaltyFlag || false,
                dataItemCustom4Value:
                  cartButtonCaptionLabel === constSnipcart.BTN_LABEL_PREORDER,
                digitalFileGuid: item?.bookVersion?.digitalFileGuid,
                productReleaseDate: item?.bookVersion?.dateRelease,
              }}
            />
          </Grid>
        )
      } else {
        return null
      }
    })
  }

  return (
    <>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        data-testid={testId}
      >
        <Typography component='h2' variant='h4' data-testid={`${testId}-title`}>
          {title}
        </Typography>
        {ctaLink && (
          <ViewAllCTA href={ctaLink} label={ctaLabel} target={ctaTarget} lg />
        )}
      </Box>

      <Box
        mt={1}
        ml={-1.25}
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
            flexWrap: 'nowrap !important',
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
          {type === 'carttile' && _renderCartTile(sliderItems)}
          {type === 'issuetile' && _renderIssueTile(sliderItems)}
          {type === 'collectiontile' && _renderCollectionTile(sliderItems)}
          {type === 'resourcetile' && _renderBookOrIssueTile(sliderItems)}
        </Grid>
        {_renderSliderLeft()}
        {_renderSliderRight()}
      </Box>
    </>
  )
}

HorizontalScroll.propTypes = {
  testId: string,
  title: string,
  ctaLabel: string,
  ctaLink: string,
  ctaTarget: string,
  type: string,
  items: oneOfType([
    arrayOf(
      shape({
        issueNo: number,
        slug: string,
        thumbnail: object,
        alternate: string,
        publicationDate: string,
        volNo: string,
      })
    ),
    arrayOf(
      shape({
        bookVersions: arrayOf(
          shape({
            dateRelease: string,
            productNumber: string,
            title: string,
            priceMember: string,
            priceNonMember: string,
            taxJar: string,
            royaltyFlag: bool,
            digitalFileGuid: string,
          })
        ),
        memberOriginalPrice: string,
        originalPrice: string,
        memberDiscountedPrice: string,
        discountedPrice: string,
        memberBook: string,
        slug: string,
        authors: arrayOf(
          shape({
            title: string,
            email: string,
          })
        ),
        thumbnail: object,
        description: object,
      })
    ),
    arrayOf(
      shape({
        productNumber: string,
        memberOriginalPrice: string,
        originalPrice: string,
        memberDiscountedPrice: string,
        discountedPrice: number,
        memberBook: string,
        title: string,
        slug: string,
        thumbnail: object,
        description: object,
        taxJar: string,
      })
    ),
  ]),
}
