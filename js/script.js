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
  console.log(displayAllCurrencies(exchangeRateAvailable))
}
const displayAllCurrencies = apiData => {
  const currentList = document.querySelector('#current-list')
  currentList.replaceChildren('')

  const data = apiData.conversion_rates // text try to access the exchange rates object
  const currencyList = Object.entries(data)
  const updatedList = currencyList.map(item => {
    const currencyCode = item.slice(0, 1)
    const currencyRate = item.slice(1)
    const currDiv = document.createElement('div')
    currDiv.className = 'rounded-lg'
    currDiv.className += ' bg-slate-50'
    currDiv.className += ' p-3'
    const para01 = document.createElement('p')
    para01.className = 'text-xs'
    para01.className += ' font-extrabold'
    para01.className += ' text-slate-800'
    const para02 = document.createElement('p')
    para02.className = 'mt-1'
    para02.className += ' text-[14px]'
    para02.className += ' text-slate-400'
    para01.textContent = currencyCode
    para02.textContent = currencyRate
    currDiv.append(para01, para02)
    currentList.appendChild(currDiv)
    return currDiv
  })

  return Object.entries(data).length
}
const calculateExchangeRates = () => {}
const displayExchageRates = () => {}

window.addEventListener('load', () => {
  initCurencyApp()
})
