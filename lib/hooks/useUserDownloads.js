import { useEffect, useState } from 'react'
import fetchUserDownloads from '../fetches/fetchUserDownloads'

/**
 * Hook to get product downloads for a specifed user id
 *
 * @param {string} id
 * @return {Object} downloads, getUserDownloads, fetchCompleted
 *
 */
const useUserDownloads = (id) => {
  const [downloads, setDownloads] = useState()
  const [fetchCompleted, setFetchCompleted] = useState()

  const updateUrl = (url) => {
    const pattern = /^(\/\/)/
    if (pattern.test(url) && typeof window !== undefined) {
      return `${window.location.protocol}${url}`
    }
    return url
  }

  const getUserDownloads = async (id) => {
    if (id) {
      setFetchCompleted(false)
      const result = await fetchUserDownloads(id)
      setFetchCompleted(true)
      if (result?.length) {
        const data = result.map((item, index) => {
          return {
            id: `${item?.ProductId}_${index}`, //a product may have multiple file types for download
            date: `${item?.OrderDate}`,
            shortName: `${item?.Description}`,
            url: `${updateUrl(item?.Url)}`,
          }
        })
        setDownloads(data)
      } else {
        setDownloads()
      }
    }
  }

  useEffect(() => {
    getUserDownloads(id)
  }, [id])

  return { downloads, getUserDownloads, fetchCompleted }
}

export default useUserDownloads
