import { NextApiHandler } from 'next'
import { query } from '../../lib/ordersDb'

const handler: NextApiHandler = async (req, res) => {
  const { emailId } = req.query
  try {
    if (!emailId) {
      return res.status(400).json({ message: 'emailId required' })
    }
    const results = await query(
      `
    select * from viewMyAccountINVOrderHistory
    WHERE BILL_PRIMARY_EMAIL_ADDRESS = '${emailId}'
     `
    )
    res.json(results)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
export default handler
