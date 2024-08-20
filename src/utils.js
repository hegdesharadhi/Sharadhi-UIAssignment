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
    const points = calculatePoints(transaction.amt)
    const month = new Date(transaction.transactionDate).getMonth() + 1 // Gets the month from the transaction date. Added 1 to avoid confusion as it starts from 0.Ex: Jan is returned as 0
    return { ...transaction, points, month } //Returns the object after calculating the points and transaction month
  })
  const pointsByCustomer = {}
  const totalPointsByCustomer = {}
  pointsPerTransaction.forEach((pointsPerTransaction) => {
    const { custid, name, month, points, transactionDate } =
      pointsPerTransaction
    if (!pointsByCustomer[custid]) {
      pointsByCustomer[custid] = [] // Array is creating for each, with the same id
    }
    if (!totalPointsByCustomer[custid]) {
      totalPointsByCustomer[custid] = 0 // Initializing the total reward points to 0
    }

    totalPointsByCustomer[custid] += points

    if (pointsByCustomer[custid][month]) {
      // If particular id and the month already exists in pointsByCustomer object, it adds the points, month and num of transactions
      pointsByCustomer[custid][month].points += points
      pointsByCustomer[custid][month].monthNumber = month
      pointsByCustomer[custid][month].numTransactions++
    } else {
      pointsByCustomer[custid][month] = {
        //if not, object is created
        custid,
        name,
        month: new Date(transactionDate).toLocaleString('en-us', {
          month: 'long',
        }),
        numTransactions: 1,
        points,
      }
    }
  })

  return {
    summaryByCustomer: buildSummaryInfo(
      pointsByCustomer,
      totalPointsByCustomer
    ),
    pointsPerTransaction,
  }
}

//Function to create the final data
export function buildSummaryInfo(pointsByCustomer, totalPointsByCustomer) {
  const summary = []
  for (const custKey in pointsByCustomer) {
    pointsByCustomer[custKey].forEach((customer) => {
      customer.totalPointsByCustomer = totalPointsByCustomer[custKey]
      summary.push(customer)
    })
  }
  return summary // final data is returned
}
