import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '../../__test-utils__/test-utils'
import OrderCard from '../../components/Cards/OrderCard'

const cardData = {
  header0Text: 'Order Placed',
  header0Value: 'October 7, 2021',
  header1Text: 'Shipped to',
  header1Value: 'Gerard Viscido',
  header2Text: 'Total',
  header2Value: '21.76',
  orderItems: [
    {
      itemTitle: 'Social Emotional Learning and the Brain by Marilee Sprenger',
      itemUrl: '/el/innovative-lesson-planning',
      itemData1Text: 'Tracking#:',
      itemData1Value: '23432esdfsdf33r23rfdsfds',
      itemDate3Text: 'Delivered:',
      productNumber: 'QRS118087',
    },
  ],
}
describe('OrderCard component:', () => {
  test('OrderCard header0 rendered successfully', () => {
    render(<OrderCard cardData={cardData} />)
    expect(screen.getByText(cardData.header0Text)).toBeInTheDocument()
  })
})
