import dateFormat from 'dateformat'
import { imageoptimization, PIANO_TERM_NAMES as PTN } from '../const'

/**
 * Transforms either an imageBynder or imageContentful image from a GraphQL thumbnail fragment into a url string
 * @param {{imageBynder?: {src: string}[]; imageContentful: {file: {url: string}}}} thumbnail
 * @param {boolean} defaultIsNull if this is true, then the default image is false
 * @returns {string} a url image string
 */
export const contentfulImageTransformation = (
  thumbnail,
  defaultIsNull = false
) => {
  return thumbnail?.imageBynder
    ? thumbnail?.imageBynder[0]?.src +
        '?' +
        imageoptimization.qualityParameter +
        '=' +
        imageoptimization.qualityValue
    : thumbnail?.imageContentful?.url
    ? thumbnail?.imageContentful?.url +
      '?' +
      imageoptimization.qualityParameter +
      '=' +
      imageoptimization.qualityValue
    : defaultIsNull
    ? null
    : '/images/ASCDImageFiller.png'
}

export const contentfulThumbnailToImageWidth = (image) => {
  if (image?.imageBynder) {
    return image?.imageBynder[0]?.width
  } else if (image?.imageContentful?.file) {
    return image?.imageContentful?.file?.details?.image?.width
  } else if (image?.imageContentful?.url) {
    return image?.imageContentful?.width
  } else {
    return '100%'
  }
}

export const contentfulThumbnailToImageHeight = (image) => {
  if (image?.imageBynder) {
    return image?.imageBynder[0]?.height
  } else if (image?.imageContentful?.file) {
    return image?.imageContentful?.file?.details?.image?.height
  } else if (image?.imageContentful?.url) {
    return image?.imageContentful?.height
  } else {
    return '100%'
  }
}

/**
 * extract membership data from piano user access info and convert for rendering my account tab
 * @param {Array} userAccesses - user access list
 */
export const accessInfoToMembershipData = (userAccesses) => {
  let membershipKeyword = ''
  const membershipAccess = userAccesses?.find((item) => {
    membershipKeyword = PTN.PAID_MEMBERSHIP_KEYWORDS.find((keyword) =>
      item.term.name.includes(keyword)
    )
    return membershipKeyword !== undefined
  })

  const expireDate = new Date(membershipAccess?.expire_date * 1000)
  return {
    userName: membershipAccess?.user?.personal_name,
    membershipName: membershipAccess?.term?.name,
    autoRenew: membershipAccess?.term?.payment_force_auto_renew,
    expireDate:
      expireDate instanceof Date && !isNaN(expireDate)
        ? dateFormat(expireDate, 'longDate')
        : '',
    price: membershipAccess?.term?.payment_billing_plan_table[0]?.priceValue,
    period: membershipAccess?.term?.payment_billing_plan_table[0]?.period,
    membershipKeyword,
  }
}

/**
 * extract membership data from piano user subscription info and convert for rendering my account tab
 * @param {Array} userSubscriptions - user subscription list
 */
export const subscriptionInfoToMembershipData = (userSubscriptions) => {
  let membershipKeyword = ''
  const membership = userSubscriptions
    ?.filter((item) => item.status == 'active')
    .find((item) => {
      membershipKeyword = PTN.PAID_MEMBERSHIP_KEYWORDS.find((keyword) =>
        item.term.name.includes(keyword)
      )
      return membershipKeyword !== undefined
    })

  const expireDate = new Date(membership?.next_bill_date * 1000)
  return {
    userName: membership?.user?.personal_name,
    membershipName: membership?.term?.name,
    autoRenew: membership?.auto_renew,
    expireDate:
      expireDate instanceof Date && !isNaN(expireDate)
        ? dateFormat(expireDate, 'longDate')
        : '',
    price: membership?.term?.payment_billing_plan_table[0]?.priceValue,
    period: membership?.term?.payment_billing_plan_table[0]?.period,
    membershipKeyword,
    subscription_id: membership?.subscription_id,
    cancelable: membership?.cancelable,
  }
}

export const orderItemToCardData = (cardItem) => {
  const order = cardItem?.items ? cardItem?.items[0] : []
  const totalPrice = cardItem?.items?.reduce((accumulator, object) => {
    return accumulator + object.TOTAL_PRICE
  }, 0)
  const header0Text = 'Order Number'
  const header0Value = order?.ORDER_NO
  const header1Text = 'Order Placed'
  const header1Value =
    order?.ORDER_DATE !== '0000-00-00'
      ? dateFormat(order?.ORDER_DATE, 'longDate')
      : ''
  const header2Text = 'Shipped to'
  const header2Value = order?.SHIP_LAST_NAME
  const header3Text = 'Total'
  const header3Value = `$${totalPrice?.toFixed(2)}`
  const orderItems = cardItem?.items?.map((oi) => {
    return {
      itemTitle: oi?.PRODUCT_NAME,
      itemData1Text: 'Tracking#:',
      itemData1Value: oi?.TRACKING_NO,
      itemData2Text: 'Total Price:',
      itemData2Value: `$${oi?.TOTAL_PRICE?.toFixed(2)}`,
      itemDate3Text: oi?.FULFILL_DATE === '0000-00-00' ? '' : 'Shipped:',
      itemDate3Value:
        oi?.FULFILL_DATE === '0000-00-00'
          ? ''
          : dateFormat(order?.FULFILL_DATE, 'longDate'),
      showDate3: oi?.FULFILL_DATE !== '0000-00-00',
      productNumber: oi?.PRODUCT_CODE,
      status: oi?.ORDER_STATUS,
      downloadURL: oi?.E_Book_URL,
      subSystem: oi?.Subsystem,
      orderNumber: order?.ORDER_NO,
      orderLineNumber: oi?.ORDER_LINE_NO ? oi.ORDER_LINE_NO : -1,
      downloadCounter: oi?.ECD_DOWNLOAD_CTR ? oi.ECD_DOWNLOAD_CTR : 0,
    }
  })
  const invoiceItem = {
    orderNumber: order?.ORDER_NO,
    source: order?.SOURCE,
    invoiceNumber: order?.INVOICE_NO,
    poNumber: order?.PO_NUMBER,
    invoiceDate: dateFormat(order?.INVOICE_DATE, 'longDate'),
    emailId: order?.BILL_PRIMARY_EMAIL_ADDRESS,
    shipName: order?.SHIP_LAST_NAME,
    shippingAddress1: order?.SHIP_ADDRESS_1,
    shippingAddress2: order?.SHIP_ADDRESS_2,
    shippingCity: order?.SHIP_CITY,
    shippingState: order?.SHIP_STATE,
    shippingCountry: order?.SHIP_COUNTRY_CODE,
    shippingZip: order?.SHIP_POSTAL_CODE,
    orderDate: dateFormat(order?.ORDER_DATE, 'longDate'),
    billingName: order?.BILL_LAST_NAME,
    billingAddress1: order?.BILL_ADDRESS_1,
    billingAddress2: order?.BILL_ADDRESS_2,
    billingCity: order?.BILL_CITY,
    billingState: order?.BILL_STATE,
    billingCountry: order?.BILL_COUNTRY_CODE,
    billingZip: order?.BILL_POSTAL_CODE,
    fulFillStatus: order?.ORDER_STATUS,
    fulFillDate:
      order?.FULFILL_DATE === '0000-00-00'
        ? ''
        : dateFormat(order?.FULFILL_DATE, 'longDate'),
    shipmethod: order?.SHIP_VIA_CODE,
    shipDate:
      order?.SHIP_DATE === '0000-00-00'
        ? ''
        : dateFormat(order?.SHIP_DATE, 'longDate'),
    token: order?.TOKEN,
    roleCategory: order?.TITLE,
    school: order?.SCHOOL,
    district: order?.DISTRICTNAME,
    creditCardLast4Digits:
      order?.SOURCE === 'Snipcart'
        ? order?.creditCardLast4Digits
        : order?.TOKEN?.slice(-4),
    completionDate:
      order?.SOURCE === 'Snipcart' ? order?.completionDate : order?.ORDER_DATE,
    cardType: order?.cardType,
    paymentMethod: order?.paymentMethod,
    paymentStatus: order?.paymentStatus,
    tax: order?.ORDER_TAX,
    shipPrice: order?.ORDER_SHIP,
    total: totalPrice,
    productOrders: cardItem?.items.map((order) => {
      return {
        productCode: order?.PRODUCT_CODE,
        purchaseItem: order?.PRODUCT_NAME,
        unitPrice: order?.UNIT_PRICE,
        discount: order?.ORDER_DISCOUNT,
        productTotal: order?.TOTAL_PRICE,
        quantity: order?.QUANTITY,
      }
    }),
  }

  return {
    header0Text,
    header0Value,
    header1Text,
    header1Value,
    header2Text,
    header2Value,
    header3Text,
    header3Value,
    orderItems,
    invoiceItem,
  }
}

export const contentfulAPIToSEOHead = ({
  id,
  sys,
  title,
  blurb,
  description,
  body,
  summary,
  pageUrl,
  locale,
  siteName,
  ogType,
  twitterSite,
  twitterCardType,
  twitterImage,
  image,
  thumbnail,
  __typename,
}) => ({
  ...(id ? { id: id || sys?.id } : {}),
  ...(title ? { title } : {}),
  ...(__typename ? { __typename } : {}),
  ...(blurb ? { blurb } : {}),
  ...(description ? { description } : {}),
  ...(body ? { body } : {}),
  ...(summary ? { summary } : {}),
  ...(pageUrl ? { pageUrl } : {}),
  ...(locale ? { locale } : {}),
  ...(siteName ? { siteName } : {}),
  ...(ogType ? { ogType } : {}),
  ...(twitterSite ? { twitterSite } : {}),
  ...(twitterCardType ? { twitterCardType } : {}),
  ...(twitterImage ? { twitterImage } : {}),
  ...(image ? { image } : {}),
  ...(thumbnail ? { thumbnail } : {}),
})
