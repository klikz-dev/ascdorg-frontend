import { useReactiveVar } from '@apollo/client'
import { Grid } from '@mui/material'
import { constSnipcart } from '../../../../../const'
import { hasMemberBookPriceVar } from '../../../../../lib/apollo-client/cache'
import { getCartButtonCaptionLabel } from '../../../../../lib/utils'
import CartTile from '../../../../TileComponents/CartTile'

export default function BookCard({ items }) {
  const hasMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)
  if (!items) return null
  return items?.map(
    ({
      bookVersions,
      memberOriginalPrice,
      originalPrice,
      memberDiscountedPrice,
      discountedPrice,
      memberBook,
      slug,
      thumbnail,
      authors,
      description,
    }) => {
      return bookVersions?.items?.map(
        ({
          dateRelease,
          productNumber,
          title,
          priceMember,
          priceNonMember,
          taxJar,
          royaltyFlag,
          digitalFileGuid,
        }) => {
          const cartButtonCaptionLabel = getCartButtonCaptionLabel(dateRelease)
          return (
            <Grid
              item
              key={productNumber}
              sx={{
                paddingBottom: '30px !important',
              }}
            >
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
                  dataItemAuthors: authors,
                  dataItemUrl: slug,
                  dataItemImage: thumbnail
                    ? thumbnail
                    : '/images/ASCDImageFiller.png',
                  dataItemDescription: description,
                  dataItemPrice: hasMemberBookPrice
                    ? priceMember
                    : priceNonMember,
                  dataItemCustom1Value: taxJar?.taxJarId || '',
                  dataItemCustom2Value: royaltyFlag ? royaltyFlag : false,
                  dataItemCustom3Value: authors?.items?.map(
                    (author) =>
                      author?.title + (author?.email ? '/' + author?.email : '')
                  ),
                  dataItemCustom4Value:
                    cartButtonCaptionLabel === constSnipcart.BTN_LABEL_PREORDER,
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
