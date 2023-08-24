import { baseUrl } from '../utils'

/**
 * Utility function to fetch salesforce leads info
 *
 * @param {string} nextRecord
 * @return {object}
 */
const fetchSalesforceLeads = async (nextRecord) => {
  const nRString = nextRecord
    ? `?${new URLSearchParams({
        nextRecord,
      })}`
    : ''
  const response = await fetch(
    `${baseUrl}/api/get-salesforce-leads${nRString}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  return await response.json()
}

export default fetchSalesforceLeads
