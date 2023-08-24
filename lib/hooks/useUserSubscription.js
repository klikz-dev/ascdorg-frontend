import { useEffect, useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import USER_SUBSCRIPTION_BYID_QUERY from '../../lib/schema/userSubscriptionById.graphql'
import { userAccountIdVar } from '../apollo-client/cache'
import { subscriptionInfoToMembershipData } from '../data-transformations'

/**
 * Manages the user access data retrieval
 *
 * @returns {Object}
 */
const useUserSubscription = () => {
  const userId = useReactiveVar(userAccountIdVar)
  const { loading, data } = useQuery(USER_SUBSCRIPTION_BYID_QUERY, {
    variables: { userId: userId },
    skip: !userId,
  })
  const [userName, setUserName] = useState('')
  const [membershipName, setMembershipName] = useState('')
  const [autoRenew, setAutoRenew] = useState(false)
  const [expireDate, setExpireDate] = useState('')
  const [price, setPrice] = useState()
  const [period, setPeriod] = useState('')
  const [membershipKeyword, setMembershipKeyword] = useState('')
  const [subscriptionId, setSubscriptionId] = useState('')
  useEffect(() => {
    if (data?.subscription?.items) {
      const {
        userName: _userName,
        membershipName: _membershipName,
        autoRenew: _autoRenew,
        expireDate: _expireDate,
        price: _price,
        period: _period,
        membershipKeyword: _membershipKeyword,
        subscription_id,
      } = subscriptionInfoToMembershipData(data?.subscription?.items)
      setUserName(_userName)
      setMembershipName(_membershipName)
      setAutoRenew(_autoRenew)
      setExpireDate(_expireDate)
      setPrice(_price)
      setPeriod(_period)
      setMembershipKeyword(_membershipKeyword)
      setSubscriptionId(subscription_id)
    }
  }, [data])

  return {
    loading,
    userName,
    membershipName,
    autoRenew,
    expireDate,
    price,
    period,
    membershipKeyword,
    subscriptionId,
  }
}

export default useUserSubscription
