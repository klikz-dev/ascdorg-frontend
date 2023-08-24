import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useReactiveVar } from '@apollo/client'
import { Box, Container, Divider, Skeleton } from '@mui/material'
import dateFormat from 'dateformat'
import AlternateRows from '../../components/AlternateRows'
import ArticleAuthors from '../../components/ArticleComponents/ArticleAuthors'
import BookBanner from '../../components/Banners/BookBanner'
import BookToc from '../../components/BookToc'
import ChapterPreview from '../../components/ChapterPreviewComponents/ChapterPreview'
import HorizontalScroll from '../../components/HorizontalScroll'
import Layout from '../../components/layout'
import ReadMore from '../../components/ReadMore'
import SEOHead from '../../components/SEOHead'
import Topics from '../../components/Topics'
import { constSnipcart } from '../../const'
import CustomBlock from '../../const/CustomBlocks'
import { hasAccessToBook } from '../../lib/access-validator'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import { hasMemberBookPriceVar } from '../../lib/apollo-client/cache'
import { contentfulAPIToSEOHead } from '../../lib/data-transformations'
import useUserAccount from '../../lib/hooks/useUserAccount'
import GET_BOOK from '../../lib/schema/pages/getBook.graphql'
import GET_BOOK_LIST_QUERY from '../../lib/schema/pages/getBookList.graphql'
import { getCartButtonCaptionLabel } from '../../lib/utils'
import paths from '../../paths/path'

export default function Book({
  chapters,
  slug,
  memberBook,
  quickRead,
  pageCount,
  media,
  isbn,
  bookVersions,
  seo,
  topic,
  topicSecondary,
  authors,
  thumbnail,
  description,
  title,
  relatedCollections,
  relatedBooks,
}) {
  const { userAccountAccess } = useUserAccount()
  const hasMemberBookPrice = useReactiveVar(hasMemberBookPriceVar)
  const [productNumber, setProductNumber] = useState(null)
  const [bookVersion, setBookVersion] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      const variant = url.searchParams.get('variant')
      const defaultBookVersion = bookVersionWithProductNumber(
        bookVersions.items
      )
      if (!defaultBookVersion) {
        router.push('/404')
      } else {
        if (variant) {
          const matchedBookVersion = bookVersions.items.find(
            (version) => version.productNumber === variant
          )
          if (!matchedBookVersion) {
            if (slug && defaultBookVersion.productNumber) {
              router.push(
                `/books/${slug}?variant=${defaultBookVersion.productNumber}`
              )
            }
          } else {
            setProductNumber(variant)
            setBookVersion(matchedBookVersion)
          }
        } else {
          const chapter = url.searchParams.get('chapter')
          if (!chapter && slug && defaultBookVersion.productNumber) {
            router.push(
              `/books/${slug}?variant=${defaultBookVersion.productNumber}`
            )
          } else {
            setBookVersion(defaultBookVersion)
          }
        }
      }
    }
  }, [router.query])

  /** React Hooks must be called before conditional rendering */
  if (router.isFallback) {
    return (
      <Skeleton
        animation='wave'
        variant='rectangular'
        width='100%'
        height='100px'
      />
    )
  }

  const hasMemberBookAccess = hasAccessToBook(memberBook, userAccountAccess)

  const secondaryTopics = topicSecondary?.items.reduce((unique, o) => {
    if (!unique.includes(o)) {
      unique.push(o)
    }
    return unique
  }, [])

  const topics = [...secondaryTopics, topic]

  const bookVersionWithProductNumber = (bookVersions) => {
    if (bookVersions && bookVersions.length > 0) {
      return bookVersions.find(
        (version) =>
          version.productNumber !== undefined &&
          version.productNumber.trim() !== ''
      )
    } else {
      return undefined
    }
  }

  return (
    <Layout>
      <SEOHead seo={seo} />
      <Container maxWidth='lg'>
        <Box
          sx={{
            maxWidth: 800,
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
          }}
        >
          <Box mt={[5, 9]}>
            <BookBanner
              bookVersions={bookVersions?.items}
              thumbnail={thumbnail}
              slug={slug}
              title={title}
              authors={authors}
              description={description?.json}
              productNumber={productNumber}
              updateProductNumber={(pn) => setProductNumber(pn)}
            />
          </Box>
          <Box mt={[5, 9]} id='about'>
            <ReadMore
              title='About'
              titleVariant='h4'
              short={description?.json}
              links={description?.links}
              textAlign='left'
              hideSummaryWhenExpanded
            />
          </Box>
          {media && (
            <Box pt={7} pb={2}>
              <CustomBlock item={media} />
            </Box>
          )}
          {!quickRead && chapters?.items?.length > 0 && (
            <Box id='chapters' mt={[5, 9]}>
              <BookToc
                title='Table of contents'
                hasMemberBookAccess={hasMemberBookAccess}
                slug={slug}
                chapters={chapters}
              />
              <ChapterPreview
                digitalFileGuid={bookVersion?.digitalFileGuid}
                hasMemberBookAccess={hasMemberBookAccess}
                bookTitle={bookVersion?.title}
                slug={slug}
                chapters={chapters}
                productNumber={bookVersion?.productNumber}
                price={
                  hasMemberBookPrice
                    ? bookVersion?.priceMember
                    : bookVersion?.priceNonMember
                }
                custom1Value={
                  bookVersion?.taxJar?.taxJarId
                    ? bookVersion?.taxJar.taxJarId
                    : ''
                }
                custom2Value={
                  bookVersion?.royaltyFlag ? bookVersion?.royaltyFlag : false
                }
                custom3Value={authors?.items?.map(
                  (author) =>
                    author?.title + (author?.email ? '/' + author?.email : '')
                )}
                custom4Value={
                  getCartButtonCaptionLabel(bookVersion?.dateRelease) ===
                  constSnipcart.BTN_LABEL_PREORDER
                }
                releaseDate={bookVersion?.dateRelease}
                thumbnail={thumbnail}
                description={description?.json}
                authors={authors}
              />
            </Box>
          )}
          {authors && authors.items.length > 0 && (
            <Box mt={[5, 9]} id='book-authors'>
              <ArticleAuthors
                authors={authors?.items}
                title='About the authors'
              />
            </Box>
          )}
          <Box mt={[5, 9]}>
            <AlternateRows
              title='Book details'
              rows={[
                { 'Product No.': bookVersion?.productNumber },
                { ISBN: isbn },
                {
                  'Release Date': bookVersion?.dateRelease
                    ? dateFormat(
                        bookVersion?.dateRelease || 0 + 'T00:00:00',
                        'mmmm yyyy'
                      )
                    : '',
                },
                { 'Page Count': pageCount },
                {
                  'Member Book': memberBook
                    ? memberBook === 'No'
                      ? 'No'
                      : 'Yes'
                    : 'No',
                },
              ]}
            />
          </Box>

          {topics.length > 0 && (
            <Box id='topics' mt={[5, 9]}>
              <Topics
                title='Topics in this book'
                titleVariant='h4'
                topics={topics}
                contentType='book'
              />
            </Box>
          )}
        </Box>
        <Box my={[5, 9]}>
          <Divider />
        </Box>
        {relatedBooks?.length > 0 && (
          <Box mb={[5, 9]}>
            <HorizontalScroll
              title='Related Books'
              ctaLabel='View all'
              ctaLink={paths.search({
                types: ['book'],
                topics: [topic?.title ? topic?.title : ''],
              })}
              items={relatedBooks}
              type='carttile'
            />
          </Box>
        )}
        <Box my={[5, 9]}>
          <Divider />
        </Box>
        {relatedCollections?.length > 0 && (
          <Box mb={[5, 9]}>
            <HorizontalScroll
              title='Related Collections'
              ctaLabel='View all'
              ctaLink={paths.search({
                types: ['collection'],
              })}
              items={relatedCollections}
              type='collectiontile'
            />
          </Box>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { books: bookData },
  } = await contentfulDirectClient.query({
    query: GET_BOOK_LIST_QUERY,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: Number(process.env.NEXT_STATIC_BUILD_LIMIT || 200),
    },
  })

  return {
    paths: bookData?.items
      ?.filter((item) => !!item.slug)
      ?.map((item) => ({
        params: { book: item.slug },
      })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { books },
  } = await contentfulDirectClient.query({
    query: GET_BOOK,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      where: { slug: params.book },
      limit: 1,
      bookVersionLimit: 5,
      collectionLimit: 1,
      chaptersLimit: 100,
    },
  })

  if (!books || !books?.items?.length) {
    return {
      notFound: true,
    }
  }

  const {
    chapters,
    slug,
    memberBook,
    pageCount,
    media,
    isbn,
    bookVersions,
    thumbnail,
    description,
    seo,
    topic,
    topicSecondary,
    authors,
    quickRead,
    linkedFrom: { collections },
    sys,
    title,
    __typename,
  } = books?.items[0] || null

  const {
    data: { books: relatedBooks },
  } = await contentfulDirectClient.query({
    query: GET_BOOK,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 8,
      bookVersionLimit: 5,
      collectionLimit: 1,
      chaptersLimit: 100,
      where: {
        sys: {
          id_not: sys?.id,
        },
        topic: {
          title: topic?.title || '',
        },
      },
      order: 'datePublished_DESC',
    },
  })

  return {
    props: {
      chapters,
      slug,
      memberBook,
      pageCount,
      media,
      isbn,
      bookVersions,
      seo:
        seo ||
        contentfulAPIToSEOHead({
          title,
          description: description?.json,
          thumbnail,
          sys,
          __typename,
        }),
      topic,
      topicSecondary,
      authors,
      thumbnail,
      description,
      quickRead,
      title,
      relatedBooks: relatedBooks.items,
      relatedCollections: collections.items,
    },
    revalidate: 20,
  }
}
