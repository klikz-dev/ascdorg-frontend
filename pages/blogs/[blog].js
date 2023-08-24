import { useRef } from 'react'
import { useRouter } from 'next/router'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Grid, Typography, Skeleton, Container } from '@mui/material'
import ArticleAuthors from '../../components/ArticleComponents/ArticleAuthors'
import ArticleBody from '../../components/ArticleComponents/ArticleBody'
import HeroArticle from '../../components/ArticleComponents/HeroArticle'
import ContentList from '../../components/ContentComponents/ContentList'
import NextImageWrapper from '../../components/images/NextImageWrapper'
import Layout from '../../components/layout'
import SEOHead from '../../components/SEOHead'
import TextCTA from '../../components/TextCta'
import TOCNav from '../../components/TOCNav'
import TopicTag from '../../components/TopicTag'
import { blogsOptions } from '../../const/options'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import {
  contentfulAPIToSEOHead,
  contentfulImageTransformation,
  contentfulThumbnailToImageHeight,
  contentfulThumbnailToImageWidth,
} from '../../lib/data-transformations'
import GET_BLOG_BODY from '../../lib/schema/pages/getBlogBody.graphql'
import GET_BLOG_LIST_QUERY from '../../lib/schema/pages/getBlogList.graphql'
import GET_FULL_BLOG from '../../lib/schema/pages/getFullBlog.graphql'
import GET_PARTIAL_BLOG from '../../lib/schema/pages/getPartialBlog.graphql'
import { convertToSlug, readingTime } from '../../lib/utils'
import paths from '../../paths/path'

export default function Blog({
  body,
  image,
  blurb,
  seo,
  topic,
  topicSecondary,
  authors,
  title,
  slug,
  issueDate,
  relatedBlogs,
}) {
  const router = useRouter()
  const minuteRef = useRef(null)
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

  const toc_items = body?.json?.content
    .filter((node) => node.nodeType == 'heading-2')
    .filter((node) => {
      const title = documentToPlainTextString(node)
      const titleStr = title && typeof title === 'string' ? title : title[1]
      if (titleStr) return true
      return false
    })
    .map((node) => {
      return {
        id: convertToSlug(node),
        label: documentToPlainTextString(node),
      }
    })

  if (blurb) {
    toc_items?.unshift({ id: 'abstract', label: 'Abstract' })
  }

  return (
    <Layout>
      <SEOHead seo={seo} />
      <HeroArticle
        date={issueDate}
        authors={authors}
        tagLabel={'ASCD Blog'}
        tagLink={paths.search({
          types: ['blog'],
        })}
        title={title}
        slug={slug}
        contentType={'blog'}
        minuteRead={() => readingTime(minuteRef)}
      />
      <Grid container>
        <Grid item md={2} xs={false}>
          <Box
            ml={[2, 2, 2, 10]}
            mt={6}
            sx={{
              position: { xs: 'relative', md: 'sticky' },
              top: { md: '250px' },
              zIndex: '1',
            }}
            display={['none', 'none', 'block']}
          >
            <TOCNav
              toc_items={toc_items}
              activeBorderWidth='4px'
              backgroundColor='white'
              borderLeft
              maxWidth='290px'
            />
          </Box>
        </Grid>
        <Grid item md={8} xs={12}>
          <Container
            maxWidth='lg'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& em': {
                display: 'block',
                marginTop: 0.5,
                color: 'grey.light',
              },
            }}
          >
            <Box
              id='abstract'
              sx={{
                width: '100%',
                maxWidth: '674px',
              }}
              my={6}
            >
              <Typography variant='articleAbstract'>
                {documentToReactComponents(blurb?.json, blogsOptions())}
              </Typography>

              <Box
                my={2}
                sx={{
                  '& > div': {
                    mb: 1,
                  },
                }}
              >
                {topic && (
                  <TopicTag
                    key={topic?.title}
                    label={topic?.title}
                    variant='basicSmall'
                    marginRight='8px'
                    textTransform='uppercase'
                    href={paths.search({
                      types: ['blog'],
                      topics: [topic?.title],
                    })}
                  />
                )}
                {topicSecondary?.items
                  ?.filter((topic) => topic)
                  .map((topic, key) => (
                    <TopicTag
                      key={key}
                      label={topic?.title}
                      variant='basicSmall'
                      marginRight='8px'
                      textTransform='uppercase'
                      href={paths.search({
                        types: ['blog'],
                        topics: [topic?.title],
                      })}
                    />
                  ))}
              </Box>
            </Box>
            {image && (
              <Box
                sx={{
                  width: { xs: '100vw', md: '100%' },
                  maxWidth: { md: '850px' },
                  textAlign: 'left',
                }}
                id='piano-hide-1'
              >
                <Box
                  sx={{
                    position: 'relative',
                    maxHeight: '460',
                  }}
                >
                  <Box
                    style={{
                      paddingTop: `${
                        (contentfulThumbnailToImageHeight(image) /
                          contentfulThumbnailToImageWidth(image)) *
                        100
                      }%`,
                    }}
                  />
                  <NextImageWrapper
                    src={contentfulImageTransformation(image)}
                    alt={image?.alternate}
                    layout='fill'
                    objectFit='contain'
                    priority
                  />
                </Box>

                {image &&
                  image?.imageBynder &&
                  image?.imageBynder[0].copyright && (
                    <em>Credit: {image?.imageBynder[0].copyright}</em>
                  )}
              </Box>
            )}
            <Box
              mt={6}
              ml={2}
              display={['block', 'block', 'none']}
              width='100%'
            >
              <TOCNav
                toc_items={toc_items}
                activeBorderWidth='4px'
                activeBorderColor='black'
                backgroundColor='white'
                borderLeft
                maxWidth='290px'
              />
            </Box>
            <Box
              my={6}
              sx={{ maxWidth: '674px', width: '100%' }}
              id='article-body'
            >
              <ArticleBody ref={minuteRef}>
                {documentToReactComponents(
                  body?.json,
                  blogsOptions(body?.links)
                )}
              </ArticleBody>

              {authors && (
                <Box mt={7} id='authors'>
                  <ArticleAuthors authors={authors.items} />
                </Box>
              )}

              <Box mt={9}>
                <TextCTA
                  title='ASCD is dedicated to professional growth and well-being.'
                  description="Let's put your vision into action."
                  ctaLabel='Discover our Professional Learning Services'
                  ctaLink='https://professional-development.ascd.org/get-started?utm_campaign=2022-IS-0809&utm_source=PD&utm_medium=SiteLink&utm_content=PLS_Page'
                  target='_blank'
                />
              </Box>

              {relatedBlogs?.length > 0 && (
                <Box mt={11}>
                  <ContentList
                    title='Related Blogs'
                    ctaLabel='View all'
                    ctaLink={paths.search({
                      types: ['blog', 'article'],
                      topics: [topic?.title],
                    })}
                    items={relatedBlogs}
                    variant='blog'
                  />
                </Box>
              )}
            </Box>
          </Container>
        </Grid>
        <Grid item md={2} xs={12}>
          {relatedBlogs?.length > 0 && (
            <Box width='90%' mt={150} display={['none', 'block']}>
              <ContentList
                title='Related Blogs'
                items={relatedBlogs}
                variant='blog'
                noImage
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Layout>
  )
}

export async function getStaticPaths() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { blogs: blogData },
  } = await contentfulDirectClient.query({
    query: GET_BLOG_LIST_QUERY,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
    },
  })

  return {
    paths: blogData?.items
      ?.filter((item) => !!item.slug)
      ?.map((item) => ({
        params: { blog: item.slug },
      })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { blogs },
  } = await contentfulDirectClient.query({
    query: GET_FULL_BLOG,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 1,
      where: { slug: params.blog },
    },
  })

  if (!blogs || !blogs?.items?.length) {
    return {
      notFound: true,
    }
  }

  const {
    data: { blogs: blogBody },
  } = await contentfulDirectClient.query({
    query: GET_BLOG_BODY,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 1,
      where: { slug: params.blog },
    },
  })

  const {
    image,
    blurb,
    seo,
    topic,
    topicSecondary,
    authors,
    title,
    slug,
    issueDate,
    sys,
    __typename,
  } = blogs?.items[0] || null

  const { body } = blogBody?.items[0] || null

  const {
    data: { blogs: relatedBlogs },
  } = await contentfulDirectClient.query({
    query: GET_PARTIAL_BLOG,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 5,
      where: {
        sys: {
          id_not: sys?.id,
        },
        topic: {
          title: topic?.title || '',
        },
      },
    },
  })

  return {
    props: {
      body,
      image,
      blurb,
      seo:
        seo ||
        contentfulAPIToSEOHead({
          title,
          blurb: blurb?.json,
          body: body?.json,
          image,
          sys,
          __typename,
        }),
      topic,
      topicSecondary,
      authors,
      title,
      issueDate,
      slug,
      relatedBlogs: relatedBlogs.items,
    },
    revalidate: 20,
  }
}
