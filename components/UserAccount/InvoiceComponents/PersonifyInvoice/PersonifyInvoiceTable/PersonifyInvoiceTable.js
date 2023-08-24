import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import PropTypes from 'prop-types'
import PersonifyInvoiceProductRow from './PersonifyInvoiceProductsRow'

export default function PersonifyInvoiceTable({
  testId = 'personify-invoice-table',
  tax,
  shipPrice,
  orderDate,
  total,
  productOrders,
}) {
  return (
    <TableContainer py={3} component={Paper} data-testid={testId}>
      <Table aria-label='spanning table'>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align='right'>Qty.</TableCell>
            <TableCell align='right'>Unit Price</TableCell>
            <TableCell align='right'>Unit Discount</TableCell>
            <TableCell align='right'>Adjustment</TableCell>
            <TableCell align='right'>Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody data-testid={`${testId}-product-orders`}>
          {productOrders.map(
            ({
              purchaseItem,
              quantity,
              unitPrice,
              discount,
              productTotal,
              productCode,
            }) => (
              <PersonifyInvoiceProductRow
                testId={`${testId}-product-row`}
                key={`${purchaseItem} - ${orderDate} - (${productCode})`}
                purchaseItem={purchaseItem}
                quantity={quantity}
                unitPrice={unitPrice}
                discount={discount}
                productTotal={productTotal}
                productCode={productCode}
                orderDate={orderDate}
              />
            )
          )}
          <TableRow>
            <TableCell rowSpan={3} colSpan={3} />
            <TableCell colSpan={2}>Shipping</TableCell>
            <TableCell
              align='right'
              data-testid={`${testId}-ship-price`}
            >{`$${shipPrice?.toFixed(2)}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Tax</TableCell>
            <TableCell
              align='right'
              data-testid={`${testId}-tax`}
            >{`$${tax?.toFixed(2)}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell
              align='right'
              data-testid={`${testId}-total-price`}
            >{`$${(total + tax + shipPrice)?.toFixed(2)}`}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

PersonifyInvoiceTable.propTypes = {
  testId: PropTypes.string,
  tax: PropTypes.number,
  total: PropTypes.number,
  shipPrice: PropTypes.number,
  productOrders: PropTypes.arrayOf(
    PropTypes.shape({
      purchaseItem: PropTypes.string,
      quantity: PropTypes.number,
      unitPrice: PropTypes.number,
      discount: PropTypes.number,
      productTotal: PropTypes.number,
      productCode: PropTypes.string,
    })
  ),
  orderDate: PropTypes.string,
}
