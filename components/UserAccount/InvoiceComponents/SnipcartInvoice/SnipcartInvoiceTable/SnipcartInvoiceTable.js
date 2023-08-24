import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import SnipcartInvoiceProductRow from './SnipcartInvoiceProductsRow'

export default function SnipcartInvoiceTable({
  testId = 'snipcart-invoice-table',
  orderDate,
  shipPrice,
  tax,
  total,
  productOrders,
}) {
  return (
    <TableContainer py={3} component={Paper} data-testid={testId}>
      <Table aria-label='spanning table'>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align='right'>Quantity</TableCell>
            <TableCell align='right'>Unit Price</TableCell>
            <TableCell align='right'>Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody data-testid={`${testId}-product-orders`}>
          {productOrders.map(
            ({
              purchaseItem,
              quantity,
              unitPrice,
              productTotal,
              productCode,
            }) => (
              <SnipcartInvoiceProductRow
                testId={`${testId}-product-row`}
                key={`${purchaseItem} - ${orderDate} - (${productCode})`}
                purchaseItem={purchaseItem}
                quantity={quantity}
                unitPrice={unitPrice}
                productTotal={productTotal}
                productCode={productCode}
                orderDate={orderDate}
              />
            )
          )}
          <TableRow>
            <TableCell colSpan={4}>
              <Typography variant='body' fontWeight={600}>
                Subtotal
              </Typography>
            </TableCell>
            <TableCell align='right' data-testid={`${testId}-sub-total-price`}>
              <Typography variant='body' fontWeight={600}>{`$${total?.toFixed(
                2
              )}`}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}>Shipping</TableCell>
            <TableCell
              align='right'
              data-testid={`${testId}-ship-price`}
            >{`$${shipPrice?.toFixed(2)}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}>Tax</TableCell>
            <TableCell
              align='right'
              data-testid={`${testId}-tax`}
            >{`$${tax?.toFixed(2)}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}>
              <Typography variant='body' fontWeight={600}>
                Total
              </Typography>
            </TableCell>
            <TableCell align='right' data-testid={`${testId}-total`}>
              <Typography variant='body' fontWeight={600}>
                {`$${(shipPrice + total + tax)?.toFixed(2)}`}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

SnipcartInvoiceTable.propTypes = {
  testId: PropTypes.string,
  shipPrice: PropTypes.number,
  tax: PropTypes.number,
  total: PropTypes.number,
  productOrders: PropTypes.arrayOf(
    PropTypes.shape({
      purchaseItem: PropTypes.string,
      quantity: PropTypes.number,
      unitPrice: PropTypes.number,
      productTotal: PropTypes.number,
      productCode: PropTypes.string,
    })
  ),
  orderDate: PropTypes.string,
}
