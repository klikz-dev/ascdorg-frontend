import '@testing-library/jest-dom/extend-expect'
import { render } from '../../../__test-utils__/test-utils'
import IssueBanner from './IssueBanner'

const testId = 'jest'

const issue = {
  thumbnail: {
    imageBynder: null,
    imageContentful: {
      url: 'https://images.ctfassets.net/cguvp07qpj80/cc9a72d8-5120-46f8-a038-9f628a924bdf/e0a20ac4c74cf70bb04128e7b1616933/116034.jpg',
    },
    title: 'May 2022 Ready for the Real World? thumbnail',
    alternate: 'May 2022 Ready for the Real World? thumbnail',
  },
  title: 'Ready for the Real World?',
  publicationDate: '2022-05-01',
  volNo: '79',
  issueNo: 8,
  slug: 'ready-for-the-real-world',
  bookVersion: {
    dateRelease: '2022-04-09',
    productNumber: '122047',
    priceMember: 9.95,
    taxJar: '81310',
    royaltyFlag: null,
    digitalFileGuid: null,
  },
  shortDescription:
    'How can we better prepare youth to take on the challenges they will face after they graduate—whether in college or career training, personal interactions, or in terms of complex societal problems?',
  pdfFreeDownload: 'Everyone',
  pdfUrl: 'https://information.ascd.org/may-2022-el-download',
  pdfUrlLabel: 'Members & Subscribers: Download the PDF.',
}

describe('Custom IssueBanner component', () => {
  it('Make sure items in the component are rendered', () => {
    const { getByTestId } = render(<IssueBanner testId={testId} {...issue} />)
    expect(getByTestId('jest')).toBeVisible()
    expect(getByTestId('jest-image')).toBeVisible()
  })
})
