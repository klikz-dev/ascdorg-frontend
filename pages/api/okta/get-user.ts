import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const { userId } = req.query
  const userData = await fetch(
    `https://${process.env.NEXT_PUBLIC_OKTA_DOMAIN}/api/v1/users/${userId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `SSWS ${process.env.NEXT_PUBLIC_OKTA_API_TOKEN}`,
      },
      redirect: 'follow',
    }
  )

  const user = await userData.json()

  if (userData.status !== 200) {
    return res.status(500).send(user)
  } else {
    return res.status(200).send(user)
  }
}

export default handler
