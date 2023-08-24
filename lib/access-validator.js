/**
 * This library has business logic to determine if a user will have access to resources
 */

/**
 * Term names defined in piano
 * @TODO Probably need to update or use a new approach so this isnt hardcoded
 */
const PTN = Object.freeze({
  DIGITAL_BASIC_ANNUAL: 'Digital - Basic - Annual',
  STANDARD_SELECT_MONTHLY: 'Standard - Select - Monthly',
  REGISTRATION: 'Registration',
  PAID_SUBSCRIPTIONS_KEYWORDS: ['Basic', 'Select', 'Premium'],
  EL_SUBSCRIPTION_KEYWORD: 'EL - Digital',
  SELECT_SUBSCRIPTION_KEYWORD: 'Select',
  PREMIUM_SUBSCRIPTION_KEYWORD: 'Premium',
  VOTER_ELIGIBLE_KEYWORD_ANNUAL: 'Annual',
  VOTER_ELIGIBLE_KEYWORD_STUDENT: 'Student - Standard',
  VOTER_ELIGIBLE_KEYWORD_FULL_ACCESS: 'Full Access',
  PAYWALL_MEMBERSHIP_KEYWORDS: [
    'Basic',
    'Select',
    'Premium',
    'EL - Digital',
    'Student',
  ],
})

/**
 * Determine if a user has access to all the chapters of a book
 * @param {String} memberBook - Membership level for the book defined in the CMS
 * @param {Array} userAccountAccess - A users terms and resources as defined by piano
 * @return {Boolean}
 */
export const hasAccessToBook = (memberBook, userAccountAccess) => {
  let hasAccess = false

  if (memberBook && userAccountAccess) {
    switch (memberBook) {
      case PTN.SELECT_SUBSCRIPTION_KEYWORD:
        hasAccess = hasTermResourceKeyword(
          [PTN.SELECT_SUBSCRIPTION_KEYWORD, PTN.PREMIUM_SUBSCRIPTION_KEYWORD],
          userAccountAccess
        )
        break
      case PTN.PREMIUM_SUBSCRIPTION_KEYWORD:
        hasAccess = hasTermResourceKeyword(
          [PTN.PREMIUM_SUBSCRIPTION_KEYWORD],
          userAccountAccess
        )
        break
    }
  }

  return hasAccess
}

/**
 * Determine if a user has access to member discounts on books
 * If the user has only fremium access they do not qualify
 * @param {Array} userTerms - A users terms as defined by piano
 * @return {Boolean}
 */
export const hasMemberBookPrice = (userTerms) =>
  hasTermThatDoesNotMatch([PTN.REGISTRATION], userTerms)

/**
 * Determine if a user has atleast 1 paid membership term
 * @param {Array} userTerms - A users terms as defined by piano
 * @return {Boolean}
 */
export const validatePaidMembership = (userTerms) =>
  userTerms ? hasTermKeyword(PTN.PAID_SUBSCRIPTIONS_KEYWORDS, userTerms) : false

export const hasActivateSubscription = (userAccountUser) => {
  const results = userAccountUser?.custom_fields?.filter((field) => {
    return field.fieldName === 'IsActivate'
  })
  return results?.length > 0
    ? results[0]?.value && results[0]?.value === '1'
      ? true
      : false
    : false
}

export const hasELSubscription = (userAccountAccess) =>
  userAccountAccess
    ? hasTermResourceKeyword([PTN.EL_SUBSCRIPTION_KEYWORD], userAccountAccess)
    : false

export const hasPaywallMembership = (userAccountAccess) =>
  userAccountAccess
    ? hasTermResourceKeyword(PTN.PAYWALL_MEMBERSHIP_KEYWORDS, userAccountAccess)
    : false
export const hasVoteEligibilty = (userAccountAccess) =>
  userAccountAccess
    ? hasTermResourceKeyword(
        [
          PTN.VOTER_ELIGIBLE_KEYWORD_ANNUAL,
          PTN.VOTER_ELIGIBLE_KEYWORD_STUDENT,
          PTN.VOTER_ELIGIBLE_KEYWORD_FULL_ACCESS,
        ],
        userAccountAccess
      )
    : false

/**
 * Searches a users access list to find if any of the terms match the term keywords
 *
 * @param {Array} termsToFind
 * @param {Array} userAccountAccess - A users terms and resources as defined by piano
 * @returns {Boolean}
 */
const hasTermResourceKeyword = (termsToFind, userAccountAccess) =>
  userAccountAccess.find(
    (item) =>
      termsToFind.find((keyword) => item.term?.name.includes(keyword)) !==
        undefined ||
      termsToFind.find(
        (keyword) =>
          item.user_access.resource?.name.includes(keyword) &&
          item.user_access.granted === true
      ) !== undefined
  ) !== undefined

/**
 * Searches a users active access list to find if any of the terms match the term keywords
 *
 * @param {Array} termsToFind
 * @param {Array} userTerms - A users terms as defined by piano
 * @returns {Boolean}
 * @deprecated Need to also check resource name
 */
const hasTermKeyword = (termsToFind, userTerms) =>
  userTerms.find(
    (item) =>
      termsToFind.find(
        (keyword) =>
          item.user_access.granted &&
          (item.user_access?.resource?.name.includes(keyword) ||
            item.term?.name.includes(keyword))
      ) !== undefined
  ) !== undefined

/**
 * Will search a users terms to make sure atleast 1 term does NOT match the provided term
 *
 * @param {String} term
 * @param {Array} userTerms - A users terms as defined by piano
 * @returns {Boolean}
 */
const hasTermThatDoesNotMatch = (term, userTerms) =>
  userTerms?.find((item) => term !== item.term?.name) !== undefined
