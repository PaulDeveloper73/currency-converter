import { fetchRates, API_REQUEST, manageApiStatusAlert } from './api.js'
const initCurencyApp = async () => {
  const currencyForm = document.querySelector('#currency-form')
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
  displayAllCurrencies(exchangeRateAvailable)
  popularCurrencyPairs(exchangeRateAvailable)

  // currency for data
  currencyForm.addEventListener('submit', e => {
    e.preventDefault()
    const getCurrentData = processFormData(currencyForm)
    console.log(getCurrentData)
    let reverseCurrStatus = false // pending to setup to manage currency switch

    // validate amount
    if (
      !Number.isFinite(getCurrentData.inputAmount) ||
      getCurrentData.inputAmount < 0
    ) {
      console.log('Enter amount zero(0) and above.')
      return
    }

    // The exhanage rates
    const dataSource = [
      ...Object.entries(exchangeRateAvailable.conversion_rates)
    ]

    const filteredToCurr = dataSource.find(curr =>
      curr.includes(getCurrentData.toCurrency)
    )
    const filteredFromCurr = dataSource.find(curr =>
      curr.includes(getCurrentData.fromCurrency)
    )
    // All the current and ther respective codes and rates are here

    const allDetails = {
      ...stripTOcurrency(filteredToCurr),
      ...stripFromCurrency(filteredFromCurr),
      reverseCurrStatus // pending to setup to manage currency switch
    }
    calculateExchangeRates(allDetails)
  })

  //now real calctulation
}
const calculateExchangeRates = ({
  toCurrencyCode,
  toCurrencyRate,
  fromCurrencyCode,
  fromCurrencyRate,
  reverseCurrStatus
}) => {
  let toCurrCode = toCurrencyCode
  let toCurrRate = toCurrencyRate
  let fromCurrCode = fromCurrencyCode
  let fromCurrRate = fromCurrencyRate
  if (reverseCurrStatus === true) {
    toCurrCode = fromCurrencyCode
    toCurrRate = fromCurrencyRate
    fromCurrCode = toCurrencyCode
    fromCurrRate = toCurrencyRate
  }
  //  data to use is here
  const currData = {
    toCurrencyCode: toCurrCode[0],
    toCurrencyRate: toCurrRate[0],
    fromCurrencyCode: fromCurrCode[0],
    fromCurrencyRate: fromCurrRate[0]
  }
  console.log(currData)
}
const displayExchageRates = () => {}
const stripTOcurrency = item => {
  const currencyCode = item.slice(0, 1)
  const currencyRate = item.slice(1)
  return {
    toCurrencyCode: currencyCode,
    toCurrencyRate: currencyRate
  }
}
const stripFromCurrency = item => {
  const currencyCode = item.slice(0, 1)
  const currencyRate = item.slice(1)
  return {
    fromCurrencyCode: currencyCode,
    fromCurrencyRate: currencyRate
  }
}
const processFormData = data => {
  const form = new FormData(data)
  const amount = String(form.get('amount') ?? '').trim()
  const fromCurr = String(form.get('fromCurrency') ?? '').trim()
  const toCurr = String(form.get('toCurrency') ?? '').trim()
  return {
    inputAmount: Number(amount),
    fromCurrency: fromCurr,
    toCurrency: toCurr
  }
}
const popularCurrencyPairs = apiData => {
  const listArea = document.querySelector('#popular-currency-pairs')
  const data = apiData.conversion_rates
  const allData = Object.entries(data)
  const filteredCurrency = allData.filter(
    item =>
      item.includes('UGX') ||
      item.includes('KES') ||
      item.includes('TZS') ||
      item.includes('EUR')
  )
  //
  // {
  //   currency: "USD",
  //   rate:1,
  //   name:"United Stated Dollar"
  // }
  const dataSource = []
  filteredCurrency.forEach(item => {
    const currencyCode = item.slice(0, 1)
    const currencyRate = item.slice(1)
    if (currencyCode == 'UGX') {
      const Currdata = {
        currency: currencyCode[0],
        rate: currencyRate[0],
        name: 'Ugandan Shilling'
      }
      dataSource.push(Currdata)
    } else if (currencyCode == 'KES') {
      const Currdata = {
        currency: currencyCode[0],
        rate: currencyRate[0],
        name: 'Kenyan Shilling'
      }
      dataSource.push(Currdata)
    } else if (currencyCode == 'TZS') {
      const Currdata = {
        currency: currencyCode[0],
        rate: currencyRate[0],
        name: 'Tanzanian Shilling'
      }
      dataSource.push(Currdata)
    } else {
      const Currdata = {
        currency: currencyCode[0],
        rate: currencyRate[0],
        name: 'Euro'
      }
      dataSource.push(Currdata)
    }
  })

  listArea.replaceChildren('')
  const currencyPairElement = dataSource.map(item =>
    createCurrencyPair(item, listArea)
  )
  // listArea.append(currencyPairElement)
}
// Create currency pair section
const createCurrencyPair = (item, listArea) => {
  // Main container
  const container = document.createElement('div')
  container.className = 'flex items-center justify-between gap-3 py-4'

  // Left container
  const leftContainer = document.createElement('div')
  leftContainer.className = 'flex items-center gap-3'

  // Currency badge
  const currencyBadge = document.createElement('div')
  currencyBadge.className =
    'flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-xs font-extrabold text-blue-700'
  currencyBadge.textContent = item.currency.slice(0, 2)

  // Currency details container
  const currencyDetails = document.createElement('div')

  // Currency pair
  const currencyPair = document.createElement('p')
  currencyPair.className = 'text-sm font-bold text-slate-800'
  currencyPair.textContent = `${item.currency} / USD`

  // Currency description
  const currencyDescription = document.createElement('p')
  currencyDescription.className = 'text-xs text-slate-400'
  currencyDescription.textContent = `${item.name} / US Dollar`

  // Exchange rate
  const exchangeRate = document.createElement('span')
  exchangeRate.id = `popular-${item.currency.toLowerCase()}-usd`
  exchangeRate.className = 'text-sm font-bold text-slate-600'
  exchangeRate.textContent = `${Number(item.rate).toFixed(2)}`

  // Append currency details
  currencyDetails.append(currencyPair, currencyDescription)

  // Append left container
  leftContainer.append(currencyBadge, currencyDetails)

  // Append everything to main container
  container.append(leftContainer, exchangeRate)
  listArea.append(container)

  return container
}
const displayAllCurrencies = apiData => {
  const currentList = document.querySelector('#current-list')
  currentList.replaceChildren('')

  const data = apiData.conversion_rates // text try to access the exchange rates object
  const currencyList = Object.entries(data)
  return currencyList.map(item => {
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
    return Object.entries(data).length
  })
}

window.addEventListener('load', () => {
  initCurencyApp()
})
