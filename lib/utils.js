import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { Box } from '@mui/material'
import dateFormat from 'dateformat'
import qs from 'qs'
import DisplayTime from '../components/info/DisplayTime/DisplayTime'
import { constSnipcart } from '../const'

export const formatDateToCalendarLong = (dateStr) =>
  dateFormat(dateStr, 'longDate')

export const formatDateToCalendarMedium = (dateStr) =>
  dateFormat(dateStr, 'mediumDate')

export const formatDateToCalendarShort = (dateStr) =>
  dateFormat(dateStr, 'mmm d')

export const formatDateRangeToCalendarShort = (startDateStr, endDateStr) => {
  const startDate = formatDateToCalendarShort(startDateStr)
  const endDate = formatDateToCalendarShort(endDateStr)
  return startDate !== endDate ? `${startDate}-${endDate}` : startDate
}

export const renderTime = (startTime, endingTime, variant, longDate) => {
  if (
    formatDateToCalendarShort(startTime) ===
    formatDateToCalendarShort(endingTime)
  ) {
    return (
      <>
        {longDate ? (
          <Box>
            {`${formatDateToCalendarLong(startTime)} / `}
            <DisplayTime
              startTime={startTime}
              endTime={endingTime}
              variant={variant}
            />
          </Box>
        ) : (
          <Box>
            {`${formatDateToCalendarMedium(startTime)} / `}
            <DisplayTime startTime={startTime} endTime={endingTime} />
          </Box>
        )}
      </>
    )
  }

  if (startTime && endingTime) {
    return longDate
      ? `${formatDateToCalendarLong(startTime)} - ${formatDateToCalendarLong(
          endingTime
        )}`
      : `${formatDateToCalendarMedium(
          startTime
        )} - ${formatDateToCalendarMedium(endingTime)}`
  }

  if (startTime && !endingTime) {
    return longDate
      ? formatDateToCalendarLong(startTime)
      : formatDateToCalendarMedium(startTime)
  }
}

export const formatDateToTime = (dateStr) => dateFormat(dateStr, 'h:MM TT')

export const convertTimeToLocaleTimeWithDST = (dateStr) => {
  const date = new Date(dateStr)

  const getEstOffset = () => -parseInt(dateStr.split('-')[3])

  const utcTime = date.getTime() + date.getTimezoneOffset() * 60 * 1000
  const estOffset = getEstOffset()
  const usa = utcTime + 60 * 60 * 1000 * estOffset

  return new Date(usa).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const pianoClient =
  typeof window !== 'undefined' && typeof window.tp !== 'undefined'
    ? window.tp
    : undefined

export const getSnipcartClient = () =>
  typeof window !== 'undefined' && typeof window.Snipcart !== 'undefined'
    ? window.Snipcart
    : undefined

// util function to get the path name
export const url =
  typeof window !== 'undefined' && new URL(window.location.href)

// util function to get the path name
export const pathName = () =>
  typeof window !== 'undefined' && window.location.pathname

// util function to get the protocol
export const protocol =
  typeof window !== 'undefined' && window.location.protocol

// util function to get the protocol
export const port = typeof window !== 'undefined' && window.location.port

// util function to get the host name
export const hostname =
  typeof window !== 'undefined' && window.location.hostname

// util function to get the host name for setting a cookie
export const hostnameForCookie =
  typeof window !== 'undefined' &&
  window.location.hostname.includes('.ascd.org')
    ? '.ascd.org'
    : ''

// util function to get the protocol, hostname and port
export const baseUrl = port
  ? `${protocol}//${hostname}:${port}`
  : `${protocol}//${hostname}`

// util function to get the path name
export const getParamValue = (param) => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams?.get(param)
  }
}
typeof window !== 'undefined' && new URL(window.location.href)
/**
 * This function will return the url needed to allow Snipcart to validate products
 * that are purchased on our site.
 *
 * @param {String} productId
 * @param {Number} productPrice
 * @param {String} digitalFileGuid
 * @returns {String}
 */
export const encodeSnipcartOrderValidationUrl = (
  productId,
  productPrice,
  digitalFileGuid,
  productType
) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_SNIPCART_ORDER_VALIDATION_BASE_URL || ''

  const price = productPrice ? productPrice.toString() : '0'

  return encodeURI(
    `${baseUrl}/api/order-validations/${productId}?vKey=${Buffer.from(
      price,
      'binary'
    ).toString('base64')}${digitalFileGuid ? '&guid=' + digitalFileGuid : ''}${
      productType ? '&productType=' + productType : ''
    }`
  )
}
//util function to determine if current datetime has passed a given date string
const becomeAvailable = (availableDateString) => {
  const availableDate = Date.parse(availableDateString)
  return !isNaN(availableDate) && !(availableDate - new Date() > 0)
}
//util function to return caption label for Snipcart button for a given date string
export const getCartButtonCaptionLabel = (availableDateString) => {
  return becomeAvailable(availableDateString)
    ? constSnipcart.BTN_LABEL_ADD
    : constSnipcart.BTN_LABEL_PREORDER
}
//util function to return a product from Snipcart for a given id
//https://docs.snipcart.com/v3/api-reference/authentication
export const getProductFromSnipcart = async (id) => {
  const req = await fetch(constSnipcart.API_BASE_URL + '/products/' + id, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${Buffer.from(
        process.env.NEXT_PUBLIC_SECRET_SNIPCART_API_KEY + ':',
        'binary'
      ).toString('base64')}`,
      Accept: 'application/json',
    },
  })
  return await req.json()
}

// function created based on the blog at
// https://www.codespot.org/javascript-email-validation/
export const validateEmail = (emailAddress) => {
  const re =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailAddress && re.test(emailAddress.toLowerCase())
}

/**
 * Function that creates a filter paramenter for React InstantSearch Configure
 * @param {array} contentTypes
 * @param {array} topics
 * @param {array} keywords
 * @param {array} authors
 * @param {string} lowerDate
 * @param {string} upperDate
 * @param {boolean} featured
 * @param {string} elArticleType
 * @param {boolean} premium
 * @returns {string}
 */
export const createFilterQuery = (
  contentTypes,
  topics,
  keywords,
  authors,
  lowerDate,
  upperDate,
  featured,
  elArticleType,
  premium,
  memberBook,
  quickRead
) => {
  let filterArray = []

  const mapArray = (content, string) => {
    return content && content.map((item) => `${string}:"${item}"`).join(' OR ')
  }

  const toMappedDate = (lowerDate, upperDate) => {
    if (!lowerDate) {
      return null
    }
    if (lowerDate && !upperDate) {
      return `unixTimeStamp > ${new Date(lowerDate).getTime() / 1000}`
    } else {
      return `unixTimeStamp: ${new Date(lowerDate).getTime() / 1000} TO ${
        new Date(upperDate).getTime() / 1000
      }`
    }
  }
  const mappedTypes = mapArray(contentTypes, 'type')
  const mappedTopics = mapArray(topics, 'topic')
  const mappedKeywords = mapArray(keywords, 'keywords')
  const mappedAuthors = mapArray(authors, 'author')
  const mappedFeatured = featured && `featured:${featured}`
  const mappedDate = toMappedDate(lowerDate, upperDate)
  const mappedPremium = premium && `premium:${premium}`
  const mappedelArticleType = mapArray(elArticleType, 'elArticleType')
  const mappedMemberBook = memberBook && `memberBook:${memberBook}`
  const mappedQuickRead = quickRead && `quickRead:${quickRead}`
  mappedTypes && filterArray.push(mappedTypes)
  mappedTopics && filterArray.push(mappedTopics)
  mappedKeywords && filterArray.push(mappedKeywords)
  mappedAuthors && filterArray.push(mappedAuthors)
  mappedFeatured && filterArray.push(mappedFeatured)
  mappedDate && filterArray.push(mappedDate)
  mappedPremium && filterArray.push(mappedPremium)
  mappedelArticleType && filterArray.push(mappedelArticleType)
  mappedMemberBook && filterArray.push(mappedMemberBook)
  mappedQuickRead && filterArray.push(mappedQuickRead)
  return filterArray.join(' AND ')
}

export const modifyTime = (time) => {
  let newTimeArray = time.split('')

  if (newTimeArray[0] === '0') {
    return newTimeArray.slice(1, newTimeArray.length).join('')
  } else {
    return newTimeArray.join('')
  }
}

export const getTimezoneName = (startTime) => {
  const today = new Date(startTime)
  const short = today.toLocaleDateString(undefined)
  const full = today.toLocaleDateString(undefined, { timeZoneName: 'long' })

  const shortIndex = full.indexOf(short)
  if (shortIndex >= 0) {
    const trimmed =
      full.substring(0, shortIndex) + full.substring(shortIndex + short.length)

    const trim = trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, '')

    const splitWord = trim.split(' ')
    return splitWord.map((word) => word[0]).join('')
  } else {
    // in some magic case when short representation of date is not present in the long one, just return the long one as a fallback, since it should contain the timezone's name
    return full
  }
}

export const convertToSlug = (node) => {
  const title = documentToPlainTextString(node)
  const titleStr = title && typeof title === 'string' ? title : title[1]
  return titleStr
    ? titleStr
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
    : ''
}

export const getCookie = (cookieName) => {
  if (typeof window !== 'undefined') {
    const name = `${cookieName}=`
    const decodedCookie = decodeURIComponent(document.cookie)
    const foundCookie = decodedCookie
      .split('; ')
      .find((row) => row.startsWith(name))
    if (foundCookie) {
      return foundCookie.split('=')[1]
    }
    return false
  }
}

export const setCookie = (key, value, path, domain, maxAge) => {
  if (typeof window !== 'undefined') {
    document.cookie = `${key}=${value}; path=${path}; domain=${domain}; max-age=${maxAge}`
  }
}

export const readingTime = (minuteRef) => {
  if (minuteRef.current) {
    const text = minuteRef.current.innerText
    const words = text.trim().split(/\s+/).length
    const time = Math.ceil(words / 225)
    return time
  }
}

/**
 *
 * @param {object} variation object that has a nested array of sessions
 * @returns {string} a Date object of the earliest date in the array (found by sorting by earliest and choosing the first)
 */
export const findEarliestSessionDate = (variation) => {
  return new Date(
    variation?.variation?.sessions?.items
      .map((session) => session.startDatetime)
      .sort((a, b) => new Date(a) - new Date(b))[0]
  )
}
export const createURL = (state) => `?${qs.stringify(state)}`

export const pathToSearchState = (path) =>
  path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {}

export const searchStateToURL = (searchState) =>
  searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : ''

export const renderLabel = (item) => {
  switch (item.label) {
    case 'pubissue':
      return 'Publication'
    case 'pressRelease':
      return 'Press Release'
    default:
      return item.label
  }
}

export const reconcilePageData = (
  [items],
  [itemsTwo],
  [itemsThree],
  [itemsFour],
  [itemsFive]
) => {
  const getItems = (items, i) => items?.content?.items?.[i]
  /** The query will grab an objet with a __typename and nothing in it
   * if it isn't included normally in the query. This will check for that
   */
  const checkEntries = (ob) => Object.entries(ob).length > 1
  return {
    ...items,
    content: {
      /** reconcile page data from separate queries in order */
      items: items?.content.items?.map((content, i) => {
        if (checkEntries(content ?? {})) {
          return content
        } else if (checkEntries(getItems(itemsTwo, i) ?? {})) {
          return getItems(itemsTwo, i)
        } else if (checkEntries(getItems(itemsThree, i) ?? {})) {
          return getItems(itemsThree, i)
        } else if (checkEntries(getItems(itemsFour, i) ?? {})) {
          return getItems(itemsFour, i)
        } else {
          return getItems(itemsFive, i) || null
        }
      }),
    },
  }
}

/** formatAuthors can take in an array of authors, single author object or a string */
export const formatAuthor = (authors) => {
  if (Array.isArray(authors)) {
    if (authors.length > 1) {
      return `${authors[0]?.title} & ${authors[1]?.title} ${
        authors.length > 2 ? 'et al.' : ''
      }`
    }

    return authors[0]?.title
  }

  if (authors?.title) {
    return authors?.title
  }

  if (Array.isArray(authors?.items)) {
    if (authors.items.length > 1) {
      return `${authors?.items?.[0]?.title} & ${authors?.items?.[1]?.title} ${
        authors?.items?.length > 2 ? 'et al.' : ''
      }`
    }

    return authors?.items?.[0]?.title
  }

  if (typeof authors === 'string') {
    return authors
  }

  return ''
}

export const moduleBGColor = (backgroundColor) => {
  switch (backgroundColor) {
    case 'light_grey':
      return 'background.lightGrey'
    case 'dark_green':
      return 'primary.main'
    case 'light_green':
      return 'background.lightGreen'
    case 'light_pink':
      return 'background.lightPink'
    case 'white':
    default:
      return 'background.light'
  }
}
