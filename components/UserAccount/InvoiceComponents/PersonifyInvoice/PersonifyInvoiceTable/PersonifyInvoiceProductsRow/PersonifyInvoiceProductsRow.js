import { TableRow, TableCell } from '@mui/material'
import PropTypes from 'prop-types'

export default function PersonifyInvoiceProductRows({
  testId = 'personify-product-row',
  purchaseItem,
  quantity,
  unitPrice,
  discount,
  productTotal,
  productCode,
  orderDate,
}) {
  return (
    <TableRow data-testid={testId}>
      <TableCell
        data-testid={`${testId}-product-info`}
      >{`${purchaseItem} - ${orderDate} - (${productCode})`}</TableCell>
      <TableCell align='right' data-testid={`${testId}-quantity`}>
        {quantity}
      </TableCell>
      <TableCell
        align='right'
        data-testid={`${testId}-unit-price`}
      >{`$${unitPrice?.toFixed(2)}`}</TableCell>
      <TableCell
        align='right'
        data-testid={`${testId}-discount`}
      >{`$${discount?.toFixed(2)}`}</TableCell>
      <TableCell
        align='right'
        data-testid={`${testId}-quantity-discount`}
      >{`$${(quantity * discount)?.toFixed(2)}`}</TableCell>
      <TableCell
        align='right'
        data-testid={`${testId}-product-total`}
      >{`$${productTotal?.toFixed(2)}`}</TableCell>
    </TableRow>
  )
}

PersonifyInvoiceProductRows.propTypes = {
  testId: PropTypes.string,
  purchaseItem: PropTypes.string,
  quantity: PropTypes.number,
  unitPrice: PropTypes.number,
  discount: PropTypes.number,
  productTotal: PropTypes.number,
  productCode: PropTypes.string,
  orderDate: PropTypes.string,
}
