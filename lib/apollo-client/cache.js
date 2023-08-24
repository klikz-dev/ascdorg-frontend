import { InMemoryCache, makeVar } from '@apollo/client'
import { contentfulImageTransformation } from '../../lib/data-transformations'
// import { pianoClient } from '../utils'

export const showSignIn = makeVar(false)
export const showSignUp = makeVar(false)
export const showResetPassword = makeVar(false)
export const signOutUser = makeVar(false)
export const userIdToken = makeVar()

export const userAccountIdVar = makeVar()
export const pianoUserAccount = makeVar()
export const pianoUserLoading = makeVar()
export const pianoTokenVar = makeVar()

export const oktaAccountIdVar = makeVar()

export const hasPaidMembershipVar = makeVar(false)
export const hasMemberBookPriceVar = makeVar(false)
export const hasVoteEligibiltyVar = makeVar(false)
export const hasELSubscriptionVar = makeVar(false)
export const hasActivateSubscriptionVar = makeVar(false)
export const hasPaywallMembershipVar = makeVar(false)

const typePolicies = {
  Image: {
    fields: {
      imgSrc: {
        read: (existing) => existing || null,
      },
    },
  },
  Book: {
    fields: {
      thumbnail: {
        merge: (existing, incoming, { mergeObjects }) =>
          mergeObjects(incoming, {
            imgSrc: contentfulImageTransformation(incoming),
          }),
      },
    },
  },
  Profile: {
    fields: {
      thumbnail: {
        merge: (existing, incoming, { mergeObjects }) =>
          mergeObjects(incoming, {
            imgSrc: contentfulImageTransformation(incoming),
          }),
      },
    },
  },
  Workshop: {
    fields: {
      spotlightImage: {
        merge: (existing, incoming, { mergeObjects }) =>
          mergeObjects(incoming, {
            imgSrc: contentfulImageTransformation(incoming),
          }),
      },
    },
  },
  UserAccount: {
    fields: {
      id: {
        read: () => userAccountIdVar(),
      },
    },
  },
}

export default new InMemoryCache({ typePolicies })
