import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '../../__test-utils__/test-utils'
import DownloadDataGrid from './DownloadDataGrid'

describe('<DownloadDataGrid />', () => {
  const downloads = [
    {
      id: '266791129_0',
      date: '2021-07-14T04:00:00.000Z',
      shortName:
        'EdTech Essentials: The Top 10 Technology Strategies for All Learning Environments',
      url: 'https://ebusiness.ascd.org/serverfiles/dcdfiles/266791129/EdTech%20Essentials_epub.epub',
    },
    {
      id: '266551752_1',
      date: '2021-06-16T04:00:00.000Z',
      shortName:
        'We Belong: 50 Strategies to Create Community and Revolutionize Classroom Management',
      url: 'https://ebusiness.ascd.org/serverfiles/dcdfiles/266551752/We%20Belong_EPUB.epub',
    },
    {
      id: '265841201_2',
      date: '2021-05-19T04:00:00.000Z',
      shortName:
        'The Equity & Social Justice Education 50: Critical Questions for Improving Opportunities and Outcome',
      url: 'https://ebusiness.ascd.org/serverfiles/dcdfiles/265841201/The%20Equity%20and%20Social%20Justice%20Education%2050_pdf.pdf',
    },
    {
      id: '265588678_3',
      date: '2021-05-03T04:00:00.000Z',
      shortName: 'Improve Every Lesson Plan with SEL',
      url: 'https://ebusiness.ascd.org/serverfiles/dcdfiles/265588678/Improve%20Every%20Lesson%20Plan%20with%20SEL_epub.epub',
    },
    {
      id: '264928238_4',
      date: '2021-01-17T05:00:00.000Z',
      shortName:
        'Stop Leading, Start Building! Turn Your School into a Success Story with the People and Resources Yo',
      url: 'https://ebusiness.ascd.org/serverfiles/dcdfiles/264928238/Stop%20Leading%20Start%20Building_pdf.pdf',
    },
  ]

  it('component renders rows', () => {
    const { getByTestId } = render(
      <DownloadDataGrid testId='jest' downloads={downloads} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest')).toHaveTextContent('EdTech Essentials')
  })

  it('component renders no download message', () => {
    const { getByTestId } = render(
      <DownloadDataGrid testId='jest' downloads={[]} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest')).toHaveTextContent(
      'You do not have any downloads'
    )
  })
})
