export const API_REQUEST =
  'https://v6.exchangerate-api.com/v6/ece0d158feb66b16b0c8050f/latest/'
export const fetchRates = async currency => {
  try {
    const response = await fetch(`${API_REQUEST}${currency}`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Unable to fetch the exchange rates!: ${response.status}`)
    }
    return data
  } catch (err) {
    console.log(`Error occurred!: ${err}`)
    return []
  }
}

export const manageApiStatusAlert = async apiData => {
  const apiAlertTxt = document.querySelector('#api-alert')
  const apiStatusBadge = document.querySelector('#api-status-badge')
  const apiStatus = document.querySelector('#api-status')
  const lastUpdated = document.querySelector('#last-updated')
  const nextUpdate = document.querySelector('#next-update')
  const totalCurrencies = document.querySelector('#total-currencies')
  const rateDataStatus = document.querySelector('#rate-data-status')

  let alertMsg = ''
  const data = apiData.conversion_rates // text try to access the exchange rates object
  try {
    if (!data) {
      throw new Error('No data availabe!')
    }
    alertMsg = 'API connection Active'
    apiAlertTxt.classList.add('text-green-600')
    apiAlertTxt.classList.remove('text-amber-600')
    apiStatusBadge.classList.add('text-green-600')
    apiStatusBadge.classList.remove('text-amber-600')
    apiStatusBadge.textContent = 'Active'
    rateDataStatus.textContent = 'Rate data active'
    // apiAlertTxt.classList.add('text-green-600').remove('text-amber-600')
    return true
  } catch (err) {
    alertMsg = 'Waiting for Api connection...'
    apiStatusBadge.textContent = 'Pending'
    rateDataStatus.textContent = 'Rate data pending'
    apiAlertTxt.classList.remove('text-green-600')
    apiAlertTxt.classList.add('text-amber-600')
    apiStatusBadge.classList.remove('text-green-600')
    apiStatusBadge.classList.add('text-amber-600')
    // apiAlertTxt.classList.remove('text-green-600').add('bg-amber-500')
    console.log('Waiting for the Api rates connection...!')
    return false
  } finally {
    apiAlertTxt.textContent = alertMsg
    apiStatus.textContent = alertMsg
    lastUpdated.textContent = getLastUpdate(apiData.time_last_update_utc)
    nextUpdate.textContent = getLastUpdate(apiData.time_next_update_utc)
    totalCurrencies.textContent = Object.entries(data).length + ' available '
    console.log(alertMsg)
  }
}

const getLastUpdate = dateDetails => {
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
