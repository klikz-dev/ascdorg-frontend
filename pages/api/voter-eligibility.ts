import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query
  try {
    if (!id) {
      return res.status(400).json({ message: '`id` required' })
    }
    const results = await query(
      `
    SELECT *
    FROM Voter_Eligibility
    WHERE Master_Customer_Id = ?
    `,
      id
    )
    res.json(results)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
export default handler
