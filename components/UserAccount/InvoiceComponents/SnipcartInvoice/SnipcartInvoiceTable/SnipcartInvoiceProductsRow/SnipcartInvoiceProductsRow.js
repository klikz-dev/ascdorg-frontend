import { TableRow, TableCell, Typography } from '@mui/material'
import PropTypes from 'prop-types'

export default function SnipcartInvoiceProductRows({
  testId = 'snipcart-product-row',
  purchaseItem,
  quantity,
  unitPrice,
  productTotal,
  productCode,
}) {
  return (
    <TableRow data-testid={testId}>
      <TableCell data-testid={`${testId}-id`}>{`(${productCode})`}</TableCell>
      <TableCell align='left' data-testid={`${testId}-name`}>
        <Typography variant='body' fontWeight={600}>
          {purchaseItem}
        </Typography>
      </TableCell>
      <TableCell align='right' data-testid={`${testId}-quantity`}>
        {quantity}
      </TableCell>
      <TableCell
        align='right'
        data-testid={`${testId}-unit-price`}
      >{`$${unitPrice?.toFixed(2)}`}</TableCell>
      <TableCell
        align='right'
        data-testid={`${testId}-product-total`}
      >{`$${productTotal?.toFixed(2)}`}</TableCell>
    </TableRow>
  )
}

SnipcartInvoiceProductRows.propTypes = {
  testId: PropTypes.string,
  purchaseItem: PropTypes.string,
  quantity: PropTypes.number,
  unitPrice: PropTypes.number,
  discount: PropTypes.number,
  productTotal: PropTypes.number,
  productCode: PropTypes.string,
  orderDate: PropTypes.string,
}
