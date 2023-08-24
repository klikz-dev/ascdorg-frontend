import { baseUrl } from '../utils'

/**
 * Utility function to post salesforce leads info
 *
 * @param {object} body
 * @return {object}
 */
const postSalesforceLead = async (body) => {
  const response = await fetch(`${baseUrl}/api/post-salesforce-lead`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return await response.json()
}

export default postSalesforceLead
