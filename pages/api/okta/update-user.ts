import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const { userId, userObj } = req.body

  const userData = await fetch(
    `${process.env.NEXT_PUBLIC_OKTA_API_BASE}/api/v1/users/${userId}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `SSWS ${process.env.NEXT_PUBLIC_OKTA_API_TOKEN}`,
      },
      body: JSON.stringify(userObj),
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
