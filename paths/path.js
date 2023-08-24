import qs from 'qs'

export default {
  about: '/about',

  contact: '/contact',

  events: '/events',

  podcasts: '/podcasts',

  videos: '/videos',

  webinars: '/webinars',

  // EL.
  el({ slug }) {
    return `/el/${slug}`
  },

  // Profile.
  authors: '/authors',
  author({ slug }) {
    return `/people/${slug}`
  },
  profile({ slug }) {
    return `/people/${slug}`
  },

  //Activate
  activate: '/activate',

  //Communities
  communities: 'communities',

  //Services
  services: 'services',

  //Subscribe
  subscribe: '/memberships',

  //Subscribe
  membershipDetails: '/membership-details',

  //account
  account({ slug }) {
    if (slug) {
      return `/account/${slug}`
    } else {
      return '/account'
    }
  },

  // EL Articles.
  article({ slug }) {
    return `/el/articles/${slug}`
    // return {
    //   href: `/el/articles/${slug}`,
    //   as: `/el/articles/${slug}`,
    // }
  },

  // Blogs.
  blog({ slug }) {
    return `/blogs/${slug}`
  },

  // Workshops.
  workshop({ slug }) {
    if (slug) {
      return `/workshops/${slug}`
    } else {
      return '/workshops'
    }
  },

  // FAQs.
  faq({ slug }) {
    return `/faq?service=${slug}`
  },

  // Podcasts.
  podcast({ slug }) {
    return `/podcasts/${slug}`
  },

  // Videos.
  video({ slug }) {
    return `/videos/${slug}`
  },

  // Webinars.
  webinar({ slug }) {
    return `/webinars/${slug}`
  },

  // Events.
  event({ slug }) {
    return `/events/${slug}`
  },

  // Search.
  search({
    query,
    sortBy,
    types = [],
    topics = [],
    keywords = [],
    grades = [],
    subjects = [],
    roles = [],
    bookFilters = [],
    authors = [],
    featured = [],
    premium = [],
    departmentLabels = [],
  }) {
    const queryObject = {
      ...(sortBy ? { sortBy } : {}),
      ...(query ? { query } : {}),
      refinementList: {
        ...(types.length ? { type: types } : {}),
        ...(topics.length ? { topic: topics } : {}),
        ...(keywords.length ? { keywords } : {}),
        ...(grades.length ? { grade: grades } : {}),
        ...(subjects.length ? { subject: subjects } : {}),
        ...(roles.length ? { role: roles } : {}),
        ...(bookFilters.length ? { bookFilters } : {}),
        ...(authors.length ? { author: authors } : {}),
        ...(departmentLabels.length
          ? { departmentLabel: departmentLabels }
          : {}),
        ...(featured.length ? { featured } : {}),
        ...(premium.length ? { premium } : {}),
        ...(roles.length ? { role: roles } : {}),
      },
    }
    return `/search?${qs.stringify(queryObject)}`
  },

  // Books
  book({ slug, variant = null }) {
    if (variant) return `/books/${slug}?variant=${variant}`
    return `/books/${slug}`
  },

  // Collection
  collection({ slug }) {
    return `/collections/${slug}`
  },
}
