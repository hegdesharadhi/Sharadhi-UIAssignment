//Function to calculate the points
export function calculatePoints(amt) {
  let points = 0
  if (amt > 100) {
    points = 2 * (amt - 100) + 50 // If Amount if more than 100, 2 points multiplied with amount that is more than 100 and 50 is added as its above 100
  } else if (amt > 50 && amt <= 100) {
    points = amt - 50 // When the amount is less than 100 and more than 50, 50 is subtracted to get the total reward points
  } else {
    points = 0
  }
  return points
}

export function buildInfo(data) {
  const pointsPerTransaction = data.map((transaction) => {
    let points = calculatePoints(transaction.amt)
    const month = new Date(transaction.transactionDt).getMonth() + 1 // Gets the month from the transaction date. Added 1 to avoid confusion as it starts from 0.Ex: Jan is returned as 0
    return { ...transaction, points, month } //Returns the object after calculating the points and transaction month
  })
  let byCustomer = {}
  let totalPointsByCustomer = {}
  pointsPerTransaction.forEach((pointsPerTransaction) => {
    let { custid, name, month, points, transactionDt } = pointsPerTransaction
    if (!byCustomer[custid]) {
      byCustomer[custid] = [] // Array is creating for each, with the same id
    }
    if (!totalPointsByCustomer[custid]) {
      totalPointsByCustomer[custid] = 0 // Initializing the total reward points to 0
    }

    totalPointsByCustomer[custid] += points

    if (byCustomer[custid][month]) {
      // If particular id and the month already exists in byCustomer object, it adds the points, month and num of transactions
      byCustomer[custid][month].points += points
      byCustomer[custid][month].monthNumber = month
      byCustomer[custid][month].numTransactions++
    } else {
      byCustomer[custid][month] = {
        //if not, object is created
        custid,
        name,
        month: new Date(transactionDt).toLocaleString('en-us', {
          month: 'long',
        }),
        numTransactions: 1,
        points,
      }
    }
  })

  return {
    summaryByCustomer: buildSummaryInfo(byCustomer, totalPointsByCustomer),
    pointsPerTransaction,
  }
}

//Function to create the final data
export function buildSummaryInfo(byCustomer, totalPointsByCustomer) {
  let summary = []
  for (let custKey in byCustomer) {
    byCustomer[custKey].forEach((cRow) => {
      cRow.totalPointsByCustomer = totalPointsByCustomer[custKey]
      summary.push(cRow)
    })
  }
  return summary // final data is returned
}
