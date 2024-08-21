import { render, screen } from '@testing-library/react'
import { data } from './mockData'
import DataDisplay from '../../components/DataDisplay'

describe('DataDisplay', () => {
  test('Check the DataDisplay when data is empty', () => {
    render(<DataDisplay data={data} />)
    const loading = screen.getByText(/Loading/i)
    expect(loading).toMatchSnapshot()
  })
})
