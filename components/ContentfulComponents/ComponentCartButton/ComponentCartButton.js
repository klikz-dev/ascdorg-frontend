import { useReactiveVar } from '@apollo/client'
import { constSnipcart } from '../../../const'
import { hasMemberBookPriceVar } from '../../../lib/apollo-client/cache'
import { contentfulImageTransformation } from '../../../lib/data-transformations'
import { getCartButtonCaptionLabel } from '../../../lib/utils'
import { SnipcartButton } from '../../Snipcart'

const ComponentCartButton = ({
  slug,
  thumbnail,
  authors,
  productNumber,
  title,
  priceMember,
  priceNonMember,
  taxJar,
  digitalFileGuid,
  royaltyFlag,
  description,
  dateRelease,
}) => {
  const hasMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)
  const cartButtonCaptionLabel = getCartButtonCaptionLabel(dateRelease)
  const snipcart = {
    label: dateRelease ? cartButtonCaptionLabel : 'Add to Cart',
    dataItemId: productNumber,
    dataItemName: title,
    dataItemAuthors: authors?.items,
    dataItemUrl: slug,
    dataItemImage: contentfulImageTransformation(thumbnail),
    dataItemDescription: description,
    dataItemPrice: hasMemberBookPrice ? priceMember : priceNonMember,
    dataItemCustom1Value: taxJar || '',
    dataItemCustom2Value: !!royaltyFlag,
    dataItemCustom3Value: authors?.items?.map(
      (author) => author?.title + (author?.email ? '/' + author?.email : '')
    ),
    ...(dateRelease
      ? {
          dataItemCustom4Value:
            cartButtonCaptionLabel === constSnipcart.BTN_LABEL_PREORDER,
        }
      : {}),
    digitalFileGuid: digitalFileGuid,
    ...(dateRelease ? { productReleaseDate: dateRelease } : {}),
  }

  return (
    <SnipcartButton
      sx={{
        bgcolor: 'primary.main',
        color: 'text.secondary',
        // margin: { xs: '2px 0', md: 0 },
        width: 'unset',
        mr: '24px',
        border: 'none',
        height: '40px',
        minWidth: '117px',
        padding: '0px 16px',
        fontSize: '14px',
        fontWeight: '600',
        lineHeight: '24px',
        letterSpacing: '0.02em',
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'hover.main',
          textDecoration: 'underline',
        },
      }}
      snipcart={snipcart}
    />
  )
}

export default ComponentCartButton
