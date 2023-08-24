import { NextApiHandler } from 'next'
import { query } from '../../lib/ordersDb'

const handler: NextApiHandler = async (req, res) => {
  const { orderNumber, orderLineNumber, productCode } = req.body

  try {
    if (!orderNumber || !orderLineNumber || !productCode) {
      return res.status(400).json({
        message: 'no product code, order and/or order line number(s)',
      })
    }
    let result: any = await query(
      `UPDATE ORDERS_DETAILS SET ECD_DOWNLOAD_CTR=IFNULL(ECD_DOWNLOAD_CTR, 0) + 1 WHERE Snipcart_Reference_Id = ? AND Order_Line_Number = ? AND Product_Code = ? `,
      [orderNumber, orderLineNumber, productCode]
    )
    if (result?.changedRows > 0) {
      res.status(200).json({ message: 'OK' })
    } else {
      result = await query(
        `UPDATE usr_personify_orders SET ECD_DOWNLOAD_CTR=IFNULL(ECD_DOWNLOAD_CTR, 0) + 1 WHERE ORDER_NO = ? AND ORDER_LINE_NO = ? AND PRODUCT_CODE = ? `,
        [orderNumber, orderLineNumber, productCode]
      )
      if (result?.changedRows > 0) {
        res.status(200).json({ message: 'OK' })
      } else {
        res.status(400).json({ message: 'Bad Request' })
      }
    }
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
