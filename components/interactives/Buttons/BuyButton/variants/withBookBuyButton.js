import { constSnipcart } from '../../../../../const'

const withBookBuyButton = (
  WrappedComponent,
  book,
  selectedVariantId,
  hasMemberPricing
) => {
  const selectedBookVersion = book.bookVersions.items.find(
    (version) => version.productNumber === selectedVariantId
  )
  const getCartButtonCaptionLabel = (availableDateString) => {
    const becomeAvailable = (availableDateString) => {
      const availableDate = new Date(availableDateString)
      return !isNaN(availableDate) && !(availableDate - new Date() > 0)
    }
    return becomeAvailable(availableDateString)
      ? constSnipcart.BTN_LABEL_ADD
      : constSnipcart.BTN_LABEL_PREORDER
  }

  const cartButtonCaptionLabel = getCartButtonCaptionLabel(
    selectedBookVersion?.dateRelease
  )

  const snipcartData = () => ({
    label: cartButtonCaptionLabel,
    dataItemId: selectedVariantId,
    dataItemName: selectedBookVersion.title,
    dataItemUrl: book.slug,
    dataItemImage: book.thumbnail.imgSrc,
    dataItemDescription: book.description,
    dataItemPrice: hasMemberPricing
      ? selectedBookVersion.priceMember
      : selectedBookVersion.priceNonMember,
    dataItemCustom1Value: selectedBookVersion?.taxJar?.taxJarId || '',
    dataItemCustom2Value: selectedBookVersion.royaltyFlag || false,
    dataItemCustom3Value: book.authors.items.map(
      (author) => author.title + (author.email ? '/' + author.email : '')
    ),
    dataItemCustom4Value:
      cartButtonCaptionLabel === constSnipcart.BTN_LABEL_PREORDER,
    dataItemQuantity: 1,
    digitalFileGuid: selectedBookVersion.digitalFileGuid,
    productReleaseDate: selectedBookVersion.dateRelease,
  })

  return (
    <>
      {selectedBookVersion && (
        <WrappedComponent
          snipcart={snipcartData()}
          sx={{
            bgcolor: 'primary.main',
            color: 'text.secondary',
            border: '2px solid #fff',
            minWidth: { md: '117px' },
            '&:hover': {
              bgcolor: 'hover.main',
              textDecoration: 'underline',
            },
          }}
        />
      )}
    </>
  )
}

export default withBookBuyButton
