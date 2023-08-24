import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { Tooltip, ButtonBase } from '@mui/material'
import { constSnipcart } from '../../const'
import { encodeSnipcartOrderValidationUrl } from '../../lib/utils'

export default function SnipcartButton({
  snipcart,
  className,
  sx,
  onClick = () => null,
}) {
  const description = documentToPlainTextString(snipcart?.dataItemDescription)
  const preorderText = 'Preorder today and we will ship your book on or around '
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }
  const releaseDate = snipcart?.productReleaseDate
    ? !isNaN(Date.parse(snipcart?.productReleaseDate))
      ? snipcart?.productReleaseDate
      : ''
    : ''

  /** same styles as in snipcart.css, but the classname styles
   * are being overriden by the default mui button ones,
   * so adding them directly before any sx prop gives
   * the desired result */
  const snipCartDefaultStyle = {
    minWidth: '104px',
    height: '42px',
    color: '#000',
    backgroundColor: '#fff',
    border: '2px solid rgba(0, 0, 0, 0.2)',
    padding: '6px 16px',
    fontFamily: 'Poppins',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '20px',
    letterSpacing: '0.02em',
    textAlign: 'center',
    cursor: 'pointer',
  }

  return (
    <Tooltip
      title={
        snipcart?.dataItemCustom4Value
          ? releaseDate
            ? preorderText +
              new Date(
                Date.parse(snipcart?.productReleaseDate)
              ).toLocaleDateString('en-US', dateOptions)
            : ''
          : ''
      }
    >
      <ButtonBase
        className={`snipcart-add-item ${className}`}
        sx={{
          ...snipCartDefaultStyle,
          ...sx,
        }}
        data-item-id={snipcart?.dataItemId}
        data-item-price={snipcart?.dataItemPrice}
        data-item-file-guid={snipcart?.digitalFileGuid}
        data-item-taxable={snipcart?.dataItemCustom5Value !== 'workshop'}
        data-item-weight={
          snipcart?.dataItemCustom5Value === 'workshop'
            ? 0
            : snipcart?.dataItemPrice
        }
        data-item-custom1-name='TaxJarCategory'
        data-item-custom1-value={snipcart?.dataItemCustom1Value}
        data-item-custom1-type='hidden'
        data-item-custom1-required='false'
        data-item-custom2-name='RoyaltyFlag'
        data-item-custom2-value={snipcart?.dataItemCustom2Value}
        data-item-custom2-type='hidden'
        data-item-custom2-required='false'
        data-cart-custom2-options='true|false'
        data-item-custom3-name='Authors'
        data-item-custom3-value={snipcart?.dataItemCustom3Value}
        data-item-custom3-type='hidden'
        data-item-custom3-required='false'
        data-item-custom4-name='PreOrder'
        data-item-custom4-value={snipcart?.dataItemCustom4Value}
        data-item-custom4-type='hidden'
        data-item-custom4-required='false'
        data-cart-custom4-options='true|false'
        data-item-custom5-name='ProductType'
        data-item-custom5-value={snipcart?.dataItemCustom5Value}
        data-item-custom5-type='hidden'
        data-item-custom5-required='false'
        data-item-custom6-name='ProductSlug'
        data-item-custom6-value={snipcart?.dataItemCustom6Value}
        data-item-custom6-type='hidden'
        data-item-custom6-required='false'
        data-item-custom7-name='ProductDate'
        data-item-custom7-value={snipcart?.dataItemCustom7Value}
        data-item-custom7-type='hidden'
        data-item-custom7-required='false'
        data-item-url={encodeSnipcartOrderValidationUrl(
          snipcart?.dataItemId,
          snipcart?.dataItemPrice,
          snipcart?.digitalFileGuid,
          snipcart?.dataItemCustom5Value
        )}
        data-item-description={
          snipcart
            ? description.substring(0, description.indexOf('.') + 1)
            : false
        }
        data-item-image={snipcart?.dataItemImage}
        data-item-name={snipcart?.dataItemName}
        data-item-quantity={snipcart?.dataItemQuantity}
        onClick={onClick}
      >
        {snipcart?.label?.indexOf(constSnipcart?.BTN_LABEL_PREORDER) === -1
          ? snipcart?.label
          : '\u26A0 ' + snipcart?.label}
      </ButtonBase>
    </Tooltip>
  )
}
