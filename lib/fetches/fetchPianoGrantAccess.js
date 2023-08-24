import { baseUrl } from '../utils'
/**
 *
 * @param {string} uid - piano user id
 * @param {string} rid - piano resource id
 * @param {string} expire_date - piano expire date in unix timestamp
 */
const fetchPianoGrantAccess = async (uid, rid, expire_date) => {
  let response
  try {
    response = await fetch(
      `${baseUrl}/api/grant-piano-access` +
        '?' +
        new URLSearchParams({
          uid: uid,
          rid: rid,
          expire_date: expire_date,
        }),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error(error)
  }
  return await response.json()
}

export default fetchPianoGrantAccess
