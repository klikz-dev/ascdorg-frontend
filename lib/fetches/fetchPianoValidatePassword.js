/**
 *
 * @param {string} id
 * @return {object}
 */
const fetchPianoValidatePassword = async (email, password) => {
  let response
  try {
    response = await fetch(
      process.env.NEXT_PUBLIC_PIANO_ID_API_BASE_URL +
        '/publisher/identity/login',
      {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.NEXT_PUBLIC_PIANO_API_KEY,
        },
        body: JSON.stringify({
          aid: process.env.NEXT_PUBLIC_PIANO_APP_ID,
          email: email,
          password: password,
        }),
      }
    )
  } catch (error) {
    console.error('Validating Piano User Password Error', error)
  }
  const data = await response.json()
  // If the user gets created or if the user already is registered then return success
  return {
    status: 200,
    validated: data?.access_token !== undefined,
    errorSummary: data?.access_token
      ? 'no errors'
      : data.error_code_list.message,
  }
}

export default fetchPianoValidatePassword
