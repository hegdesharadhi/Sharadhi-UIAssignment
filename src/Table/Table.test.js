import { render, screen } from '@testing-library/react'
import Table from './Table'
import { data } from './mockData'

describe('Table', () => {
  test('Check the heading', () => {
    render(<Table data={data} />)
    const heading = screen.getByText(/Points Rewarded To Customer/i)

    expect(heading).toMatchSnapshot()
  })

  test('Check the table headings', () => {
    render(<Table data={data} />)
    expect(screen.getByText(/Name/i)).toMatchSnapshot()
    expect(screen.getByText(/Month/i)).toMatchSnapshot()
    expect(screen.getByText(/Transaction/i)).toMatchSnapshot()
    expect(screen.getByText(/Reward Points/i)).toMatchSnapshot()
    expect(screen.getByText(/Total Points/i)).toMatchSnapshot()
  })
  test('Check the table values', () => {
    render(<Table data={data} />)
    expect(screen.queryAllByText(/Smith/i)).toMatchSnapshot()
    expect(screen.queryAllByText(/2/i)).toMatchSnapshot()
    expect(screen.queryAllByText(/578/i)).toMatchSnapshot()
    expect(screen.queryAllByText(/762/i)).toMatchSnapshot()
    expect(screen.queryAllByText(/698/i)).toMatchSnapshot()
  })
})
