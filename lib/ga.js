// log the pageview with their URL
export const pageview = ({ title, href, path }) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
    page_path: path,
    page_title: title,
    page_location: href,
  })
}

// log specific events happening.
export const event = ({ action, params }) => {
  window.gtag('event', action, params)
}

export const sendLoginEvent = ({ loginMethod }) => {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'login',
    loginMethod: loginMethod,
  })
}
