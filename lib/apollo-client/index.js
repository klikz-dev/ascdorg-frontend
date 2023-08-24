import { ApolloClient, ApolloLink, HttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'
import { RestLink } from 'apollo-link-rest'
import { stripIgnoredCharacters } from 'graphql'
import { pianoClient } from '../utils'
import cache from './cache'
import { getRealmAccessToken } from './realm'

const getQueryStringParams = (query) => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split('&')
        .reduce((params, param) => {
          let [key, value] = param.split('=')
          params[key] = value
            ? decodeURIComponent(value.replace(/\+/g, ' '))
            : ''
          return params
        }, {})
    : {}
}

const pianoFetch = (uri) => {
  const path = uri.split('?')[0]
  const params = getQueryStringParams(uri.split('?')[1])
  return new Promise((resolve, reject) => {
    pianoClient.push([
      'init',
      function () {
        pianoClient.api?.callApi(
          path,
          {
            api_token: process.env.NEXT_PUBLIC_PIANO_API_KEY,
            ...params,
          },
          (data) => {
            if (data.code === 0) {
              const responseObject = new Response()
              responseObject.json = () => data
              resolve(responseObject)
            } else {
              reject(`Code: ${data.code} - ${data.message}`)
            }
          }
        )
      },
    ])
  })
}

const realmLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_REALM_APP_BASE_URL}/api/client/v2.0/app/${process.env.NEXT_PUBLIC_REALM_APP_ID}/graphql`,

  fetch: async (uri, options) => {
    const realmAccessToken = await getRealmAccessToken()
    options.headers['Content-Type'] = 'application/json'
    options.headers.Authorization = `Bearer ${realmAccessToken}`
    return fetch(uri, options)
  },
})

const contentfulLink = new HttpLink({
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`,

  fetch: (uri, options) => {
    options.credentials = 'same-origin'
    options.headers.Authorization = `Bearer ${
      process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW
        ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
        : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
    }`
    return fetch(uri, options).then((response) => {
      if (response.status >= 500) {
        // or handle 400 errors
        return Promise.reject(response.status)
      }
      return response
    })
  },
})

export const client = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from([
    new RestLink({
      uri: '',
      customFetch: pianoFetch,
    }),
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      }
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    ApolloLink.split(
      (operation) => operation.getContext().clientName === 'realm',
      realmLink,
      contentfulLink
    ),
  ]),
  cache,
})

const customContentfulDirectFetch = (uri, options) => {
  return fetch(uri, options).then((response) => {
    if (response.status >= 500) {
      // or handle 400 errors
      return Promise.reject(response.status)
    }
    return response
  })
}

export const getContentfulDirectClient = async () => {
  const client = new ApolloClient({
    connectToDevTools: true,
    link: ApolloLink.from([
      new RetryLink({
        delay: {
          initial: 300,
          max: Infinity,
          jitter: true,
        },
        attempts: {
          max: 5,
          retryIf: (error) => {
            if (error.response && error.response.headers) {
              const { headers } = error.response
              const remaining = headers.get('x-contentful-ratelimit-remaining')
              if (remaining < 1) {
                console.log(`rate limit reached, retrying....`)
                return true
              }
            }
            return false
          },
        },
      }),
      onError(({ graphQLErrors, networkError, operation, forward }) => {
        if (
          graphQLErrors &&
          /** Do not show meaningless graphQL errors on prod unless they have accompanying network errors */
          (process.env.NEXT_PUBLIC_BASE_PATH !== 'ascd.org' || networkError)
        ) {
          for (const {
            extensions,
            message,
            locations,
            path,
          } of graphQLErrors) {
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
            if (extensions?.code) {
              /** Retry the request, returning the new observable */
              return forward(operation)
            }
          }
        }
        if (networkError) console.log(`[Network error]: ${networkError}`)
      }),
      new HttpLink({
        uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`,
        fetch: customContentfulDirectFetch,
        credentials: 'same-origin',
        headers: {
          Authorization: `Bearer ${
            process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW
              ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
              : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
          }`,
        },
        print(ast, originalPrint) {
          return stripIgnoredCharacters(originalPrint(ast))
        },
      }),
    ]),
    cache,
    ssrMode: typeof window === 'undefined',
    defaultOptions:
      typeof window === 'undefined'
        ? {
            watchQuery: {
              fetchPolicy: 'no-cache',
            },
            query: {
              fetchPolicy: 'network-only',
              errorPolicy: 'ignore',
            },
          }
        : undefined,
  })
  await client.clearStore()
  return client
}
