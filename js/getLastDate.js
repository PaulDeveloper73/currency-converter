export const getLastUpdate = dateDetails => {
  const date = new Date(dateDetails)
  const day = String(date.getDate() ?? '')
    .trim()
    .padStart(2, '0')
  const month = String(date.getMonth() + 1 ?? '')
    .trim()
    .padStart(2, '0')
  const year = String(date.getFullYear() ?? '')
    .trim()
    .padStart(4, '0')

  return `${day}-${month}-${year}`
}
