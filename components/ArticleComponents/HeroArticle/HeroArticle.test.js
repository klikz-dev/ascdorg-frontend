import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, screen } from '../../../__test-utils__/test-utils'
import HeroArticle from './HeroArticle'

describe('<HeroArticle />', () => {
  const article = {
    date: '2022-01-28T00:00-05:00',
    authors: {
      items: [
        {
          thumbnail: {
            imageBynder:
              'https://library.ascd.org/m/e372b6d6a2a8299/webimage-Nell_Duke.jpg',
          },
          slug: 'nell-k.-duke',
          title: 'Nell K. Duke',
        },
      ],
    },
    title:
      'What Wordle Reminds Us About Effective Phonics and Spelling Instruction',
    contentType: 'blog',
    slug: 'what-wordle-reminds-us-about-effective-phonics-and-spelling-instruction',
  }

  const readingTime = () => {
    return 25
  }

  it('HeroArticle displays correct Article Title and Author Name', () => {
    const { getByTestId } = render(
      <HeroArticle
        testId='jest'
        {...article}
        minuteRead={() => readingTime()}
      />
    )
    expect(screen.getByText('Nell K. Duke')).toBeInTheDocument()
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title')).toHaveTextContent(
      'What Wordle Reminds Us About Effective Phonics and Spelling Instruction'
    )
  })
})
