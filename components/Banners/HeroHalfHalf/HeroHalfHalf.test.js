import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '../../../__test-utils__/test-utils'
import HeroHalfHalf from './HeroHalfHalf'

const testId = 'jest'
const label = 'test label'
const title = 'test title'
const description = 'test description'
const date = 'test date'
const time = 'test time'
const ctaItems = [
  {
    __typename: 'ButtonLinkComponent',
    linkUrl: '/',
    linkLabel: 'test cta label',
    buttonStyle: ['Color: White w/gray border and black text', 'Large'],
  },
]
const image = ''
const imageAlt = 'image'
const imagePos = 'center'
const backgroundColor = ''
const imageBorderCornerPosition = ''

describe('Custom HeroHalfHalf component', () => {
  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(<HeroHalfHalf testId={testId} />)
    expect(getByTestId('jest')).toBeVisible()
  })

  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(
      <HeroHalfHalf
        testId={testId}
        image={image}
        label={label}
        title={title}
        description={description}
        date={date}
        time={time}
        ctaItems={ctaItems}
        imageAlt={imageAlt}
        imagePos={imagePos}
        backgroundColor={backgroundColor}
        imageBorderCornerPosition={imageBorderCornerPosition}
      />
    )
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-label')).toBeVisible()
    expect(getByTestId('jest-title')).toBeVisible()
    expect(getByTestId('jest-date-time')).toBeVisible()
    expect(getByTestId('jest-description')).toBeVisible()
    expect(getByTestId('jest-image')).toBeVisible()
    expect(getByTestId('jest-cta-label')).toBeVisible()
  })

  it('HeroHalfHalf renders the context successfully', async () => {
    const screen = render(
      <HeroHalfHalf
        testId={testId}
        image={image}
        label={label}
        title={title}
        description={description}
        date={date}
        time={time}
        ctaItems={ctaItems}
        imageAlt={imageAlt}
        imagePos={imagePos}
        backgroundColor={backgroundColor}
        imageBorderCornerPosition={imageBorderCornerPosition}
      />
    )
    expect(screen.getByText('test label')).toBeInTheDocument()
    expect(screen.getByText('test title')).toBeInTheDocument()
    expect(screen.getByText('test description')).toBeInTheDocument()
    expect(screen.getByText('test date - test time EST')).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.getByText('test cta label')).toBeInTheDocument()
    )
  })
})
