export default async (req, res) => {
  let fetchUserResponse
  let fetchUserAccessResponse
  let data
  const { uid } = req.query
  let userData
  try {
    fetchUserResponse = await fetch(
      process.env.NEXT_PUBLIC_PIANO_API_BASE_URL +
        '/publisher/user/get' +
        '?' +
        new URLSearchParams({
          aid: process.env.NEXT_PUBLIC_PIANO_APP_ID,
          api_token: process.env.NEXT_PUBLIC_PIANO_API_KEY,
          uid: uid,
        }),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    data = await fetchUserResponse.json()
    userData = {
      userAccount: {
        ...data,
      },
    }
    userData.userAccount.user.name = userData.userAccount.user.personal_name

    try {
      fetchUserAccessResponse = await fetch(
        process.env.NEXT_PUBLIC_PIANO_API_BASE_URL +
          '/publisher/conversion/list' +
          '?' +
          new URLSearchParams({
            aid: process.env.NEXT_PUBLIC_PIANO_APP_ID,
            api_token: process.env.NEXT_PUBLIC_PIANO_API_KEY,
            uid: uid,
          }),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      data = await fetchUserAccessResponse.json()
      userData.userAccount.access = {
        items: data.conversions,
      }
    } catch (error) {
      console.error('Error fetching piano user access', error)
    }
  } catch (error) {
    console.error('Error fetching piano user', error)
  }

  return res.status(200).json({ status: 'success', data: userData })
}
