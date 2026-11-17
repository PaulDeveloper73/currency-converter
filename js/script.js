import { fetchRates, API_REQUEST, manageApiStatusAlert } from './api.js'
const initCurencyApp = async () => {
  const amountInput = document.querySelector('#amount-input')
  const fromCurrency = document.querySelector('#from-currency')
  const toCurrency = document.querySelector('#to-currency')
  const swapCurrencies = document.querySelector('#swap-currencies')
  const convertButton = document.querySelector('#convert-button')

  //   Check is conversion rates are available

  const exchangeRateAvailable = await fetchRates('USD')
  if (!exchangeRateAvailable) {
    console.log('Check the api confiuration')
    return
  }

  console.log(exchangeRateAvailable)
  const apiStatus = (await manageApiStatusAlert(exchangeRateAvailable))
    ? 'Active'
    : 'Pending'
  console.log(apiStatus)
}

const calculateExchangeRates = () => {}
const displayExchageRates = () => {}

window.addEventListener('load', () => {
  initCurencyApp()
})
