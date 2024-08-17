import React, { useState, useEffect } from 'react'
import fetch from './api/dataservice'
import Table from './Table/Table'
import { buildInfo } from './utils'

function App() {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch().then((data) => {
      const info = buildInfo(data)
      setData(info)
    })
  }, [])

  if (data == null) {
    return <div>Loading...</div>
  }
  return (
    <div className="container">
      <Table data={data.summaryByCustomer} />
    </div>
  )
}

export default App
