import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, within } from '../../../../__test-utils__/test-utils'
import SearchGridSectionItems from './SearchGridSectionItems'

const hits = [
  {
    type: 'article',
    url: '/el/articles/classroom-conversations-conflict-diagnostics-for-difficult-discussions',
    title:
      'Classroom Conversations / Conflict Diagnostics for Difficult Discussions',
    content: 'Somehow, it has all gone wrong. ',
    topic: ['Instructional Strategies', 'Classroom Management'],
    dateTimeStamp: '2021-11-01',
    unixTimeStamp: 1635724800,
    grade: [],
    subject: [],
    role: [],
    keywords: [
      'Restorative practices',
      'Communication',
      'Critical thinking',
      'Listening and speaking',
      'Student Voice',
      'Student engagement and motivation',
    ],
    premium: true,
    author: ['Matthew R. Kay'],
    featured: false,
    thumbnail:
      'https://library.ascd.org/m/693e6326818b02aa/webimage-1121_Kay_VLADGRIN_SHUTTERSTOCK-143906464.jpg',
    objectID: '5AW8Y6NwVY2mpT5Z3ajHgV',
    _highlightResult: {
      type: {
        value: 'article',
        matchLevel: 'none',
        matchedWords: [],
      },
      title: {
        value:
          'Classroom Conversations / Conflict Diagnostics for Difficult Discussions',
        matchLevel: 'none',
        matchedWords: [],
      },
      content: {
        value: 'Somehow, it has all gone wrong. ',
        matchLevel: 'none',
        matchedWords: [],
      },
    },
    __position: 1,
  },
  {
    type: 'article',
    url: '/el/articles/how-to-keep-your-restorative-justice-program-from-failing',
    title: 'How to Keep Your Restorative Justice Program from Failing',
    content:
      'Most of us tend to have little awareness of the medical system as we navigate our daily lives, but we know to call 911 if there is a medical emergency, and we can predict with some reliability what will happen once we make the call. ',
    topic: ['Leadership', 'School Culture', 'Classroom Management'],
    dateTimeStamp: '2021-10-01',
    unixTimeStamp: 1633046400,
    grade: [],
    subject: [],
    role: [],
    keywords: [
      'Restorative practices',
      'Classroom management',
      'District policy & systems',
    ],
    premium: true,
    author: ['Mikhail Lyubansky'],
    featured: false,
    thumbnail:
      'https://library.ascd.org/m/4750d3a6e911a821/webimage-1021_-Lyubansky_Jumpeestudio-_-iStock-502756451.jpg',
    objectID: '1N8spX7LnlOeaRjZGLWmXN',
    _highlightResult: {
      type: {
        value: 'article',
        matchLevel: 'none',
        matchedWords: [],
      },
      title: {
        value: 'How to Keep Your Restorative Justice Program from Failing',
        matchLevel: 'none',
        matchedWords: [],
      },
      content: {
        value: 'Most of us tend to have little awareness of the medical system',
        matchLevel: 'none',
        matchedWords: [],
      },
    },
    __position: 2,
  },
  {
    type: 'article',
    url: '/el/articles/research-matters-does-restorative-justice-work',
    title: 'Research Matters / Does Restorative Justice Work?',
    content:
      'Nationwide, a silent epidemic of out-of-school suspensions has spread across our schools. In 2013–14 (the last year these data were reported nationally), some 2.6 million students were suspended from school, with Black students and boys both being more than twice as likely to be suspended from school as their counterparts (NCES, 2019).',
    topic: ['Leadership', 'School Culture', 'Classroom Management'],
    dateTimeStamp: '2021-10-01',
    unixTimeStamp: 1633046400,
    grade: [],
    subject: [],
    role: [],
    keywords: ['Restorative practices', 'District policy & systems'],
    premium: true,
    author: ['Bryan Goodwin'],
    featured: false,
    thumbnail:
      'https://library.ascd.org/m/6da35f1cbef4afd3/webimage-1021_-Goodwin_Paul-Bradbury-_-iStock-97970807.jpg',
    objectID: '8mHAASat6jQ6xk1MnUPWq',
    _highlightResult: {
      type: {
        value: 'article',
        matchLevel: 'none',
        matchedWords: [],
      },
      title: {
        value: 'Research Matters / Does Restorative Justice Work?',
        matchLevel: 'none',
        matchedWords: [],
      },
      content: {
        value:
          'Nationwide, a silent epidemic of out-of-school suspensions has spread across our schools. In 2013–14 (the last year these data were reported nationally), some 2.6 million students were suspended from school, with Black students and boys both being more than twice as likely to be suspended from school as their counterparts (NCES, 2019). ',
        matchLevel: 'none',
        matchedWords: [],
      },
    },
    __position: 3,
  },
]

const mediaHit = {
  type: 'webinar',
  url: '/webinars/navigating-social-and-emotional-learning-from-the-inside-out-part-two',
  title:
    'Navigating Social and Emotional Learning from the Inside Out, Part Two',
  content:
    'This webinar will review of the Wallace Foundation’s recently released report Navigating SEL from the Inside Out. Author Stephanie M. Jones will review the primary components of the guide and highlight new features, including the addition of prekindergarten and preschool SEL programs, chapters on the intersection of social-emotional learning and trauma-informed practice and equity, and planning- and practice-oriented tools and worksheets.  Download the Handout \n\n\n\n\n\n',
  topic: ['Social-emotional learning'],
  dateTimeStamp: '2021-10-26T15:00-04:00',
  unixTimeStamp: 1635274800,
  premium: false,
  author: ['Stephanie Jones'],
  thumbnail:
    '//images.ctfassets.net/cguvp07qpj80/2f9Jjr9rrtmnvVwxmOm6KW/2b8623970de5fdf6a53defa4a63d626d/Navigating_Social_and_Emotional_Learning_from_the_Inside_Out__Part_Two.png',
  featured: true,
  objectID: '2uoL8bBKiu3dUfXMNj6anW',
  _highlightResult: {
    type: {
      value: 'webinar',
      matchLevel: 'none',
      matchedWords: [],
    },
    title: {
      value:
        'Navigating Social and Emotional Learning from the Inside Out, Part Two',
      matchLevel: 'none',
      matchedWords: [],
    },
    content: {
      value:
        'This webinar will review of the Wallace Foundation’s recently released report Navigating SEL from the Inside Out. Author Stephanie M. Jones will review the primary components of the guide and highlight new features, including the addition of prekindergarten and preschool SEL programs, chapters on the intersection of social-emotional learning and trauma-informed practice and equity, and planning- and practice-oriented tools and worksheets.  Download the Handout \n\n\n\n\n\n',
      matchLevel: 'none',
      matchedWords: [],
    },
  },
  __position: 1,
}

describe('<SearchGridSectionItems />', () => {
  it('component renders without items', () => {
    const { getByTestId } = render(<SearchGridSectionItems testId='jest' />)
    expect(getByTestId('jest')).toBeVisible()
  })
  it('component renders with items', () => {
    const { getByTestId } = render(
      <SearchGridSectionItems testId='jest' hits={hits} />
    )
    expect(getByTestId('jest')).toBeVisible()
  })
  it('component renders large items', () => {
    const { getByTestId } = render(
      <SearchGridSectionItems testId='jest' hits={hits} />
    )
    const component = getByTestId('jest-large-item')
    const items = within(component).getAllByTestId('jest-large-article')
    expect(items.length).toBe(1)
  })
  it('component renders small items', () => {
    const { getByTestId } = render(
      <SearchGridSectionItems testId='jest' hits={hits} />
    )
    const component = getByTestId('jest-small-items')
    const items = within(component).getAllByTestId('jest-small-article')
    expect(items.length).toBe(2)
  })

  it('component renders only 1 small item if any are a media type', () => {
    const { getByTestId } = render(
      <SearchGridSectionItems testId='jest' hits={[mediaHit, hits[1]]} />
    )
    const component = getByTestId('jest-small-items')
    const items = within(component).getAllByTestId('jest-small-article')
    expect(items.length).toBe(1)
  })
})
