import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, within } from '../../../../__test-utils__/test-utils'
import AccordionItem from '../AccordionComponents/AccordionItem'
import SearchAccordion from './SearchAccordion'

describe('<SearchAccordion />', () => {
  const hits = [
    {
      date: 2022,
      type: 'futureIssues',
      title: 'February 2022: Equity Every Day',
      deadline: 'September 1, 2021',
      details: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [
                  {
                    type: 'bold',
                  },
                ],
                value: 'Equity Every Day',
                nodeType: 'text',
              },
            ],
            nodeType: 'paragraph',
          },
        ],
      },
      __position: 1,
    },
    {
      date: 2021,
      type: 'futureIssues',
      title: 'May 2022: Ready for the Real World?',
      deadline: 'December 1, 2021',
      details: {
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [
                  {
                    type: 'bold',
                  },
                ],
                value: 'Ready for the Real World?',
                nodeType: 'text',
              },
            ],
            nodeType: 'paragraph',
          },
        ],
      },
      __position: 2,
    },
  ]
  it('component renders', () => {
    const { getByTestId } = render(
      <SearchAccordion testId='jest' hits={[]} SearchItem={AccordionItem} />
    )
    expect(getByTestId('jest')).toBeVisible()
  })

  it('component renders out correct number of hits', () => {
    const { getByTestId } = render(
      <SearchAccordion testId='jest' hits={hits} SearchItem={AccordionItem} />
    )
    const component = getByTestId('jest')
    const items = within(component).getAllByTestId('jest-search-item')
    expect(items.length).toBe(2)
  })
})
