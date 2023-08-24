import { useReactiveVar } from '@apollo/client'
import { Grid } from '@mui/material'
import { constSnipcart } from '../../../../../const'
import { hasMemberBookPriceVar } from '../../../../../lib/apollo-client/cache'
import { getCartButtonCaptionLabel } from '../../../../../lib/utils'
import paths from '../../../../../paths/path'
import CartTile from '../../../../TileComponents/CartTile'

export default function SearchBookCard({ items }) {
  const hasMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)
  if (!items) return null
  return items?.map(
    (
      {
        priceMember,
        priceNonmember,
        memberDiscountedPrice,
        discountedPrice,
        bookFilter,
        authorInfo,
        dateTimeStamp,
        productNumber,
        title,
        author,
        description,
        url,
        thumbnail,
        taxJarId,
        royaltyFlag,
        digitalFileGuid,
      },
      idx
    ) => {
      function slugConfig(slug) {
        if (slug?.startsWith('/books/')) {
          return slug.replace('/books/', '')
        }
        return paths.books({ slug: slug })
      }
      return (
        <Grid
          item
          key={idx}
          sx={{
            paddingBottom: '30px !important',
          }}
        >
          <CartTile
            memberOriginalPrice={priceMember}
            originalPrice={priceNonmember}
            memberDiscountedPrice={memberDiscountedPrice}
            discountedPrice={discountedPrice}
            memberBook={bookFilter?.includes('Member Books')}
            author={authorInfo}
            snipcart={{
              label: getCartButtonCaptionLabel(dateTimeStamp),
              dataItemId: productNumber,
              dataItemName: title,
              dataItemAuthors: {
                items: author?.map((author) => ({ title: author })),
              },
              dataItemUrl: slugConfig(url),
              dataItemImage: thumbnail
                ? thumbnail
                : '/images/ASCDImageFiller.png',
              dataItemDescription: description,
              dataItemPrice: hasMemberBookPrice ? priceMember : priceNonmember,
              dataItemCustom1Value: taxJarId ? taxJarId : '',
              dataItemCustom2Value: royaltyFlag ? royaltyFlag : '',
              dataItemCustom3Value: authorInfo,
              dataItemCustom4Value:
                getCartButtonCaptionLabel(dateTimeStamp) ===
                constSnipcart.BTN_LABEL_PREORDER,
              digitalFileGuid: digitalFileGuid,
              productReleaseDate: dateTimeStamp,
            }}
          />
        </Grid>
      )
    }
  )
}
