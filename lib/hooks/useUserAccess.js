import { useEffect, useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import USER_ACCESS_BYID_QUERY from '../../lib/schema/userAccessById.graphql'
import { userAccountIdVar } from '../apollo-client/cache'
import { accessInfoToMembershipData } from '../data-transformations'

/**
 * Manages the user access data retrieval
 *
 * @returns {Object}
 */
const useUserAccess = () => {
  const { loading, data } = useQuery(USER_ACCESS_BYID_QUERY, {
    variables: { userId: useReactiveVar(userAccountIdVar) },
  })
  const [userName, setUserName] = useState('')
  const [membershipName, setMembershipName] = useState('')
  const [autoRenew, setAutoRenew] = useState(false)
  const [expireDate, setExpireDate] = useState('')
  const [price, setPrice] = useState()
  const [period, setPeriod] = useState('')
  const [membershipKeyword, setMembershipKeyword] = useState('')
  useEffect(() => {
    if (data?.access?.items) {
      const {
        userName: _userName,
        membershipName: _membershipName,
        autoRenew: _autoRenew,
        expireDate: _expireDate,
        price: _price,
        period: _period,
        membershipKeyword: _membershipKeyword,
      } = accessInfoToMembershipData(data?.access?.items)
      setUserName(_userName)
      setMembershipName(_membershipName)
      setAutoRenew(_autoRenew)
      setExpireDate(_expireDate)
      setPrice(_price)
      setPeriod(_period)
      setMembershipKeyword(_membershipKeyword)
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
  }
}

export default useUserAccess
