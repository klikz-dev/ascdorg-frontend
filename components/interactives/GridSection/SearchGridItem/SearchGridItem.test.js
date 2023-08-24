import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../../../__test-utils__/test-utils'
import SearchGridItem from './SearchGridItem'

const articleItem = {
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
}

const mediaItem = {
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

describe('<SearchGridItem />', () => {
  it('component renders when item is an article item', () => {
    const { getByTestId } = render(
      <SearchGridItem testId='jest' item={articleItem} />
    )
    expect(getByTestId('jest-article')).toBeVisible()
  })
  it('component renders when item is a media item', () => {
    const { getByTestId } = render(
      <SearchGridItem testId='jest' item={mediaItem} />
    )
    expect(getByTestId('jest-media')).toBeVisible()
  })
  it('component renders when item is an article item with submedia', () => {
    const { getByTestId } = render(
      <SearchGridItem testId='jest' item={articleItem} submedia />
    )
    expect(getByTestId('jest-article')).toBeVisible()
  })
  it('component renders when item is a media item', () => {
    const { getByTestId } = render(
      <SearchGridItem testId='jest' item={mediaItem} submedia />
    )
    expect(getByTestId('jest-media')).toBeVisible()
  })
})
