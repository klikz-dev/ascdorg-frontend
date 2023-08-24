import { useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import Cookies from 'universal-cookie'
import { COOKIE_NAME } from '../../const'
import {
  validatePaidMembership,
  hasMemberBookPrice,
  hasVoteEligibilty,
  hasELSubscription,
  hasActivateSubscription,
  hasPaywallMembership,
} from '../../lib/access-validator'
import {
  pianoUserAccount,
  pianoUserLoading,
  hasPaidMembershipVar,
  hasMemberBookPriceVar,
  hasVoteEligibiltyVar,
  hasELSubscriptionVar,
  hasActivateSubscriptionVar,
  hasPaywallMembershipVar,
} from '../../lib/apollo-client/cache'
import { hostnameForCookie } from '../utils'

const cookies = new Cookies()

/**
 * Manages the user account data retrieval and updating of related user account information.
 * This hook is triggered by a reactive variable being updated.
 *
 * @returns {Object}
 */
const useUserAccount = () => {
  const loading = useReactiveVar(pianoUserLoading)
  const userAccount = useReactiveVar(pianoUserAccount)

  const [masterCustomerId, setMasterCustomerId] = useState()
  const [membershipType, setMembershipType] = useState()

  useEffect(() => {
    const getMasterCustomerId = () => {
      const results = userAccount?.user?.custom_fields?.filter((field) => {
        return field.fieldName === 'master_customer_id'
      })
      return results?.length > 0 ? results[0]?.value : undefined
    }

    const getMembershipType = () => {
      const results = userAccount?.access?.items?.filter((item) => item.granted)
      return results?.length > 0 ? results[0]?.term?.name : undefined
    }

    let existingCookie = cookies.get(COOKIE_NAME)
    const isPaidMember = validatePaidMembership(userAccount?.access?.items)
    if (isPaidMember !== hasPaidMembershipVar()) {
      hasPaidMembershipVar(isPaidMember)
    }

    const isPaywallMember = hasPaywallMembership(userAccount?.access?.items)

    if (isPaywallMember !== hasPaywallMembershipVar()) {
      hasPaywallMembershipVar(isPaywallMember)
    }

    const isMembeBookPrice = hasMemberBookPrice(userAccount?.access?.items)
    if (isMembeBookPrice !== hasMemberBookPriceVar()) {
      hasMemberBookPriceVar(isMembeBookPrice)
    }

    const isActivateSubscriber = hasActivateSubscription(userAccount?.user)
    if (isActivateSubscriber !== hasActivateSubscriptionVar()) {
      hasActivateSubscriptionVar(isActivateSubscriber)
    }

    //update cookie for paywall check
    if (
      existingCookie &&
      existingCookie['isPaywallMember'] === undefined &&
      existingCookie['isActivateSubscriber'] === undefined
    ) {
      existingCookie['isPaywallMember'] = isPaywallMember
      existingCookie['isActivateSubscriber'] = isActivateSubscriber
      cookies.set(COOKIE_NAME, existingCookie, {
        path: '/',
        domain: hostnameForCookie,
      })
    }
    const isELSubscriber = hasELSubscription(userAccount?.access?.items)
    if (isELSubscriber !== hasELSubscriptionVar()) {
      hasELSubscriptionVar(isELSubscriber)
    }

    const isVoteEligible = hasVoteEligibilty(
      userAccount?.access?.items
        ? userAccount?.access?.items.filter((i) => i.user_access.granted)
        : userAccount?.access?.items
    )
    if (isVoteEligible !== hasVoteEligibiltyVar()) {
      hasVoteEligibiltyVar(isVoteEligible)
    }
    setMasterCustomerId(getMasterCustomerId())
    setMembershipType(getMembershipType())
  }, [userAccount])

  return {
    loading,
    userAccount: userAccount,
    userAccountUser: userAccount && {
      ...userAccount.user,
      masterCustomerId,
      membershipType,
    },
    userAccountAccess: userAccount?.access?.items,
  }
}

export default useUserAccount
