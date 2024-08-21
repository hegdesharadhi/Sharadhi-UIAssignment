import React from 'react'
import './Table.css'

const Table = (props) => {
  const { data } = props

  return (
    <div className="container">
      <h2>Points Rewarded To Customer</h2>
      <table className="table">
        <thead className="header">
          <tr>
            <th>Name</th>
            <th>Month</th>
            <th>Transaction</th>
            <th>Reward Points</th>
            <th>Total Points</th>
          </tr>
        </thead>

        {data &&
          data.map((item, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>{item.name}</td>
                  <td>{item.month}</td>
                  <td>{item.numTransactions}</td>
                  <td>{item.points}</td>
                  <td>{item.totalPointsByCustomer}</td>
                </tr>
              </tbody>
            )
          })}
      </table>
    </div>
  )
}

export default Table
