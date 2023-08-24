import { string, object, bool } from 'prop-types'
import SnipcartButton from '../../../Snipcart/SnipcartButton'
import { withBookBuyButton } from './variants'

/**
 *
 *
 */
const BuyButton = ({ selectedVariantId, data, hasMemberPricing }) => {
  const getVariant = () => {
    switch (data.__typename) {
      case 'Book':
        return withBookBuyButton(
          SnipcartButton,
          data,
          selectedVariantId,
          hasMemberPricing
        )
    }
  }

  return <>{data && <>{getVariant()}</>}</>
}
export default BuyButton

BuyButton.propTypes = {
  label: string,
  selectedVariantId: string,
  data: object,
  hasMemberPricing: bool,
}
