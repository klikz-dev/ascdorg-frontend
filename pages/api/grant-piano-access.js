export default async (req, res) => {
  const { uid, rid, expire_date } = req.query
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PIANO_API_BASE_URL}/publisher/user/access/grant` +
        '?' +
        new URLSearchParams({
          aid: process.env.NEXT_PUBLIC_PIANO_APP_ID,
          api_token: process.env.NEXT_PUBLIC_PIANO_API_KEY,
          uid: uid,
          rid: rid,
          expire_date: expire_date,
        }),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()
    return res.status(200).json({ status: 'success', data: data })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      status: 500,
      errorSummary: error,
    })
  }
}
