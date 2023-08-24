import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Router from 'next/router'
import Script from 'next/script'
import { ApolloProvider } from '@apollo/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import PianoManager from '../components/piano/PianoManager'
import { SnipcartManager } from '../components/Snipcart'
import '../styles/globals.css'
import { client } from '../lib/apollo-client'
// import * as ga from '../lib/ga'
import * as gtm from '../lib/gtm'
import { theme } from '../styles/mui'

const OktaSecurity = dynamic(() => import('../components/OktaSecurity'), {
  ssr: false,
})

function App({ Component, pageProps }) {
  useEffect(() => {
    /** Using google tag manager for testpageview */
    gtm.testpageview({
      title: pageProps?.SEO?.title ? pageProps?.SEO?.title : document?.title,
      href: pageProps?.SEO?.pageUrl ? pageProps?.SEO?.pageUrl : location?.href,
      path: location?.pathname,
    })
    /**
     * @todo: Need to remove after GA duplication issue is fixed
     */
    // using google analytics
    // ga.pageview({
    //   title: pageProps?.SEO?.title
    //     ? pageProps?.SEO?.title
    //     : document?.title,
    //   href: pageProps?.SEO?.pageUrl
    //     ? pageProps?.SEO?.pageUrl
    //     : location?.href,
    //   path: location?.pathname,
    // })
  }, [pageProps])

  useEffect(() => {
    const pathname = location?.pathname.toLowerCase().replaceAll('_', '-')
    if (pathname !== location?.pathname) {
      setTimeout(() => {
        Router.push(pathname)
      }, 50)
    }
  }, [])

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <link rel='icon' type='image/ico' href='/favicon.ico' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={client}>
          {/* Google Tag Manager - Global base code */}
          <Script
            id='gtag-base'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer', '${gtm.GTM_ID}');
                `,
            }}
          />
          <OktaSecurity />
          <Component {...pageProps} />
          <SnipcartManager />
          <PianoManager />
        </ApolloProvider>
      </ThemeProvider>
    </>
  )
}

export default App
