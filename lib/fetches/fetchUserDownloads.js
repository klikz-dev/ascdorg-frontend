/**
 * Utility function to return an array of downloads from Personify for a given id if success
 *
 * @param {string} id
 * @return {object}
 *
 * todo: log info and/or error
 */
const fetchUserDownloads = async (id) => {
  const credentials = Buffer.from(
    `${process.env.NEXT_PUBLIC_ASCDAPI_USERNAME}:${process.env.NEXT_PUBLIC_ASCDAPI_PASSWORD}`
  ).toString('base64')
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_ASCDAPI_BASE_URL}/downloads/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${credentials}`,
          Accept: 'application/json',
        },
      }
    )
    if (resp.status === 200) {
      return await resp.json()
    } else {
      console.log(`Fetch response status: ${resp.status}`)
      return
    }
  } catch (e) {
    console.log(`Error: ${e.message}`)
    return
  }
}
export default fetchUserDownloads
