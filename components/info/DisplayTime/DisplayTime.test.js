import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '../../../__test-utils__/test-utils'
import DisplayTime from '../../../components/info/DisplayTime'
import {
  // formatDateToTime,
  // getTimezoneName,
  modifyTime,
} from '../../../lib/utils'

describe('DisplayTime Component Functions', () => {
  /**
   * To-do. Works on local. Use different TZ on Github workflow.
   */
  // it('should convert new Date() object into time format', () => {
  //   expect(formatDateToTime('2021-11-23T18:00:00.000-05:00')).toBe('6:00 PM')
  //   expect(formatDateToTime('2021-11-23T18:00:00.000-06:00')).toBe('7:00 PM')
  // })

  it('should convert formatDateToTime(2021-11-23T18:00:00.000-05:00) to new time format', () => {
    expect(modifyTime('06:00 PM')).toBe('6:00 PM')
  })

  /**
   * To-do. Works on local. Use different TZ on Github workflow.
   */
  // it('should convert new Date() object into time format', () => {
  //   expect(formatDateToTime('2021-11-23T18:00:00.000-09:00')).toBe('10:00 PM')
  //   expect(formatDateToTime('2021-11-23T18:00:00.000-10:00')).toBe('11:00 PM')
  // })

  it('should not convert formatDateToTime(2021-11-23T18:00:00.000-09:00) to new time format', () => {
    expect(modifyTime('10:00 PM')).toBe('10:00 PM')
  })

  // dateformat doesn't return error
  // it('should not pass objects other than new Date format', () => {
  //   expect(formatDateToTime('ASCD')).toBe('Time could not be retrieved')
  // })

  /**
   * To-do. Works on local. Returns "CUT" on Github workflow.
   */
  // it('should return the correct Time Zone', () => {
  //   expect(getTimezoneName('2021-11-23T18:00:00.000-09:00')).toBe('EST')
  // })
})

describe('Display Component', () => {
  test('Invalid DisplayTime Component rendered successfully', () => {
    render(<DisplayTime startTime='ASCD' endTime='ABC123' />)

    expect(screen.getByText('Time could not be retrieved')).toHaveTextContent(
      'Time could not be retrieved'
    )
  })

  /**
   * Test Error. To-do
   */
  // test('Invalid DisplayTime Component rendered successfully', () => {
  //   render(
  //     <DisplayTime startTime='2021-11-23T18:00:00.000-05:00' endTime='ABC123' />
  //   )

  //   expect(
  //     screen.getByText('6:00 PM - Time could not be retrieved')
  //   ).toHaveTextContent('6:00 PM - Time could not be retrieved')
  // })

  /**
   * Test Error. To-do
   */
  // test('Two Valid Input DisplayTime Component rendered successfully', () => {
  //   render(
  //     <DisplayTime
  //       startTime='2021-11-23T18:00:00.000-05:00'
  //       endTime='2021-11-23T18:00:00.000-10:00'
  //     />
  //   )

  //   expect(screen.getByText('6:00 PM - 11:00 PM')).toHaveTextContent(
  //     '6:00 PM - 11:00 PM'
  //   )
  // })

  /**
   * Test Error. To-do
   */
  // test('One Valid Input DisplayTime Component rendered successfully', () => {
  //   render(<DisplayTime startTime='2021-11-23T18:00:00.000-05:00' endTime='' />)

  //   expect(screen.getByText('6:00 PM')).toHaveTextContent('6:00 PM')
  // })

  /**
   * Test Error. To-do
   */
  // test('One Valid Input DisplayTime Component rendered successfully', () => {
  //   render(
  //     <DisplayTime
  //       startTime='2021-11-23T18:00:00.000-05:00'
  //       endTime='2021-11-23T18:00:00.000-10:00'
  //       variant='h1'
  //     />
  //   )

  //   expect(screen.getByText('6:00 PM - 11:00 PM')).toHaveTextContent(
  //     '6:00 PM - 11:00 PM'
  //   )
  // })
})
