import { useRouter } from 'next/router'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Container, Skeleton, Typography } from '@mui/material'
import ContentList from '../../components/ContentComponents/ContentList'
import HorizontalScroll from '../../components/HorizontalScroll'
import Layout from '../../components/layout'
import ProfileHeader from '../../components/ProfileHeader'
import ReadMore from '../../components/ReadMore'
import SEOHead from '../../components/SEOHead'
import Topics from '../../components/Topics'
import TwoColumnCta from '../../components/TwoColumnCta'
import VideoPlaylist from '../../components/VideoComponents/VideoPlaylist'
import { getContentfulDirectClient } from '../../lib/apollo-client'
import {
  contentfulImageTransformation,
  contentfulAPIToSEOHead,
} from '../../lib/data-transformations'
import GET_PROFILE from '../../lib/schema/pages/getProfile.graphql'
import GET_PROFILE_LIST_QUERY from '../../lib/schema/pages/getProfileList.graphql'
import GET_PROFILE_SUMMARY from '../../lib/schema/pages/getProfileSummary.graphql'
import paths from '../../paths/path'

export default function AuthorDetails({
  profileType,
  expertise,
  areasOfExpertise,
  seo,
  description,
  firstName,
  lastName,
  thumbnail,
  email,
  instagram,
  twitter,
  facebook,
  youTube,
  linkedIn,
  role,
  experience,
  position,
  videos,
  articles,
  blogs,
  books,
}) {
  const router = useRouter()
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

  const isAuthor = profileType?.items?.some((e) => e.title === 'Author')

  const primaryTopics = expertise
    ? expertise?.items
        ?.filter((item) => !!item)
        ?.reduce((unique, o) => {
          if (!unique.includes(o)) {
            unique.push(o)
          }
          return unique
        }, [])
        .sort()
    : null

  const expertises = areasOfExpertise
    ? areasOfExpertise?.items
        ?.filter((item) => !!item)
        .reduce((unique, o) => {
          if (!unique.includes(o)) {
            unique.push(o)
          }
          return unique
        }, [])
        .sort()
    : null

  const featuredBooks = books
    ?.map((book) => {
      const bookVersion = book?.bookVersions?.items?.find((version) => {
        version?.bookType?.title !== 'Quick Reference Guides'
      })
      return { ...book, bookVersions: { items: [bookVersion] } }
    })
    ?.filter((book) => book.featured && !!book?.bookVersions?.items?.length)

  return (
    <Layout>
      <SEOHead seo={seo} />
      <ProfileHeader
        thumbnail={thumbnail}
        email={email}
        instagram={instagram}
        twitter={twitter}
        facebook={facebook}
        youTube={youTube}
        linkedIn={linkedIn}
        firstName={firstName}
        lastName={lastName}
        role={role}
        experience={experience}
        position={position}
      />

      <Container maxWidth='lg'>
        <Box
          sx={{
            width: '100%',
            maxWidth: '850px',
            margin: 'auto',
          }}
        >
          <Box mt={10} id='about'>
            <ReadMore
              title='About'
              short={description?.json}
              links={description?.links}
              textAlign='left'
              titleVariant='h4'
              hideSummaryWhenExpanded
            />
          </Box>
          {primaryTopics?.length > 0 && (
            <Box mt={10} width='100%'>
              <Topics
                title='Primary Topics'
                topics={primaryTopics}
                titleVariant='h4'
              />
            </Box>
          )}
          {expertises?.length > 0 && (
            <Box mt={10} width='100%'>
              <Topics
                title='Areas Of Expertise'
                topics={expertises}
                filter='keywords'
                titleVariant='h4'
              />
            </Box>
          )}
        </Box>
        {isAuthor && (
          <Box mt={10}>
            {featuredBooks.length > 0 && (
              <TwoColumnCta
                testId='people-featured-2-col-cta'
                label='Featured'
                title={featuredBooks[0].title}
                description={documentToReactComponents(
                  featuredBooks[0].description?.json
                )}
                imagePos='right'
                image={contentfulImageTransformation(
                  featuredBooks[0]?.featuredImage
                )}
                imageAlt={featuredBooks[0].featuredImage?.title}
                ctaItems={[
                  {
                    __typename: 'ButtonLinkComponent',
                    linkUrl: paths.book({
                      slug: featuredBooks[0].slug,
                      variant: featuredBooks[0]?.bookVersions[0]?.productNumber
                        ? featuredBooks[0]?.bookVersions[0]?.productNumber
                        : '',
                    }),
                    linkLabel: 'Shop',
                  },
                ]}
                variant='grey'
              />
            )}
          </Box>
        )}
      </Container>

      {isAuthor && articles.length > 0 && (
        <Box
          mt={10}
          sx={{
            width: '100%',
            bgcolor: 'background.lightGrey',
          }}
        >
          <Container maxWidth='lg'>
            <Box
              py={10}
              sx={{
                width: '100%',
                maxWidth: '674px',
                margin: 'auto',
              }}
            >
              <ContentList
                title={`Articles by ${firstName}`}
                ctaLabel='View all'
                ctaLink={paths.search({
                  types: ['blog', 'article'],
                  authors: [`${firstName} ${lastName}`],
                })}
                items={articles}
                variant='article'
              />
            </Box>
          </Container>
        </Box>
      )}
      {isAuthor && blogs.length > 0 && (
        <Box
          mt={10}
          sx={{
            width: '100%',
            backgroundColor: 'background.lightGrey',
          }}
        >
          <Container maxWidth='lg'>
            <Box
              py={10}
              sx={{
                width: '100%',
                maxWidth: '674px',
                margin: 'auto',
              }}
            >
              <ContentList
                title={`Blogs by ${firstName}`}
                ctaLabel='View all'
                ctaLink={paths.search({
                  types: ['blog', 'article'],
                  authors: [`${firstName} ${lastName}`],
                })}
                items={blogs}
                variant='blog'
              />
            </Box>
          </Container>
        </Box>
      )}
      <Container maxWidth='lg'>
        {isAuthor && videos.length > 0 && (
          <Box mt={10} width='100%'>
            <Typography variant='h4'>Videos by {firstName}</Typography>
            {!!videos[0] && (
              <VideoPlaylist
                topic={videos[0]?.topic}
                videoId={videos[0]?.videoId}
                premium={videos[0]?.premium}
                title={videos[0]?.title}
                date={videos[0]?.date}
                videos={videos}
                type='video'
              />
            )}
          </Box>
        )}

        {isAuthor && books.length > 0 && (
          <Box mt={10} width='100%'>
            <HorizontalScroll
              title={'Books by ' + firstName}
              ctaLabel='View All'
              ctaLink={paths.search({
                types: ['book'],
                authors: [`${firstName} ${lastName}`],
              })}
              items={books}
              type='carttile'
            />
          </Box>
        )}

        <Box my={10}>
          {isAuthor && (
            <TwoColumnCta
              testId='people-write-for-2-col-cta'
              title='Write for ASCD'
              description='We publish insightful, actionable, relevant work from educators across all levels of education that help educators learn, teach and lead.'
              ctaItems={[
                {
                  __typename: 'ButtonLinkComponent',
                  linkUrl: '/write-for-ascd',
                  linkLabel: 'Learn more',
                },
              ]}
              image='/images/write_for_ascd.svg'
              imagePos='right'
              variant='grey'
            />
          )}
        </Box>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { profiles: profileData },
  } = await contentfulDirectClient.query({
    query: GET_PROFILE_LIST_QUERY,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: Number(process.env.NEXT_STATIC_BUILD_LIMIT || 200),
    },
  })

  return {
    paths: profileData?.items
      ?.filter((item) => !!item.slug)
      ?.map((item) => ({
        params: { profile: item.slug },
      })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const contentfulDirectClient = await getContentfulDirectClient()
  const {
    data: { profiles },
  } = await contentfulDirectClient.query({
    query: GET_PROFILE,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 1,
      articleLimit: 30,
      bookLimit: 14,
      videoLimit: 10,
      where: { slug: params.profile },
    },
  })

  const {
    data: { profiles: profileSummary },
  } = await contentfulDirectClient.query({
    query: GET_PROFILE_SUMMARY,
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      limit: 1,
      where: { slug: params.profile },
    },
  })

  if (!profiles || !profiles?.items?.length) {
    return {
      notFound: true,
    }
  }

  const {
    profileType,
    expertise,
    areasOfExpertise,
    seo,
    instagram,
    twitter,
    facebook,
    youTube,
    linkedIn,
    role,
    experience,
    position,
    __typename,
    linkedContent: { blogs, articles, videos, books },
  } = profiles?.items[0] || null

  const { description, title, sys, firstName, lastName, email, thumbnail } =
    profileSummary?.items[0] || null

  return {
    props: {
      profileType,
      expertise,
      areasOfExpertise,
      seo:
        seo ||
        contentfulAPIToSEOHead({
          title,
          description: description?.json,
          thumbnail,
          sys,
          __typename,
        }),
      description,
      firstName,
      lastName,
      thumbnail,
      email,
      instagram,
      twitter,
      facebook,
      youTube,
      linkedIn,
      role,
      experience,
      position,
      /**
       * These contents cannot be ordered from linkedFrom in profiles,
       * and there is no other query possible to grab content via the author sys id.
       * Thus, we need to grab more than possible of the content and order and slice
       * it ourselves.
       */
      videos: videos?.items,
      articles: [...articles?.items]
        .filter((item) => !!item)
        .sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate))
        .slice(0, 4),
      blogs: [...blogs?.items]
        .filter((item) => !!item)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4),
      books: books?.items,
    },
    revalidate: 20,
  }
}
