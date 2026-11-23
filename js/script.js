import { fetchRates, API_REQUEST, manageApiStatusAlert } from './api.js'
const initCurencyApp = async () => {
  const currencyForm = document.querySelector('#currency-form')
  const amountInput = document.querySelector('#amount-input')
  const fromCurrency = document.querySelector('#from-currency')
  const toCurrency = document.querySelector('#to-currency')
  const swapCurrenciesBtn = document.querySelector('#swap-currencies')
  const swapStatus = document.querySelector('#swap-status')
  const convertButton = document.querySelector('#convert-button')
  const errMsg = document.querySelector('#error-message')
  errMsg.textContent = ''

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
    const amount = Number(getCurrentData.inputAmount)

    if (
      amount === '' ||
      !Number.isFinite(amount) ||
      amount <= 0 ||
      Number.isNaN(amount)
    ) {
      errMsg.textContent = 'Please enter a valid amount greater than zero!'
      errMsg.className = 'text-red-500 text-xm py-2 animate-pulse'
      console.log('Please enter a valid amount greater than zero!')
      amountInput.focus()
      return
    }
    errMsg.textContent = ''

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
      ...getCurrentData,
      reverseCurrStatus // pending to setup to manage currency switch
    }
    calculateExchangeRates(allDetails)

    console.log(allDetails)
  })

  //Swapping currencies

  swapCurrenciesBtn.addEventListener('click', () => {
    const resultAmount = document.querySelector('#result-amount')
    const resultCurrency = document.querySelector('#result-currency')
    const exchangeRate = document.querySelector('#exchange-rate')
    const originalAmount = document.querySelector('#original-amount')
    resultAmount.textContent = ''
    resultCurrency.textContent = ''
    exchangeRate.textContent = ''
    originalAmount.textContent = ''
    amountInput.focus()
    // Store current currency selections
    const fromValue = fromCurrency.value
    const toValue = toCurrency.value

    // Swap selected currencies
    fromCurrency.value = toValue
    toCurrency.value = fromValue

    // Update visible status
    swapStatus.textContent = `Converting ${fromCurrency.value} to ${toCurrency.value}`

    // Notify other application event listeners
    fromCurrency.dispatchEvent(
      new Event('change', {
        bubbles: true
      })
    )

    toCurrency.dispatchEvent(
      new Event('change', {
        bubbles: true
      })
    )
  })
}

const calculateExchangeRates = ({
  toCurrencyCode,
  toCurrencyRate,
  fromCurrencyCode,
  fromCurrencyRate,
  reverseCurrStatus,
  inputAmount
}) => {
  // Extract values (supports both strings and arrays)
  const getValue = value => (Array.isArray(value) ? value[0] : value)

  // Extract currency data
  let toCurrCode = getValue(toCurrencyCode)
  let toCurrRate = Number(getValue(toCurrencyRate))

  let fromCurrCode = getValue(fromCurrencyCode)
  let fromCurrRate = Number(getValue(fromCurrencyRate))

  const amount = Number(inputAmount)

  // Validate input amount
  if (
    String(inputAmount).trim() === '' ||
    !Number.isFinite(amount) ||
    amount < 0
  ) {
    throw new Error('Please enter a valid amount!')
  }

  // Validate exchange rates
  if (
    !Number.isFinite(toCurrRate) ||
    !Number.isFinite(fromCurrRate) ||
    toCurrRate <= 0 ||
    fromCurrRate <= 0
  ) {
    throw new Error('Invalid exchange rates!')
  }

  // Reverse currency conversion
  if (reverseCurrStatus === true) {
    ;[toCurrCode, fromCurrCode] = [fromCurrCode, toCurrCode]
    ;[toCurrRate, fromCurrRate] = [fromCurrRate, toCurrRate]
  }

  // Calculate exchange rate
  const exchangeRate = toCurrRate / fromCurrRate

  // Calculate converted amount
  const exchangeRateCal = amount * exchangeRate

  // Format converted amount
  const formattedAmount = exchangeRateCal.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  console.log(
    `Converted currency from: ${fromCurrCode} to: ${toCurrCode}.
     Exchange conversion is ${toCurrCode} ${formattedAmount}`
  )

  const data = {
    fromCurrencyCode: fromCurrCode,
    toCurrencyCode: toCurrCode,
    toCurrRate,
    inputAmount: amount,
    exchangeRate,
    convertedAmount: exchangeRateCal,
    formattedAmount
  }
  // display results
  displayExchageRates(data)
  return data
}

const displayExchageRates = data => {
  const {
    fromCurrencyCode,
    toCurrencyCode,
    toCurrRate,
    inputAmount,
    convertedAmount,
    formattedAmount
  } = data
  const resultAmount = document.querySelector('#result-amount')
  const resultCurrency = document.querySelector('#result-currency')
  const exchangeRate = document.querySelector('#exchange-rate')
  const originalAmount = document.querySelector('#original-amount')
  resultAmount.textContent = convertedAmount.toLocaleString()
  resultCurrency.textContent = toCurrencyCode
  exchangeRate.textContent = toCurrRate
  originalAmount.textContent = inputAmount
  // scroll to result section
  scrollToElement('convert-button')
}
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
// scroll to this id
export const scrollToElement = elementId => {
  const element = document.getElementById(elementId)

  if (!element) {
    console.warn(`Element #${elementId} not found.`)
    return
  }

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

// Usage
scrollToElement('exchange-results')

window.addEventListener('load', () => {
  initCurencyApp()
})
