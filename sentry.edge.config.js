import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  /** 1 for dev, 0.01 for production */
  tracesSampleRate: Number(process.env.NEXT_PUBLIC_TRACES_SAMPLE_RATE || '1'),
})
