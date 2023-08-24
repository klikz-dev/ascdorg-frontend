/**
 *
 * @param {string} id
 * @return {object}
 */
const fetchPianoUserByEmail = async (email) => {
  let fetchUserResponse
  try {
    fetchUserResponse = await fetch(
      process.env.NEXT_PUBLIC_PIANO_ID_API_BASE_URL +
        '/publisher/users/get' +
        '?' +
        new URLSearchParams({
          aid: process.env.NEXT_PUBLIC_PIANO_APP_ID,
          api_token: process.env.NEXT_PUBLIC_PIANO_API_KEY,
          email: email,
        }),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return await fetchUserResponse.json()
  } catch (error) {
    console.error('Error fetching piano user', error)
  }
}

export default fetchPianoUserByEmail
