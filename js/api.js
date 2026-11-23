import { getLastUpdate } from './getLastDate.js'

export const API_REQUEST =
  'https://v6.exchangerate-api.com/v6/ece0d158feb66b16b0c8050f/latest/'

// Fetch exchange rates
export const fetchRates = async currency => {
  try {
    // Load local JSON data
    const response = await fetch('./js/data.json')

    // Check HTTP response
    if (!response.ok) {
      throw new Error(`Unable to fetch exchange rates: ${response.status}`)
    }

    const data = await response.json()

    // Validate returned data
    if (
      data.result !== 'success' ||
      !data.conversion_rates ||
      typeof data.conversion_rates !== 'object'
    ) {
      throw new Error('Invalid exchange rates data!')
    }

    console.log('Exchange rates loaded successfully:', data)

    return data
  } catch (err) {
    console.error(`Error occurred: ${err.message}`)
    throw err
  }
}

// Manage API status alerts
export const manageApiStatusAlert = apiData => {
  const apiAlertTxt = document.querySelector('#api-alert')
  const apiStatusBadge = document.querySelector('#api-status-badge')
  const apiStatus = document.querySelector('#api-status')
  const lastUpdated = document.querySelector('#last-updated')
  const nextUpdate = document.querySelector('#next-update')
  const totalCurrencies = document.querySelector('#total-currencies')
  const rateDataStatus = document.querySelector('#rate-data-status')

  const data = apiData?.conversion_rates

  let alertMsg = ''
  let isActive = false

  try {
    // Validate exchange rates
    if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
      throw new Error('No exchange rates data available!')
    }

    alertMsg = 'API connection Active'
    isActive = true

    // Active status styling
    apiAlertTxt?.classList.add('text-green-600')
    apiAlertTxt?.classList.remove('text-amber-600')

    apiStatusBadge?.classList.add('text-green-600')
    apiStatusBadge?.classList.remove('text-amber-600')

    apiStatusBadge && (apiStatusBadge.textContent = 'Active')
    rateDataStatus && (rateDataStatus.textContent = 'Rate data active')
  } catch (err) {
    alertMsg = 'Waiting for API connection...'

    // Pending status styling
    apiStatusBadge && (apiStatusBadge.textContent = 'Pending')
    rateDataStatus && (rateDataStatus.textContent = 'Rate data pending')

    apiAlertTxt?.classList.remove('text-green-600')
    apiAlertTxt?.classList.add('text-amber-600')

    apiStatusBadge?.classList.remove('text-green-600')
    apiStatusBadge?.classList.add('text-amber-600')

    console.warn(err.message)
  }

  // Update UI
  if (apiAlertTxt) apiAlertTxt.textContent = alertMsg
  if (apiStatus) apiStatus.textContent = alertMsg

  if (lastUpdated) {
    lastUpdated.textContent = apiData?.time_last_update_utc
      ? getLastUpdate(apiData.time_last_update_utc)
      : 'Unavailable'
  }

  if (nextUpdate) {
    nextUpdate.textContent = apiData?.time_next_update_utc
      ? getLastUpdate(apiData.time_next_update_utc)
      : 'Unavailable'
  }

  if (totalCurrencies) {
    totalCurrencies.textContent = `${
      data ? Object.keys(data).length : 0
    } available`
  }

  console.log(alertMsg)

  return isActive
}
