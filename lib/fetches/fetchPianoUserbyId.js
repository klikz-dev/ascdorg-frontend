import { baseUrl } from '../utils'

/**
 *
 * @param {string} id
 * @return {object}
 */
const fetchPianoUserById = async (uid) => {
  let fetchUserResponse
  try {
    fetchUserResponse = await fetch(
      `${baseUrl}/api/get-piano-user` +
        '?' +
        new URLSearchParams({
          uid: uid,
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

export default fetchPianoUserById
