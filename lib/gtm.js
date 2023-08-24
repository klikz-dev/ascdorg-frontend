export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID

export const testpageview = ({ title, href, path }) => {
  window.dataLayer.push({
    event: 'testpageview',
    eventCategory: 'pageview',
    eventAction: 'navigate',
    eventLabel: title,
    page_path: path,
    page_title: title,
    page_location: href,
  })
}

export const itemAdded = (item) => {
  window.dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
  window.dataLayer.push({
    event: 'snipcartEvent',
    eventCategory: 'ecommerce',
    eventAction: 'add_to_cart',
    eventLabel: item.name,
    eventValue: item.price,
    ecommerce: {
      currencyCode: 'USD',
      add: {
        products: createProductsFromItems([item]),
      },
    },
  })
}

export const itemRemoved = (item) => {
  window.dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
  window.dataLayer.push({
    event: 'snipcartEvent',
    eventCategory: 'ecommerce',
    eventAction: 'remove_from_cart',
    eventLabel: item.name,
    eventValue: item.price,
    ecommerce: {
      currencyCode: 'USD',
      remove: {
        products: createProductsFromItems([item]),
      },
    },
  })
}

export const orderCompleted = (order) => {
  window.dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
  window.dataLayer.push({
    event: 'snipcartEvent',
    eventCategory: 'ecommerce',
    eventAction: 'purchase',
    ecommerce: {
      currencyCode: order?.currency,
      purchase: {
        actionField: {
          id: order?.invoiceNumber,
          affiliation: 'ASCD Website',
          revenue: order?.total,
          tax: order?.taxesTotal,
          shipping: order?.shippingDetails?.cost,
        },
        products: createProductsFromItems(order?.items?.items),
      },
    },
  })
}

export const onCheckoutOption = ({ step, checkoutOption }) => {
  window.dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
  window.dataLayer.push({
    event: 'snipcartEvent',
    eventCategory: 'ecommerce',
    eventAction: 'set_checkout_option',
    ecommerce: {
      checkout_option: {
        actionField: { step: step, option: checkoutOption },
      },
    },
  })
}

export const createProductsFromItems = (items) => {
  return items.map((item) => ({
    name: item.name,
    description: item.description,
    id: item.id,
    price: item.price,
    quantity: item.quantity,
  }))
}
