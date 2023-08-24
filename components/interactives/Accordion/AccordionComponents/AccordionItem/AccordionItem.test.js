import React from 'react'
import Router from 'next/router'
import { RouterContext } from 'next-server/dist/lib/router-context'
import {
  render,
  fireEvent,
  waitFor,
  act,
} from '../../../../../__test-utils__/test-utils'
import '@testing-library/jest-dom/extend-expect'
import AccordionItem from './AccordionItem'

describe('<AccordionItem />', () => {
  const item = {
    type: 'faq',
    url: '/faq?service=i-enrolled-in-a-pd-online-course-how-do-i-access-my-course',
    slug: 'i-enrolled-in-a-pd-online-course-how-do-i-access-my-course',
    title: 'I enrolled in a PD Online course. How do I access my course? ',
    content:
      'If you are enrolled in the ASCD Activate Professional Learning Library, go to ASCD Activate  to access your PD Online courses and other digital resources. If you are not an Activate subscriber, go to the PD Online home page  to access your courses.',
    details: {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: 'If you are enrolled in the ',
              nodeType: 'text',
            },
            {
              data: {
                uri: 'https://activate.ascd.org/Activate',
              },
              content: [
                {
                  data: {},
                  marks: [],
                  value: 'ASCD Activate',
                  nodeType: 'text',
                },
              ],
              nodeType: 'hyperlink',
            },
            {
              data: {},
              marks: [],
              value:
                ' Professional Learning Library, go to ASCD Activate  to access your PD Online courses and other digital resources. If you are not an Activate subscriber, go to the ',
              nodeType: 'text',
            },
            {
              data: {
                uri: 'http://pdo.ascd.org/home.aspx?ReturnUrl=%2fDefault.aspx',
              },
              content: [
                {
                  data: {},
                  marks: [],
                  value: 'PD Online home page',
                  nodeType: 'text',
                },
              ],
              nodeType: 'hyperlink',
            },
            {
              data: {},
              marks: [],
              value: '  to access your courses.',
              nodeType: 'text',
            },
          ],
          nodeType: 'paragraph',
        },
      ],
      nodeType: 'document',
    },
    topic: ['PD Online Courses'],
  }
  const accordionSummaryContent = <p>summary</p>
  const accordionDetailsContent = <p>details</p>
  it('component renders', () => {
    const { getByTestId } = render(
      <RouterContext.Provider value={Router}>
        <AccordionItem testId='jest' item={item} />
      </RouterContext.Provider>
    )
    expect(getByTestId('jest')).toBeVisible()
  })

  it('clicking the open button expands the accordion', () => {
    const { getByTestId } = render(
      <RouterContext.Provider value={Router}>
        <AccordionItem
          testId='jest'
          item={item}
          expandText='expand'
          collapseText='collapse'
        />
      </RouterContext.Provider>
    )
    expect(getByTestId('jest-expand-icon-text')).toHaveTextContent('expand')
    waitFor(() => {
      act(() => {
        fireEvent.click(getByTestId('jest-expand-icon-button'))
      })
      expect(getByTestId('jest-details')).toBeVisible()
      expect(getByTestId('jest-expand-icon-text')).toHaveTextContent('collapse')
    })
  })

  it('renders summary and details content when added', () => {
    const { getByTestId } = render(
      <RouterContext.Provider value={Router}>
        <AccordionItem
          testId='jest'
          item={item}
          expandText='expand'
          collapseText='collapse'
          accordionSummaryContent={accordionSummaryContent}
          accordionDetailsContent={accordionDetailsContent}
        />
      </RouterContext.Provider>
    )
    expect(getByTestId('jest-summary').firstChild).toBeTruthy()
    expect(getByTestId('jest-summary').firstChild).toBeTruthy()
  })
})
