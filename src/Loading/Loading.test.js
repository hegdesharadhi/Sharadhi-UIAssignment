import { render, screen } from '@testing-library/react'
import { data } from './mockData'
import Loading from './Loading'

describe('Loading', () => {
  test('Check the Loading when data is empty', () => {
    render(<Loading data={data} />)
    const loading = screen.getByText(/Loading/i)
    expect(loading).toMatchSnapshot()
  })
})
