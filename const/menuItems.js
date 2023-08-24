import {
  Contacts,
  EventAvailable,
  ExpandMore,
  People,
  Widgets,
} from '@mui/icons-material'

const menuItems = [
  {
    id: 'menu-resources',
    testId: 'menu-resources',
    label: 'Resources',
    labelIcon: (
      <Widgets
        sx={{
          color: 'primary.light',
          display: { xs: 'none', sm: 'unset' },
        }}
      />
    ),
    startIcon: <Widgets />,
    endIcon: <ExpandMore />,
    items: [
      {
        label: 'All Resources',
        href: '/resources',
        testId: 'resources-link',
      },
      {
        label: 'Books',
        href: '/books',
        testId: 'books-link',
      },
      {
        label: 'EL Magazine',
        href: '/el',
        testId: 'el-link',
      },
      {
        label: 'Blog',
        href: '/blogs',
        testId: 'blogs-link',
      },
      {
        label: 'Videos & Podcasts',
        href: '/videos',
        testId: 'videos-link',
      },
    ],
    ctaViewAll: '/resources',
    rightLinks: [
      {
        label: 'Write for ASCD',
        href: '/write-for-ascd',
        testId: 'write-for-ascd-link',
      },
      {
        label: 'Meet our Authors',
        href: '/authors',
        testId: 'authors-link',
      },
      {
        label: 'Courses',
        href: 'https://pdo.ascd.org/',
        testId: 'pdo-link',
      },
      {
        label: 'Collections',
        href: '/book-collections',
        testId: 'collections-link',
      },
      {
        label: 'Leadership Summaries',
        href: '/leadership-summaries',
        testId: 'leadership-link',
      },
      {
        label: 'Quick Reference Guides',
        href: '/quick-reference-guides',
        testId: 'qrg-link',
      },
    ],
  },
  {
    id: 'menu-events',
    testId: 'menu-events',
    label: 'Events',
    labelIcon: (
      <EventAvailable
        sx={{
          color: 'primary.light',
          display: { xs: 'none', sm: 'unset' },
        }}
      />
    ),
    startIcon: <EventAvailable />,
    endIcon: <ExpandMore />,
    items: [
      {
        label: 'ASCD Events',
        href: '/events',
        testId: 'events-link',
      },
      {
        label: 'Annual Conference',
        href: '/events/annual-conference',
        testId: 'annual-conference-link',
      },
      {
        label: 'Learning Labs',
        href: '/events/learning-labs',
        testId: 'learning-labs-link',
      },
      {
        label: 'Leadership Summit',
        href: '/events/leadership-summit',
        testId: 'leadership-summit-link',
      },
      {
        label: 'Author Workshops',
        href: '/workshops',
        testId: 'author-workshops-link',
      },
      {
        label: 'Webinars',
        href: '/webinars',
        testId: 'webinars-link',
      },
    ],
    rightLinks: [
      {
        label: 'Past Webinars',
        href: '/webinars',
        testId: 'past-webinars-link',
      },
      {
        label: 'Conference Proposals',
        href: 'https://events.ascd.org/proposals',
        testId: 'conference-proposals-link',
      },
      {
        label: 'Sponsors & Exhibitors',
        href: '/sponsors-exhibitors',
        testId: 'sponsors-link',
      },
    ],
  },
  {
    id: 'menu-services',
    testId: 'menu-services',
    label: 'Services',
    labelIcon: (
      <Contacts
        sx={{
          color: 'primary.light',
          display: { xs: 'none', sm: 'unset' },
        }}
      />
    ),
    startIcon: <Contacts />,
    endIcon: <ExpandMore />,
    items: [
      {
        label: 'Our Services',
        href: '/services',
        testId: 'services-link',
      },
      {
        label: 'Professional Learning Services',
        href: '/professional-learning-services',
        testId: 'pls-link',
      },
      {
        label: 'WITSBY',
        href: '/witsby',
        testId: 'witsby-link',
      },
      {
        label: 'Author Workshops',
        href: '/workshops',
        testId: 'workshops-services-link',
      },
      {
        label: 'ACTIVATE',
        href: 'https://activate.ascd.org/',
        testId: 'activate-link',
      },
      {
        label: 'Communities',
        href: '/communities',
        testId: 'communities-link',
      },
    ],
  },
  {
    id: 'menu-membership',
    testId: 'menu-membership',
    label: 'Membership',
    labelIcon: (
      <People
        sx={{
          color: 'primary.light',
          display: { xs: 'none', sm: 'unset' },
        }}
      />
    ),
    startIcon: <People />,
    endIcon: <ExpandMore />,
    items: [
      {
        label: 'Join Now',
        href: '/memberships',
        testId: 'memberships-link',
      },
      {
        label: 'Institutional Membership',
        href: '/institutional-membership',
        testId: 'inst-membership-link',
      },
      {
        label: 'Member Benefits',
        href: '/membership-details',
        testId: 'benefits-link',
      },
      {
        label: 'Member Books',
        href: '/member-books',
        testId: 'member-books-link',
      },
    ],
  },
  {
    id: 'menu-activateHome',
    testId: 'menu-activate-home',
    label: 'Activate Home',
    href: 'https://activate.ascd.org/Activate',
    items: [],
  },
]

/** footer menu items */

export const about = [
  {
    label: 'Who we are',
    href: '/about',
    testId: 'about-footer-link',
  },
  {
    label: 'Career opportunities',
    href: '/career-opportunities',
    testId: 'career-footer-link',
  },
  {
    label: 'News & Media',
    href: '/news-media',
    testId: 'news-media-footer-link',
  },
  {
    label: 'Contact',
    href: '/contact',
    testId: 'contact-footer-link',
  },
]

export const involved = [
  {
    label: 'Membership',
    href: '/memberships',
    testId: 'memberships-footer-link',
  },
  {
    label: 'Affiliates',
    href: '/affiliates',
    testId: 'affiliates-footer-link',
  },
  {
    label: 'Emerging Leaders',
    href: '/emerging-leaders',
    testId: 'leaders-footer-link',
  },
  {
    label: 'Communities',
    href: '/communities',
    testId: 'communities-footer-link',
  },
  {
    label: 'Write for ASCD',
    href: '/write-for-ascd',
    testId: 'write-for-ascd-footer-link',
  },
]

export const partner = [
  {
    label: 'Advertisers',
    href: '/advertisers',
    testId: 'advertisers-footer-link',
  },
  {
    label: 'Distributors',
    href: '/distributors',
    testId: 'distributors-footer-link',
  },
  {
    label: 'Event Sponsors',
    href: '/sponsors-exhibitors',
    testId: 'sponsors-footer-link',
  },
  {
    label: 'Exhibitors',
    href: '/sponsors-exhibitors',
    testId: 'exhibitors-footer-link',
  },
]

export default menuItems
