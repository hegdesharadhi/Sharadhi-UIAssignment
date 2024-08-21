import React, { useState, useEffect } from 'react'
import { calculateTotalPoints } from '../utils'
import fetch from '../api/data'
import Table from '../Table/Table'

const Loading = () => {
  const [data, setData] = useState(null) // Setting the initial value to null
  useEffect(() => {
    try {
      fetch().then((data) => {
        const info = calculateTotalPoints(data)
        setData(info)
      })
    } catch (error) {
      console.log(error)
    }
  }, []) // On the initial load, setting the value of data

  if (data == null) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <Table data={data.summaryOfCustomer} />
    </div>
  )
}

export default Loading
