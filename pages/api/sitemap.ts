import fs from 'fs'
import path from 'path'
import { createGzip } from 'zlib'
import { gql } from '@apollo/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { SitemapStream } from 'sitemap'
import { getContentfulDirectClient } from '../../lib/apollo-client'

interface ContentSlug {
  slug: string
}
interface ChaptersCollectionItems {
  items: ContentSlug[]
}

interface ChaptersCollectionSlug extends ContentSlug {
  chaptersCollection?: ChaptersCollectionItems
}

async function getContentTypeEntries(
  contentType,
  finalContent = [],
  numRet = null,
  iteration = 0
) {
  const contentfulDirectClient = await getContentfulDirectClient()
  const bookCheck = contentType === 'book'
  const additionalfilter =
    contentType === 'page' ? ', where: {excludeIndexPage_not: true}' : ''
  if (numRet < (bookCheck ? 100 : 1000) && numRet !== null) {
    return finalContent
  }
  const content = await contentfulDirectClient.query({
    query: gql`
    query {
      ${contentType}Collection${
      bookCheck
        ? `(limit: 100, skip: ${iteration * 100})`
        : `(limit: 1000, skip: ${iteration * 1000}${additionalfilter})`
    } {
        items {
          slug
          ${bookCheck ? ' chaptersCollection { items { slug }}' : ''}
        }
      }
    }
  `,
  })
  const items = content?.data?.[`${contentType}Collection`]?.items
  return await getContentTypeEntries(
    contentType,
    [...finalContent, ...items],
    items.length,
    iteration + 1
  )
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.NEXT_PUBLIC_BASE_PATH === 'ascd.org') {
    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Content-Encoding', 'gzip')

    const baseUrl = {
      'localhost:3000': 'http://localhost:3000',
      'dev.ascd.org': 'https://dev.ascd.org',
      'stage.ascd.org': 'https://stage.ascd.org',
      'ascd.org': 'https://www.ascd.org',
    }[process.env.NEXT_PUBLIC_BASE_PATH]

    const ignoreList = [
      '.DS_Store',
      '_app.js',
      '_document.js',
      '_error.js',
      'sitemap.xml.js',
      '404.js',
      '500.js',
      '[...slug].js',
      'api',
      'user',
    ]

    /** Directories that contain other pages ie /all or /write */
    const withOtherPages = ['affiliates', 'el', 'people']

    const ignoreListSubPages = ['[slug].js', 'index.js', 'articles']

    const staticPages = fs
      .readdirSync(path.join(__dirname, '..'))
      .filter((staticPage) => {
        return !ignoreList.includes(staticPage)
      })
      .filter((subpath) => path.extname(subpath) === '.js')
      .map((staticPagePath) => {
        return `${baseUrl}/${staticPagePath}`
      })

    const internalStaticPages = withOtherPages
      .filter((subRootDir) =>
        fs.existsSync(`${path.join(__dirname, '..', subRootDir)}`)
      )
      ?.map((subRootDir) => {
        return fs
          .readdirSync(path.join(__dirname, '..', subRootDir))
          .filter((staticPage) => {
            return !ignoreListSubPages.includes(staticPage)
          })
          .filter((subpath) => path.extname(subpath) === '.js')
          .map((subpath) => {
            return `${baseUrl}/${subRootDir}/${subpath}`
          })
      })
      .flat()

    const publications = await getContentTypeEntries('pubissue')
    const books = await getContentTypeEntries('book')
    const articles = await getContentTypeEntries('article')
    const blogs = await getContentTypeEntries('blog')
    const pages = await getContentTypeEntries('page')
    const podcasts = await getContentTypeEntries('book')
    const videos = await getContentTypeEntries('video')
    const webinars = await getContentTypeEntries('webinar')
    const events = await getContentTypeEntries('event')
    const profiles = await getContentTypeEntries('profile')
    const workshops = await getContentTypeEntries('workshop')
    const pressReleases = await getContentTypeEntries('pressRelease')

    const sitemapStream = new SitemapStream()
    const pipeline = sitemapStream.pipe(createGzip())

    staticPages.forEach((url) => {
      sitemapStream.write({
        url: `${url.replace('.js', '').replace('/index', '/')}`,
        lastmod: `${new Date().toISOString()}`,
        changefreq: 'monthly',
        priority: 1.0,
      })
    })

    internalStaticPages.forEach((url) => {
      sitemapStream.write({
        url: `${url.replace('.js', '').replace('/index', '/')}`,
        lastmod: `${new Date().toISOString()}`,
        changefreq: 'monthly',
        priority: 1.0,
      })
    })

    books.forEach((book: ChaptersCollectionSlug) => {
      if (book.chaptersCollection.items.length) {
        sitemapStream.write({
          url: `${baseUrl}/books/${book.slug}`,
          lastmod: `${new Date().toISOString()}`,
          changefreq: 'monthly',
          priority: 1.0,
        })
        book.chaptersCollection.items.forEach((chapter) => {
          sitemapStream.write({
            url: `${baseUrl}/books/${book.slug}?chapter=${chapter?.slug}`,
            lastmod: `${new Date().toISOString()}`,
            changefreq: 'monthly',
            priority: 1.0,
          })
        })
      } else {
        sitemapStream.write({
          url: `${baseUrl}/books/${book.slug}`,
          lastmod: `${new Date().toISOString()}`,
          changefreq: 'monthly',
          priority: 1.0,
        })
      }
    })

    publications.forEach((publication: ContentSlug) => {
      sitemapStream.write({
        url: `${baseUrl}/el/${publication.slug}`,
        lastmod: `${new Date().toISOString()}`,
        changefreq: 'monthly',
        priority: 1.0,
      })
    })

    articles.forEach((article: ContentSlug) => {
      sitemapStream.write({
        url: `${baseUrl}/el/articles/${article.slug}`,
        lastmod: `${new Date().toISOString()}`,
        changefreq: 'monthly',
        priority: 1.0,
      })
    })

    blogs.forEach((blog: ContentSlug) => {
      sitemapStream.write({
        url: `${baseUrl}/blogs/${blog.slug}`,
        lastmod: `${new Date().toISOString()}`,
        changefreq: 'monthly',
        priority: 1.0,
      })
    })

    pages.forEach((page: ContentSlug) => {
      sitemapStream.write({
        url: `${baseUrl}/${page.slug}`,
        lastmod: `${new Date().toISOString()}`,
        changefreq: 'monthly',
        priority: 1.0,
      })
    })

    podcasts.forEach((podcast: ContentSlug) => {
      sitemapStream.write({
        url: `${baseUrl}/podcasts/${podcast.slug}`,
        lastmod: `${new Date().toISOString()}`,
        changefreq: 'monthly',
        priority: 1.0,
      })
    })

    videos.forEach((video: ContentSlug) => {
      sitemapStream.write({
        url: `${baseUrl}/videos/${video.slug}`,
        lastmod: `${new Date().toISOString()}`,
        changefreq: 'monthly',
        priority: 1.0,
      })
    })

    webinars.forEach((webinar: ContentSlug) => {
      sitemapStream.write({
        url: `${baseUrl}/webinars/${webinar.slug}`,
        lastmod: `${new Date().toISOString()}`,
        changefreq: 'monthly',
        priority: 1.0,
      })
    })

    events.forEach((event: ContentSlug) => {
      sitemapStream.write({
        url: `${baseUrl}/events/${event.slug}`,
        lastmod: `${new Date().toISOString()}`,
        changefreq: 'monthly',
        priority: 1.0,
      })
    })

    profiles.forEach((profile: ContentSlug) => {
      sitemapStream.write({
        url: `${baseUrl}/people/${profile.slug}`,
        lastmod: `${new Date().toISOString()}`,
        changefreq: 'monthly',
        priority: 1.0,
      })
    })

    workshops.forEach((workshop: ContentSlug) => {
      sitemapStream.write({
        url: `${baseUrl}/workshops/${workshop.slug}`,
        lastmod: `${new Date().toISOString()}`,
        changefreq: 'monthly',
        priority: 1.0,
      })
    })

    pressReleases.forEach((pressRelease: ContentSlug) => {
      sitemapStream.write({
        url: `${baseUrl}/news-media/${pressRelease.slug}`,
        lastmod: `${new Date().toISOString()}`,
        changefreq: 'monthly',
        priority: 1.0,
      })
    })

    sitemapStream.end()

    // stream write the response
    pipeline.pipe(res).on('error', (err) => {
      throw err
    })
  } else {
    res.status(404).send({ message: 'Sitemap not generated' })
  }
}
