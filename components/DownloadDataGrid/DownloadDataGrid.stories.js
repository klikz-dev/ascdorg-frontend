import React from 'react'
import DownloadDataGrid from '.'

export default {
  component: DownloadDataGrid,
  title: 'Components/DownloadDataGrid',
}

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

const template = (args) => <DownloadDataGrid {...args} />

//Download data grid
export const Grid = template.bind({})
Grid.args = {
  downloads: downloads,
}
Grid.storyName = 'Download data grid'

//Empty download data grid
export const NoGrid = template.bind({})
NoGrid.args = {
  downloads: [],
}
NoGrid.storyName = 'Empty download data grid'
