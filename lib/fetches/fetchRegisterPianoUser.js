/**
 *
 * @param {string} id
 * @return {object}
 */
const fetchRegisterPianoUser = async (email, firstName, lastName) => {
  let response
  try {
    response = await fetch(
      process.env.NEXT_PUBLIC_PIANO_API_BASE_URL +
        '/publisher/user/register' +
        '?' +
        new URLSearchParams({
          aid: process.env.NEXT_PUBLIC_PIANO_APP_ID,
          api_token: process.env.NEXT_PUBLIC_PIANO_API_KEY,
          email: email,
          first_name: firstName,
          last_name: lastName,
        }),
      {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Registering Piano User Error', error)
  }
  const data = await response.json()
  // If the user gets created or if the user already is registered then return success
  return {
    status: data.code === 0 || data.code === 2000 ? 200 : 500,
    errorSummary: data.message,
  }
}

export default fetchRegisterPianoUser
