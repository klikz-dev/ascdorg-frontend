import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '../../../../../__test-utils__/test-utils'
import SpotlightCarousel from './SpotlightCarousel'

describe('Custom SpotlightCarousel component', () => {
  test('Make sure components are rendered', () => {
    const { getByTestId } = render(
      <SpotlightCarousel
        testId='jest'
        content={[
          {
            authors: [
              {
                firstName: 'kate',
                lastName: 'Stoltzfus',
              },
            ],
            date: '2021-07-27T00:00-04:00',
            title:
              'Last Year Was a Wake-Up Call: Family Engagement After COVID-19 ',
            topic: {
              title: 'Engagement',
            },
            thumbnail: {
              imageContentful: {
                file: {
                  url: '/images/image404.png',
                },
              },
            },
          },
        ]}
        type='blog'
      />
    )

    expect(getByTestId('jest')).toBeVisible()
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument()
    expect(
      screen.getByText(
        'Last Year Was a Wake-Up Call: Family Engagement After COVID-19'
      )
    ).toBeInTheDocument()

    expect(screen.getByText('Engagement')).toBeInTheDocument()
    expect(screen.getByText('Read More')).toBeInTheDocument()
  })
})
