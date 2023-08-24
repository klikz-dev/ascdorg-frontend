import {
  CaptureConsole as CaptureConsoleIntegration,
  HttpClient as HttpClientIntegration,
} from '@sentry/integrations'
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  /** 1 for dev, 0.01 for production */
  tracesSampleRate: Number(process.env.NEXT_PUBLIC_TRACES_SAMPLE_RATE || '1'),
  integrations: [
    /** captures console logs */
    new CaptureConsoleIntegration({
      levels: ['log', 'info', 'warn', 'error', 'debug', 'assert'],
    }),
    /** captures 500 and 404 error codes from the api */
    new HttpClientIntegration({
      failedRequestStatusCodes: [500, 404],
    }),
  ],
  beforeSend(event) {
    if (
      event &&
      event.message &&
      /** we do not care to see these graphql errors on sentry unless it's prod */
      process.env.NEXT_PUBLIC_BASE_PATH !== 'ascd.org' &&
      event.message.startsWith('[GraphQL error]: Message:')
    ) {
      /** do not send the error */
      return null
    }
    return event
  },
})
