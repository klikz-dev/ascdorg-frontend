import { useReactiveVar } from '@apollo/client'
import { Grid } from '@mui/material'
import { hasMemberBookPriceVar } from '../../../../../lib/apollo-client/cache'
import CartTile from '../../../../TileComponents/CartTile'

export default function CollectionCard({ items }) {
  const hasMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)
  return items.map(
    ({
      memberOriginalPrice,
      originalPrice,
      memberDiscountedPrice,
      discountedPrice,
      productNumber,
      memberBook,
      title,
      slug,
      thumbnail,
      description,
      taxJar,
    }) => (
      <Grid item key={productNumber} sx={{ paddingBottom: `30px !important` }}>
        <CartTile
          variant='collection'
          memberOriginalPrice={memberOriginalPrice}
          originalPrice={originalPrice}
          memberDiscountedPrice={memberDiscountedPrice}
          discountedPrice={discountedPrice}
          memberBook={memberBook}
          hasMemberBookPrice={hasMemberBookPrice}
          snipcart={{
            label: 'Add to Cart',
            dataItemId: productNumber,
            dataItemName: title,
            dataItemUrl: slug,
            dataItemImage: thumbnail,
            dataItemDescription: description,
            dataItemPrice: hasMemberBookPrice
              ? memberDiscountedPrice
              : discountedPrice,
            dataItemCustom1Value: taxJar.taxJarId || '',
          }}
        />
      </Grid>
    )
  )
}
