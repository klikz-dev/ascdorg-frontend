import {
  CaptureConsole as CaptureConsoleIntegration,
  HttpClient as HttpClientIntegration,
} from '@sentry/integrations'
import * as Sentry from '@sentry/nextjs'

const messageFilters = (messages = [], eventMessage = '') => {
  return messages.some((message) => eventMessage.startsWith(message))
}

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  /** 1 for dev, 0.01 for production */
  tracesSampleRate: Number(process.env.NEXT_PUBLIC_TRACES_SAMPLE_RATE || '1'),
  integrations: [
    /** captures console logs */
    new CaptureConsoleIntegration({
      levels: ['log', 'info', 'warn', 'error', 'debug', 'assert'],
    }),
    /** captures 500 http codes */
    new HttpClientIntegration({
      failedRequestStatusCodes: [500],
    }),
  ],
  beforeSend(event) {
    if (
      event &&
      event.message &&
      messageFilters(
        [
          'OAuthError: The client specified not to prompt, but the user is not logged in.',
          'A client-side exception has occurred, see here for more info: https://nextjs.org/docs/messages/client-side-exception-occurred',
          'Enabling GTag as e-commerce tracking provider',
          "Sending event 'set_checkout_option' to gtag [object Object]",
          "Sending event 'begin_checkout' to gtag [object Object]",
          "Sending event 'checkout_progress' to gtag [object Object]",
          'TP: registerTrackUnload is deprecated',
          'TP: trackPageUnloadIfNecessary is deprecated',
          'ReferenceError: Intl is not defined',
        ],
        event.message
      )
    ) {
      /** do not send the error */
      return null
    }
    return event
  },
})
