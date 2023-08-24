import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  try {
    const tokenResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_SALESFORCE_URL
      }/services/oauth2/token?${new URLSearchParams({
        grant_type: 'client_credentials',
        client_secret: `${process.env.NEXT_PUBLIC_SALESFORCE_CLIENT_SECRET}`,
        client_id: `${process.env.NEXT_PUBLIC_SALESFORCE_CLIENT_ID}`,
      })}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }
    )
    const { access_token: accessToken } = await tokenResponse.json()
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SALESFORCE_URL}/services/data/v58.0/sobjects/Lead`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      }
    )
    const data = await response.json()
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }
}

export default handler
