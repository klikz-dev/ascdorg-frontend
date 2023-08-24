import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import {
  Box,
  Container,
  Grid,
  Typography,
  Skeleton,
  GlobalStyles,
} from '@mui/material'
import dateFormat from 'dateformat'
import Annotator from '../../../components/AnnotationComponents/Annotator'
import ArticleAuthors from '../../../components/ArticleComponents/ArticleAuthors'
import ArticleBody from '../../../components/ArticleComponents/ArticleBody'
import ArticleEndNote from '../../../components/ArticleComponents/ArticleEndNote'
import ArticleIssue from '../../../components/ArticleComponents/ArticleIssue'
import HeroArticle from '../../../components/ArticleComponents/HeroArticle'
import ContentList from '../../../components/ContentComponents/ContentList'
import NextImageWrapper from '../../../components/images/NextImageWrapper'
import Layout from '../../../components/layout'
import PaywallTemplate from '../../../components/PaywallTemplate'
import PdfIframe from '../../../components/PdfIframe'
import PdfTitleBar from '../../../components/PdfTitleBar'
import ReadMore from '../../../components/ReadMore'
import SEOHead from '../../../components/SEOHead'
import TextCTA from '../../../components/TextCta'
import TOCNav from '../../../components/TOCNav'
import TopicTag from '../../../components/TopicTag'
import { articleOptions } from '../../../const/options'
import { getContentfulDirectClient } from '../../../lib/apollo-client'
import {
  contentfulAPIToSEOHead,
  contentfulImageTransformation,
  contentfulThumbnailToImageWidth,
  contentfulThumbnailToImageHeight,
} from '../../../lib/data-transformations'
import usePaywall from '../../../lib/hooks/usePaywall'
import useUserAccount from '../../../lib/hooks/useUserAccount'
import GET_ARTICLE from '../../../lib/schema/pages/getArticle.graphql'
import GET_ARTICLE_BODY from '../../../lib/schema/pages/getArticleBody.graphql'
import GET_ARTICLE_LIST_QUERY from '../../../lib/schema/pages/getArticleList.graphql'
import GET_ARTICLE_PARENT from '../../../lib/schema/pages/getArticleParent.graphql'
import GET_PARTIAL_ARTICLE from '../../../lib/schema/pages/getPartialArticle.graphql'
import { readingTime, convertToSlug } from '../../../lib/utils'
import paths from '../../../paths/path'

const articlesGlobalStyles = (
  <GlobalStyles
    styles={{
      '.pianoSignupWrapperActive': {
        position: 'relative',
        maxWidth: '675px',
        '&:before': {
          content: '""',
          position: 'absolute',
          bottom: '100%',
          left: 0,
          right: 0,
          height: '200px',
          backgroundImage:
            'linear-gradient(to top, #ffffff 0%, #ffffff 10%, rgba(255, 255, 255, 0) 50%)',
        },
      },
      '.piano-hide-all': {
        display: 'none',
      },
    }}
  />
)

export default function Article({
  body,
  blurb,
  pdf,
  pdfFile,
  seo,
  title,
  volumeNo,
  issueNo,
  issueDate,
  premium,
  topic,
  topicSecondary,
  image,
  references,
  endnotes,
  departmentLabel,
  authors,
  slug,
  sys,
  abstract,
  issue,
  relatedArticles,
}) {
  const minuteRef = useRef(null)
  const router = useRouter()
  const [refresherKey, setRefresherKey] = useState(0)
  const { userAccountUser } = useUserAccount()
  const { remaining, isLoggedIn, expired, isUnlimited } = usePaywall(slug)

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

  if (blurb && !!toc_items?.length) {
    toc_items.unshift({ id: 'abstract', label: 'Abstract' })
  }

  return (
    <>
      {articlesGlobalStyles}
      <Layout>
        <SEOHead seo={seo} />
        {pdf && pdfFile?.file ? (
          <Container>
            <Box my={[5, 10]}>
              <PdfTitleBar
                title={title}
                volume={volumeNo}
                number={issueNo}
                issueDate={dateFormat(issueDate, 'longDate')}
              />
            </Box>

            <Box mb={10}>
              <PdfIframe title={title} pdf={pdfFile?.file} />
            </Box>
          </Container>
        ) : (
          <>
            <HeroArticle
              volumeNo={volumeNo}
              issueNo={issueNo}
              date={issueDate}
              authors={authors}
              tagLabel={departmentLabel?.title}
              tagLink={paths.search({
                types: ['article'],
                departmentLabels: [departmentLabel?.title],
              })}
              title={title}
              slug={slug}
              contentType={'article'}
              minuteRead={() => readingTime(minuteRef)}
            />
            <Grid container>
              <Grid item md={2} xs={false}>
                <Box
                  ml={[2, 2, 2, 10]}
                  my={6}
                  sx={{
                    position: { xs: 'relative', md: 'sticky' },
                    top: { md: '250px' },
                    zIndex: '1',
                  }}
                  display={['none', 'none', 'block']}
                >
                  {toc_items && (
                    <TOCNav
                      toc_items={toc_items}
                      activeBorderWidth='4px'
                      backgroundColor='white'
                      borderLeft
                      maxWidth='290px'
                    />
                  )}
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
                    <Box>
                      <Typography variant='articleAbstract'>
                        {documentToReactComponents(
                          blurb?.json,
                          articleOptions()
                        )}
                      </Typography>
                    </Box>
                    <ReadMore
                      textAlign='left'
                      long={abstract}
                      more='Abstract'
                      less='Show less'
                      buttonSx={{
                        color: 'primary.main',
                        '&:hover': {
                          color: 'primary.main',
                          backgroundColor: 'background.light',
                        },
                      }}
                      hideSummaryWhenExpanded
                      bodySx={{
                        fontFamily: 'Literata, Poppins, Arial',
                        fontSize: (theme) => theme.typography.pxToRem(18),
                        fontWeight: 300,
                        lineHeight: (theme) => theme.typography.pxToRem(30),
                        letterSpacing: 0.2,
                      }}
                    />
                    <Box
                      my={2}
                      sx={{
                        '& > div': {
                          mb: 1,
                        },
                      }}
                    >
                      {premium && (
                        <TopicTag
                          label='Premium Resource'
                          variant='premium'
                          marginRight='15px'
                          textTransform='uppercase'
                        />
                      )}
                      {topic && (
                        <TopicTag
                          key={topic?.title}
                          label={topic?.title}
                          variant='basicSmall'
                          marginRight='8px'
                          textTransform='uppercase'
                          href={paths.search({
                            types: ['article'],
                            topics: [topic?.title],
                          })}
                        />
                      )}
                      {topicSecondary?.items.map((topic, key) => (
                        <TopicTag
                          key={key}
                          label={topic?.title}
                          variant='basicSmall'
                          marginRight='8px'
                          textTransform='uppercase'
                          href={paths.search({
                            types: ['article'],
                            topics: [topic?.title],
                          })}
                        />
                      ))}
                    </Box>
                    {!isUnlimited && !expired && (
                      <PaywallTemplate
                        articleCount={remaining}
                        isLoggedIn={isLoggedIn}
                      />
                    )}
                    {expired && (
                      <Box
                        sx={{
                          position: 'relative',
                          textAlign: 'center',
                          padding: '25px 0',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            bottom: '100%',
                            left: '0',
                            right: '0',
                            height: '200px',
                            backgroundImage:
                              'linear-gradient(to top, #ffffff 0%, #ffffff 10%, rgba(255, 255, 255, 0) 50%)',
                          },
                        }}
                        id='paywall-hide-on-print'
                      >
                        <Typography
                          variant='h1'
                          sx={{
                            fontSize: '28px !important',
                            lineHeight: '30px !important',
                            fontWeight: '600 !important',
                            color: '#333',
                          }}
                        >
                          You&apos;re out of free articles for this month.
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '17px !important',
                            fontWeight: '400 !important',
                            color: '#333',
                            my: '10px',
                          }}
                        >
                          <Link href='/memberships'>
                            <a target='_blank'>
                              <Typography
                                variant='medium-link'
                                sx={{
                                  fontWeight: '400 !important',
                                  color: '#0000EE !important',
                                }}
                              >
                                Click here
                              </Typography>
                            </a>
                          </Link>
                          &nbsp;to subscribe for unlimited access.
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  {!expired && image && (
                    <Box
                      sx={{
                        width: { xs: '100vw', md: '100%' },
                        maxWidth: { md: '850px' },
                        textAlign: 'left',
                      }}
                      id='paywall-hide-1'
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
                    {toc_items && (
                      <TOCNav
                        toc_items={toc_items}
                        activeBorderWidth='4px'
                        activeBorderColor='black'
                        backgroundColor='white'
                        borderLeft
                        maxWidth='290px'
                      />
                    )}
                  </Box>
                  {!expired && (
                    <Box
                      sx={{
                        width: '100%',
                        maxWidth: '674px',
                      }}
                      my={6}
                      id='paywall-hide-2'
                    >
                      <ArticleBody ref={minuteRef}>
                        {documentToReactComponents(
                          body?.json,
                          articleOptions(body?.links)
                        )}
                      </ArticleBody>

                      {references?.json && references?.json.content.length > 0 && (
                        <Box mt={6} id='references'>
                          <ArticleEndNote
                            title='References'
                            notes={references?.json}
                          />
                        </Box>
                      )}
                      {endnotes && endnotes?.json.content.length > 0 && (
                        <Box mt={6} id='endnotes'>
                          <ArticleEndNote
                            title='End Notes'
                            notes={endnotes?.json}
                          />
                        </Box>
                      )}
                      {authors.items && (
                        <Box mt={7} id='authors'>
                          <ArticleAuthors authors={authors.items} />
                        </Box>
                      )}

                      <Box mt={9}>
                        <TextCTA
                          title="ASCD is a community dedicated to educators' professional growth and well-being."
                          ctaLabel="Discover ASCD's Professional Learning Services"
                          description='Let us help you put your vision into action.'
                          ctaLink='https://professional-development.ascd.org/get-started?utm_campaign=2022-IS-0809&utm_source=PD&utm_medium=SiteLink&utm_content=PLS_Page'
                          target='_blank'
                        />
                      </Box>

                      {relatedArticles?.length > 0 && (
                        <Box mt={11}>
                          <ContentList
                            title='Related Articles'
                            ctaLabel='View all'
                            ctaLink={paths.search({
                              types: ['blog', 'article'],
                              topics: [topic?.title],
                            })}
                            items={relatedArticles}
                            variant='article'
                            lines={2}
                          />
                        </Box>
                      )}
                    </Box>
                  )}
                </Container>
              </Grid>
              <Grid item md={2} xs={12}>
                {relatedArticles.length > 0 && (
                  <Box width='90%' mt={150} display={['none', 'none', 'block']}>
                    <ContentList
                      title='Related Articles'
                      items={relatedArticles}
                      variant='article'
                      noImage
                      lines={3}
                    />
                  </Box>
                )}

                {issue && (
                  <Box
                    mt={[0, 0, 100]}
                    mb={8}
                    width='100%'
                    display='flex'
                    justifyContent={['center', 'center', 'flex-start']}
                  >
                    <ArticleIssue
                      thumbnail={issue.thumbnail}
                      title={issue?.title}
                      slug={issue.slug}
                    />
                  </Box>
                )}

                {userAccountUser && userAccountUser.uid && (
                  <Annotator
                    userId={userAccountUser.uid}
                    contentId={sys.id}
                    contentTitle={title}
                    contentImgSrc={contentfulImageTransformation(image)}
                    contentSlug={slug}
                    // updateSidebar={(status) => setSidebar(status)}
                    domId='articleBody'
                    reload={() => setRefresherKey(Math.random())}
                    refresherKey={refresherKey}
                  />
                )}
              </Grid>
            </Grid>
          </>
        )}
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { articles: articleData },
  } = await contentfulDirectClient.query({
    query: GET_ARTICLE_LIST_QUERY,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: Number(process.env.NEXT_STATIC_BUILD_LIMIT || 200),
    },
  })

  return {
    paths: articleData?.items
      ?.filter((item) => !!item.slug)
      ?.map((item) => ({
        params: { article: item.slug },
      })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { articles },
  } = await contentfulDirectClient.query({
    query: GET_ARTICLE,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 1,
      where: { slug: params.article },
    },
  })

  if (!articles || !articles?.items?.length) {
    return {
      notFound: true,
    }
  }

  const {
    data: { articles: articleBody },
  } = await contentfulDirectClient.query({
    query: GET_ARTICLE_BODY,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 1,
      where: { slug: params.article },
    },
  })

  const {
    data: { articles: parentIssue },
  } = await contentfulDirectClient.query({
    query: GET_ARTICLE_PARENT,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 1,
      where: { slug: params.article },
    },
  })

  const {
    blurb,
    pdf,
    pdfFile,
    seo,
    title,
    volumeNo,
    issueNo,
    issueDate,
    premium,
    topic,
    topicSecondary,
    image,
    references,
    endnotes,
    departmentLabel,
    authors,
    slug,
    sys,
    abstract,
    __typename,
  } = articles?.items[0] || null

  const { body } = articleBody?.items[0] || null

  const { linkedFrom } = parentIssue?.items[0] || null

  const issue = linkedFrom?.issue?.items?.[0] || null

  const {
    data: { articles: relatedArticles },
  } = await contentfulDirectClient.query({
    query: GET_PARTIAL_ARTICLE,
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
      order: 'issueDate_DESC',
    },
  })

  return {
    props: {
      body,
      blurb,
      pdf,
      pdfFile,
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
      title,
      volumeNo,
      issueNo,
      issueDate,
      premium,
      topic,
      topicSecondary,
      image,
      references,
      endnotes,
      departmentLabel,
      authors,
      slug,
      sys,
      abstract,
      issue,
      relatedArticles: relatedArticles?.items || null,
    },
    revalidate: 20,
  }
}
