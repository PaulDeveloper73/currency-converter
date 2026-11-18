const invoiceData = {
  id: '01',
  amount: 3000,
  status: 'paid'
}

export const Invoice = () => {}
const getSummary = ({ id, amount, status }) => {
  return `${id}: UGX ${amount} (${status})`
}

getSummary(invoiceData)
// const invoice1 = new Invoice('INV-001', 50000)
// const invoice2 = new Invoice('INV-002', 75000, 'paid')

// console.log(invoice1.getSummary())
// // INV-001: UGX 50000 (unpaid)

// console.log(invoice2.getSummary())
// // INV-002: UGX 75000 (paid)
