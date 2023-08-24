import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import COOKIE_NAME, { ACTIVATE_COOKIE_NAME } from '../../const/cookie'
import useLocalStorage from './useLocalStorage'

const cookies = new Cookies()

const usePaywall = (article) => {
  const cookieData = cookies.get(COOKIE_NAME)
  const isLoggedIn = !!cookieData
  const isUnlimited =
    !!cookieData?.isPaywallMember ||
    !!cookieData?.isActivateSubscriber ||
    (!isLoggedIn && !!cookies.get(ACTIVATE_COOKIE_NAME))

  const [localHistory, setLocalHistory] = useLocalStorage('paywall', [])
  const [remaining, setRemaining] = useState(0)

  /**
   *
   * @param {Array} articleList - previous history for visiting articles
   * @param {Number} within - days to get visit history within last X days
   * @returns {Array}
   */
  const getHistoryWithin = (articleList, within = 30) =>
    articleList?.filter(
      (item) => item?.visit > Date.now() - within * 24 * 60 * 60 * 1000
    ) || []

  useEffect(() => {
    let updatedHistory = getHistoryWithin(localHistory)
    if (localHistory?.findIndex((item) => item?.slug === article) === -1) {
      updatedHistory = [...updatedHistory, { slug: article, visit: Date.now() }]
    }
    setLocalHistory(updatedHistory)
    setRemaining(
      isLoggedIn ? 5 - updatedHistory?.length : 3 - updatedHistory?.length
    )
  }, [article])

  return {
    remaining,
    isLoggedIn,
    expired: !isUnlimited && remaining < 0 ? true : false,
    isUnlimited,
  }
}

export default usePaywall
