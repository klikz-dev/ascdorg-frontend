import Head from 'next/head'
import { useRouter } from 'next/router'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { shape, string, oneOfType, arrayOf, object } from 'prop-types'
import { contentfulImageTransformation } from '../../lib/data-transformations'
export default function SEOHead({ seo }) {
  const { asPath } = useRouter()
  const CANONICAL_DOMAIN = 'https://www.ascd.org'
  const title = seo?.title || 'ASCD'

  const twitterImageUrl = contentfulImageTransformation(seo?.twitterImage)
  const imageUrl = contentfulImageTransformation(seo?.image)
  const thumbnailUrl = contentfulImageTransformation(seo?.thumbnail)
  const imgUrl = seo?.twitterImage
    ? twitterImageUrl
    : seo?.image
    ? imageUrl
    : seo?.thumbnail
    ? thumbnailUrl
    : '/images/ASCDImageFiller.png'

  const getDescription = (description) => {
    return description?.nodeType
      ? documentToPlainTextString(description)?.substring(0, 200)
      : description
  }

  const ogDescription = getDescription(
    seo?.blurb || seo?.description || seo?.body || seo?.summary
  )

  return (
    <Head>
      <meta charSet='UTF-8' />
      <title>{title}</title>
      <link rel='canonical' href={`${CANONICAL_DOMAIN}${asPath}`} />
      {seo?.__typename === 'seo' && (
        <meta name='description' content={seo?.description} />
      )}
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta
        property='og:url'
        content={seo?.pageUrl ? seo?.pageUrl : `${CANONICAL_DOMAIN}${asPath}`}
      />
      <meta property='og:title' content={title} />
      <meta property='og:locale' content={seo?.locale || 'en_US'}></meta>
      <meta property='og:site_name' content={seo?.siteName || 'ASCD'}></meta>
      <meta property='og:type' content={seo?.ogType || 'website'}></meta>
      <meta property='og:description' content={ogDescription} />
      <meta name='twitter:site' content={seo?.twitterSite || '@ascd'} />
      <meta
        name='twitter:card'
        content={seo?.twitterCardType?.join(', ') || 'summary_large_image'}
      />
      <meta name='twitter:image' content={imgUrl} />
      <meta property='og:image' content={imgUrl} />
    </Head>
  )
}

SEOHead.propTypes = {
  seo: shape({
    id: string,
    title: string,
    __typename: string,
    blurb: oneOfType([object, string]),
    description: oneOfType([object, string]),
    body: oneOfType([object, string]),
    summary: oneOfType([object, string]),
    pageUrl: string,
    locale: string,
    siteName: string,
    ogType: string,
    twitterSite: string,
    twitterCardType: arrayOf(string),
    twitterImage: object,
    image: object,
    thumbnail: object,
  }),
}
