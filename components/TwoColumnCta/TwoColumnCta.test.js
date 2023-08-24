import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '../../__test-utils__/test-utils'
import TwoColumnCta from './TwoColumnCta'

const testId = 'jest'
const label = 'test label'
const title = 'test title'
const description = 'test description'
const descriptionLineNumbers = 1
const date = '2021-1-1'
const image = ''
const imageAlt = 'image alt test'
const imagePos = 'left'
const snipcart = {}
const variant = 'grey'
const backgroundColor = ''
const imageFrameStyle = 'avatar'

describe('Custom TwoColumnCta component', () => {
  it('Make sure items in the component are rendered', async () => {
    const { getByTestId } = render(
      <TwoColumnCta
        testId={testId}
        label={label}
        title={title}
        description={description}
        descriptionLineNumbers={descriptionLineNumbers}
        date={date}
        ctaItems={[
          {
            __typename: 'ButtonLinkComponent',
            linkUrl: '/',
            linkLabel: 'button label 1',
          },
          {
            __typename: 'ButtonLinkComponent',
            linkUrl: '/',
            linkLabel: 'button label 2',
            buttonStyle: ['Text Link w/Arrow (Preset #2)'],
          },
        ]}
        image={image}
        imageAlt={imageAlt}
        imagePos={imagePos}
        snipcart={snipcart}
        variant={variant}
        backgroundColor={backgroundColor}
        imageFrameStyle={imageFrameStyle}
      />
    )

    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-label')).toBeVisible()
    expect(getByTestId('jest-title')).toBeVisible()
    expect(getByTestId('jest-date')).toBeVisible()
    expect(getByTestId('jest-description')).toBeVisible()
    await waitFor(() => expect(getByTestId('jest-cta1-button')).toBeVisible())
    await waitFor(() =>
      expect(getByTestId('jest-cta2-button-2-cta-link')).toBeVisible()
    )

    expect(getByTestId('jest-avatar')).toBeVisible()
  })

  it('component renders content successfully', () => {
    const screen = render(
      <TwoColumnCta
        testId={testId}
        label={label}
        title={title}
        description={description}
        descriptionLineNumbers={descriptionLineNumbers}
        date={date}
        ctaItems={[
          {
            __typename: 'ButtonLinkComponent',
            linkUrl: '/',
            linkLabel: 'button label 1',
          },
          {
            __typename: 'ButtonLinkComponent',
            linkUrl: '/',
            linkLabel: 'button label 2',
            buttonStyle: ['Text Link w/Arrow (Preset #2)'],
          },
        ]}
        image={image}
        imageAlt={imageAlt}
        imagePos={imagePos}
        snipcart={snipcart}
        variant={variant}
        backgroundColor={backgroundColor}
        imageFrameStyle={imageFrameStyle}
      />
    )
    expect(screen.getByText('test label')).toBeInTheDocument()
    expect(screen.getByText('test title')).toBeInTheDocument()
    expect(screen.getByText('2021-1-1')).toBeInTheDocument()
    expect(screen.getByText('test description')).toBeInTheDocument()
    expect(screen.getByText('button label 1')).toBeInTheDocument()
  })
})
