import Cookies from 'universal-cookie'
import { COOKIE_NAME } from '../../const'
import { hostnameForCookie } from '../utils'
import fetchPianoUserByEmail from './fetchPianoUsrByEmail'
import fetchRegisterPianoUser from './fetchRegisterPianoUser'

const cookies = new Cookies()
/**
 * Utility function to return a token from Piano
 * https://docs.snipcart.com/v3/api-reference/products
 *
 * @param {string} id
 * @return {object}
 */
const fetchPianoUserToken = async (
  pianoUid,
  email,
  firstName,
  lastName,
  exp
) => {
  // Get piano token from cookie if it exists to avoid api calls
  let cookieData = cookies.get(COOKIE_NAME)
  if (cookieData && pianoUid) {
    const pianoUserInfo = cookieData[pianoUid]
    if (pianoUserInfo?.pt && pianoUserInfo?.expires >= exp) {
      return {
        pianoUid: pianoUid,
        pianoToken: pianoUserInfo.pt,
      }
    }
  }

  // Get piano ID if we only have email
  if (!pianoUid) {
    try {
      const fetchUserResponse = await fetchPianoUserByEmail(email)
      if (fetchUserResponse) {
        pianoUid = fetchUserResponse.uid
      }
    } catch (error) {
      console.error('Error fetching piano user', error)
    }
  }
  // If we dont find user, register user and refetch
  if (!pianoUid) {
    try {
      const fetchRegisterUserResponse = await fetchRegisterPianoUser(
        email,
        firstName,
        lastName
      )
      if (fetchRegisterUserResponse.status === 200) {
        try {
          const fetchUserResponse = await fetchPianoUserByEmail(email)
          if (fetchUserResponse) {
            pianoUid = fetchUserResponse.uid
          }
        } catch (error) {
          console.error('Error fetching piano user', error)
        }
      }
    } catch (error) {
      console.error('Error Registering User', error)
    }
  }

  const req = await fetch(
    process.env.NEXT_PUBLIC_PIANO_ID_API_BASE_URL +
      '/publisher/token' +
      '?' +
      new URLSearchParams({
        aid: process.env.NEXT_PUBLIC_PIANO_APP_ID,
        api_token: process.env.NEXT_PUBLIC_PIANO_API_KEY,
        uid: pianoUid,
      }),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const results = await req.json()
  // prepare the new user data
  const newUserData = {
    [pianoUid]: {
      pt: results.access_token,
      expires: exp,
    },
  }

  // if cookieData exists, update it, otherwise use the newUserData
  const updatedCookieData = cookieData
    ? { ...cookieData, ...newUserData }
    : newUserData

  // Set the updated data into cookies
  cookies.set(COOKIE_NAME, updatedCookieData, {
    path: '/',
    domain: hostnameForCookie,
    expires: new Date(exp * 1000),
  })

  return {
    pianoUid: pianoUid,
    pianoToken: results.access_token,
  }
}

export default fetchPianoUserToken
