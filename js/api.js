export const API_REQUEST =
  'https://v6.exchangerate-api.com/v6/ece0d158feb66b16b0c8050f/latest/'
export const fetchRates = async currency => {
  try {
    const response = await fetch(`${API_REQUEST}${currency}`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Unable to fetch the exchange rates!: ${response.status}`)
    }
    return data.conversion_rates
  } catch (err) {
    console.log(`Error occurred!: ${err}`)
    return []
  }
}
