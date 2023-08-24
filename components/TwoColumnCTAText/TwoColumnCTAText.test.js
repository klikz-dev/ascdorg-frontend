import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, within } from '../../__test-utils__/test-utils'
import {
  titleOne,
  titleTwo,
  bodyOne,
  bodyTwo,
  backgroundImage,
  ctaLinks,
  colors,
  alignments,
} from './TwoColumnCtaMockData'
import TwoColumnCTAText from './TwoColumnCTAText'

describe('<TwoColumnCTAText />', () => {
  it('component renders', () => {
    const { getByTestId } = render(<TwoColumnCTAText testId='jest' />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('component renders correctly with various fields filled', () => {
    const { getByTestId } = render(
      <TwoColumnCTAText
        testId='jest'
        titleOne={titleOne}
        titleTwo={titleTwo}
        bodyOne={bodyOne}
        bodyTwo={bodyTwo}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title-one')).toHaveTextContent(`${titleOne}`)
    expect(getByTestId('jest-body-one').firstChild).toHaveTextContent(
      'HELLO I AM TEST'
    )
    expect(getByTestId('jest-title-two')).toHaveTextContent(`${titleTwo}`)
    expect(getByTestId('jest-body-two').firstChild).toHaveTextContent(
      'HELLO I AM TEST'
    )
  })

  it('component renders correct number of links', () => {
    const { getByTestId } = render(
      <TwoColumnCTAText
        testId='jest'
        ctaLinksOne={ctaLinks}
        ctaLinksTwo={[ctaLinks[1]]} // make this one just one
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    const ctaLinksOne = getByTestId('jest-cta-links-one')
    const ctaLinksTwo = getByTestId('jest-cta-links-two')
    const testlinksOne = within(ctaLinksOne).getAllByTestId('jest-cta-link-one')
    const testlinksTwo = within(ctaLinksTwo).getAllByTestId('jest-cta-link-two')
    expect(testlinksOne.length).toBe(2)
    expect(testlinksTwo.length).toBe(1)
  })

  it(`component renders proper background image if present`, () => {
    const { getByTestId } = render(
      <TwoColumnCTAText testId='jest' backgroundImage={backgroundImage} />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest')).toHaveStyle(
      `background-image: url(${backgroundImage})`
    )
  })

  it(`component renders proper text color if background color is 'dark_green`, () => {
    const { getByTestId } = render(
      <TwoColumnCTAText
        testId='jest'
        titleOne={titleOne}
        titleTwo={titleTwo}
        bodyOne={bodyOne}
        bodyTwo={bodyTwo}
        backgroundColor={colors[0][0]}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-title-one')).toHaveStyle(`color: white`)
    expect(getByTestId('jest-title-two')).toHaveStyle(`color: white`)
    expect(getByTestId('jest-body-one')).toHaveStyle(`color: white`)
    expect(getByTestId('jest-body-two')).toHaveStyle(`color: white`)
  })

  for (const color of colors) {
    it(`component renders proper color '${color[0]}' background with result ${color[1]}`, () => {
      const { getByTestId } = render(
        <TwoColumnCTAText testId='jest' backgroundColor={color[0]} />
      )
      expect(getByTestId('jest')).toBeVisible()
      expect(getByTestId('jest')).toHaveStyle(`background-color: ${color[1]}`)
    })
  }

  for (const alignment of alignments) {
    it(`component renders proper alignment style '${alignment[0]}'`, () => {
      const { getByTestId } = render(
        <TwoColumnCTAText
          testId='jest'
          titleOne={titleOne}
          titleTwo={titleTwo}
          bodyOne={bodyOne}
          bodyTwo={bodyTwo}
          ctaLinksOne={ctaLinks}
          ctaLinksTwo={[ctaLinks[1]]}
          titleOneAlignment={alignment[0]}
          titleTwoAlignment={alignment[0]}
          bodyOneAlignment={alignment[0]}
          bodyTwoAlignment={alignment[0]}
          ctaLinksOneAlignment={alignment[0]}
          ctaLinksTwoAlignment={alignment[0]}
        />
      )
      expect(getByTestId('jest')).toBeVisible()
      expect(getByTestId('jest-title-one-align')).toHaveStyle(
        `align-self: ${alignment[1]}`
      )
      expect(getByTestId('jest-title-two-align')).toHaveStyle(
        `align-self: ${alignment[1]}`
      )
      expect(getByTestId('jest-body-one-align')).toHaveStyle(
        `align-self: ${alignment[1]}`
      )
      expect(getByTestId('jest-body-two-align')).toHaveStyle(
        `align-self: ${alignment[1]}`
      )
      expect(getByTestId('jest-cta-links-one')).toHaveStyle(
        `align-self: ${alignment[1]}`
      )
      expect(getByTestId('jest-cta-links-two')).toHaveStyle(
        `align-self: ${alignment[1]}`
      )
      expect(getByTestId('jest-cta-links-one')).toHaveStyle(
        `align-items: ${alignment[1]}`
      )
      expect(getByTestId('jest-cta-links-two')).toHaveStyle(
        `align-items: ${alignment[1]}`
      )
    })
  }
})
