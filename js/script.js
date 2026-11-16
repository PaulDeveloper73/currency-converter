import { fetchRates, API_REQUEST } from './api.js'
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
}

window.addEventListener('load', () => {
  initCurencyApp()
})
