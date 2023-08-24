/**
 *
 * @param {string} id
 * @return {object}
 */
const fetchUpdateOktaUser = async (oktaUid, jsonToUpdate) => {
  let oktaResponse
  try {
    oktaResponse = await fetch(
      process.env.NEXT_PUBLIC_OKTA_API_BASE + '/api/v1/users/' + oktaUid,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `SSWS ${process.env.NEXT_PUBLIC_OKTA_API_TOKEN}`,
        },
        body: JSON.stringify(jsonToUpdate),
      }
    )
  } catch (error) {
    console.log('Updating Okta User Failed', error.message)
    return {
      ok: false,
      message: 'Updating Okta User Failed',
      error: error.message,
    }
  }

  if (oktaResponse?.ok) {
    const newUser = await oktaResponse.json()
    newUser.ok = true
    return newUser
  } else {
    return {
      ok: false,
      message: 'Updating Okta User Failed',
      code: oktaResponse?.status,
    }
  }
}

export default fetchUpdateOktaUser
