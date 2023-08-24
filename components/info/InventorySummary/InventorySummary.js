import { string, oneOf } from 'prop-types'
/**
 * @typedef {string} DisplayVariants
 **/

/**
 * @enum {DisplayVariants}
 */
export const DISPLAY_VARIANTS = {
  SEATS_REMAINING: 'SEATS_REMAINING',
}

/**
 * Displays the seats remaining for a product id. Specify a variant to change the display.
 * @todo: remove this component?
 * @param {string} id
 * @param {DisplayVariants} displayVariant
 * @returns {Component}
 */
const InventorySummary = (/*{ id, displayVariant }*/) => {
  // const { productInventory } = useProductInventory(id)

  // const SeatsRemaining = () => (
  //   <Typography variant='h4' color='#00A77E'>
  //     {productInventory && productInventory.stock > 0 ? (
  //       <>{`ONLY ${productInventory.stock} SEATS REMAINING`}</>
  //     ) : (
  //       <>NO SEATS REMAINING</>
  //     )}
  //   </Typography>
  // )

  // const _renderVariant = () => {
  //   switch (displayVariant) {
  //     case DISPLAY_VARIANTS.SEATS_REMAINING:
  //       return <SeatsRemaining />
  //   }
  // }

  return <div>&nbsp;</div>
  // Commenting out due to Penny's request, will enable later
  /* return (
    <>
      {loading ? (
        <Skeleton
          variant='rect'
          width={'100%'}
          height={'28px'}
          animation={false}
        />
      ) : (
        id && _renderVariant()
      )}
    </>
  ) */
}

export default InventorySummary

InventorySummary.propTypes = {
  id: string,
  displayVariant: oneOf(Object.values(DISPLAY_VARIANTS)),
}

InventorySummary.defaultProps = {
  displayVariant: DISPLAY_VARIANTS.SEATS_REMAINING,
}
