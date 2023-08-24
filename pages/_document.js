import { Html, Head, Main, NextScript } from 'next/document'
import { GTM_ID } from '../lib/gtm'
import { theme } from '../styles/mui'

export default function MyDocument() {
  return (
    <Html
      xmlns='http://www.w3.org/1999/xhtml'
      lang='en'
      prefix='og: http://ogp.me/ns#'
    >
      <Head>
        {/* PWA primary color */}
        <meta name='theme-color' content={theme.palette.primary.main} />
        <script
          dangerouslySetInnerHTML={{
            __html: `function OptanonWrapper() {};`,
          }}
        />
        {/* @TODO - add in fab build variables. */}
        {/* {process.env.ALGOLIA_CSS_ENDPOINT ? (
            <script
              src={process.env.ALGOLIA_CSS_ENDPOINT}
              rel='stylesheet'
              type='text/css'
            ></script>
          ) : null} */}
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        {/* Hotjar Tracking Code for https://www.ascd.org */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(h,o,t,j,a,r){h.hj=h.hj||function(){
                (h.hj.q=h.hj.q||[]).push(arguments)
              };
              h._hjSettings={hjid:2983844,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
          }}
        />
        {/* Hubspot */}
        <script
          type='text/javascript'
          id='hs-script-loader'
          async
          defer
          src='//js.hs-scripts.com/8020079.js'
        />
        <script
          async
          type='text/javascript'
          src='//js.hsforms.net/forms/v2.js'
        />
        {/* JQuery Script */}
        <script
          async
          src='https://code.jquery.com/jquery-3.6.0.min.js'
          integrity='sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4='
          crossOrigin='anonymous'
        />
        {/* Piano Script */}
        <script src={process.env.NEXT_PUBLIC_PIANO_JS_ENDPOINT} async={false} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tp = window.tp || [];
              tp.push(["setDebug", false]);
              tp.push(["setAid", "${process.env.NEXT_PUBLIC_PIANO_APP_ID}"]);
              tp.push(["setEndpoint", "${process.env.NEXT_PUBLIC_PIANO_API_BASE_URL}"]);
              tp.push(['setUseTinypassAccounts', false]);
              tp.push(['setUsePianoIdUserProvider', false]);
              tp.push(['setUsePianoIdLiteUserProvider', true]);
              tp.push(["addHandler", "checkoutComplete", function(conversion){ 
                if(conversion.termId == "TM3OTPE1GBBM" || conversion.termId == "TMWT4N9TI9KQ" || conversion.termId == "TMJ6CBWGUSSM" || conversion.termId == "TMRZJ414MTXR" || conversion.termId == "TMC764ML2NVH" || conversion.termId == "TMFHVS5DHME2" || conversion.termId == "TMQ8C80WTFDO" || conversion.termId == "TM9QBVQ2WQKS" || conversion.termId == "TMIBEGX7XLOZ" || conversion.termId == "TMWIOIJEXXVZ" || conversion.termId == "TM1GHB427ENS" || conversion.termId == "TMD5F0750KWE") {  
                  location.href = "https://events.ascd.org/thank-you";
                }
              }]);
              
              function onCompleteUpgradePurchase() { 
                location.href = "https://events.ascd.org/thank-you"; 
              } 
              tp.push(["addHandler", "completeUpgradePurchase", onCompleteUpgradePurchase]);       
              
              tp.push(["init", function() {
                  tp.experience.init();
                  tp.pianoId.init({
                    displayMode: 'modal',
                });
              }]);`,
          }}
        />
        {/* Snipcart Script */}
        <link rel='preconnect' href='https://app.snipcart.com' />
        <link rel='preconnect' href='https://cdn.snipcart.com' />
        <link
          rel='stylesheet'
          href='https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.css'
        />
        <script
          async
          src='https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.js'
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '914910645227747');
                fbq('track', 'PageView');
              `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                (function () {
                  /**
                   * String.prototype.replaceAll() polyfill
                   * https://gomakethings.com/how-to-replace-a-section-of-a-string-with-another-one-with-vanilla-js/
                   * @author Chris Ferdinandi
                   * @license MIT
                   */
                  if (!String.prototype.replaceAll) {
                    String.prototype.replaceAll = function(str, newStr){

                      // If a regex pattern
                      if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
                        return this.replace(str, newStr);
                      }

                      // If a string
                      return this.replace(new RegExp(str, 'g'), newStr);

                    };
                  }
                })();
                `,
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
            <img
              height='1'
              width='1'
              style='display:none'
              src='https://www.facebook.com/tr?id={914910645227747}&ev=PageView&noscript=1'
            />
          `,
          }}
        />
        {/* OneTrust Cookies Consent Notice start for ascd.org */}
        <script
          async
          type='text/javascript'
          src='https://cdn.cookielaw.org/consent/24fc464e-0f07-4b77-9cd3-1e57e7068c67-test/OtAutoBlock.js'
        />
        <script
          async
          src='https://cdn.cookielaw.org/scripttemplates/otSDKStub.js'
          type='text/javascript'
          charSet='UTF-8'
          data-domain-script='24fc464e-0f07-4b77-9cd3-1e57e7068c67-test'
        />
        {/* Twitter conversion tracking base code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            !function(e,t,n,s,u,a)
            {e.twq ||
              ((s = e.twq =
                function () {
                  s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments)
                }),
              (s.version = '1.1'),
              (s.queue = []),
              (u = t.createElement(n)),
              (u.async = !0),
              (u.src = 'https://static.ads-twitter.com/uwt.js'),
              (a = t.getElementsByTagName(n)[0]),
              a.parentNode.insertBefore(u, a))}
            (window,document,'script'); twq('config','nz7l1');
         `,
          }}
        />
      </Head>
      <body>
        {/* <script
            type='text/javascript'
            id='hs-script-loader'
            async
            defer
            src='//js.hs-scripts.com/8020079.js'
          ></script> */}

        <script
          type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: `
              _linkedin_partner_id = "3361793"; window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(){var s = document.getElementsByTagName("script")[0]; var b = document.createElement("script"); b.type = "text/javascript";b.async = true; b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"; s.parentNode.insertBefore(b, s);})();
            `,
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
            {' '}
            <img
              height='1'
              width='1'
              style='display:none;'
              alt=''
              src='https://px.ads.linkedin.com/collect/?pid=3361793&fmt=gif'
            />{' '}
          `,
          }}
        />
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe
            title={`GTM-${GTM_ID}`}
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}
        <Main />
        <NextScript />
      </body>
      <div
        hidden
        id='snipcart'
        data-api-key={process.env.NEXT_PUBLIC_SNIPCART_JS_DATA_API_KEY}
        data-config-modal-style='side'
      >
        <cart-summary section='items'>
          <div className='root'>
            <cart-summary-items-list class='snipcart-cart-summary__items'></cart-summary-items-list>
            <div className='tax-exempt-container'>
              <a
                className='tax-exempt'
                href='https://www.ascd.org/faq?#does-ascd-charge-sales-tax'
                target='_blank'
                rel='noreferrer'
              >
                Important Tax Exempt Info
              </a>
              <h1 className='tax-exempt'>
                To process a transaction with a Purchase Order please send to
                member@ascd.org
              </h1>
            </div>
          </div>
        </cart-summary>
        <billing section='bottom'>
          <fieldset
            id='snipcart-job-title-field'
            className='snipcart-form__set'
          >
            <div className='snipcart-form__field'>
              <hr className='snipcart-form__separator'></hr>
              <br></br>
              <snipcart-label class='snipcart__font--tiny' for='roleCategory'>
                Title/Role
              </snipcart-label>
              <snipcart-select
                name='roleCategory'
                class='snipcart-form__select  snipcart__font--secondary snipcart__font--bold'
                required
              >
                <option value=''></option>
                <option value='Department Head'>Department Head</option>
                <option value='Professional Development Director'>
                  Professional Development Director
                </option>
                <option value='Curriculum Director'>Curriculum Director</option>
                <option value='Para-Professional'>Para-Professional</option>
                <option value='Counselor'>Counselor</option>
                <option value='Teacher'>Teacher</option>
                <option value='Superintendent'>Superintendent</option>
                <option value='Student'>Student</option>
                <option value='Principal'>Principal</option>
                <option value='Coach'>Coach</option>
                <option value='Admin'>Admin</option>
              </snipcart-select>
              <br></br>
              <snipcart-label class='snipcart__font--tiny' for='schoolName'>
                School
              </snipcart-label>
              <snipcart-input name='schoolName' required></snipcart-input>
              <br></br>
              <snipcart-label class='snipcart__font--tiny' for='districtName'>
                District (if applicable)
              </snipcart-label>
              <snipcart-input name='districtName'></snipcart-input>
              <br></br>
              <snipcart-label class='snipcart__font--tiny' for='stateCountry'>
                State/Country
              </snipcart-label>
              <snipcart-input name='stateCountry' required></snipcart-input>
              <br></br>
            </div>
          </fieldset>
        </billing>
      </div>
    </Html>
  )
}
