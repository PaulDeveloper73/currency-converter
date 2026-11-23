# Currency Converter – Global Exchange Rate Calculator

**Convert currencies. Compare exchange rates. Make informed financial decisions.**

A responsive JavaScript-based currency conversion application designed to simplify international currency conversions. The application allows users to select currencies, calculate exchange values, reverse conversion directions, and work with structured exchange-rate data through a straightforward interface.

**Live Application:** [https://pauldeveloper73.github.io/currency-converter/](https://pauldeveloper73.github.io/currency-converter/)

**Developer Portfolio:** [Kisakye Paul – Software Developer](https://pauldeveloper73.github.io/Kisakye-Paul-Elite-Portifolio/)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [How Currency Conversion Works](#how-currency-conversion-works)
- [Technologies Used](#technologies-used)
- [Application Structure](#application-structure)
- [Exchange Rate Data](#exchange-rate-data)
- [Getting Started](#getting-started)
- [Application Workflow](#application-workflow)
- [Validation and Error Handling](#validation-and-error-handling)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Project Notes and Attribution](#project-notes-and-attribution)
- [Developer Information](#developer-information)

---

## Project Overview

The Currency Converter is a web-based financial utility developed to make currency conversion simple, accessible, and efficient.

It provides an interface for selecting source and destination currencies, entering an amount, and calculating the equivalent value using available exchange-rate data.

The application uses JavaScript to handle conversion calculations, currency selection, input validation, number formatting, and interface interactions. Exchange-rate information is structured in JSON format and can be loaded from a local data source or connected to an external exchange-rate service.

The project demonstrates practical frontend development skills, including DOM manipulation, asynchronous JavaScript, Fetch API integration, JSON data handling, mathematical calculations, and responsive interface development.

**Project Objective:** Build a simple, reliable, and extensible currency conversion tool that demonstrates how modern JavaScript can be applied to real-world financial applications.

## Key Features

### 1. Multiple Currency Support

Select from the currencies available in the application's exchange-rate dataset.

The currency selection system uses three-letter international currency codes, including:

- USD – United States Dollar
- UGX – Ugandan Shilling
- KES – Kenyan Shilling
- TZS – Tanzanian Shilling
- RWF – Rwandan Franc
- NGN – Nigerian Naira
- GHS – Ghanaian Cedi
- ZAR – South African Rand
- EUR – Euro
- GBP – Pound Sterling
- JPY – Japanese Yen
- CAD – Canadian Dollar
- AUD – Australian Dollar
- INR – Indian Rupee
- AED – UAE Dirham
- SAR – Saudi Riyal

Additional currencies can be supported by updating the exchange-rate dataset.

### 2. Instant Currency Conversion

Enter an amount, select the source currency and destination currency, and calculate the equivalent value using the available exchange rates.

The application uses a consistent mathematical conversion formula to calculate amounts between currencies sharing the same base currency.

### 3. Currency Swap Functionality

The swap button allows users to reverse their selected currencies with one click.

For example:

- Before: USD → UGX
- After: UGX → USD

The selected currencies are updated in the interface, allowing the conversion direction to change without manually selecting both currencies again.

### 4. Exchange Rate Calculations

The application calculates conversion values using the exchange rates associated with the selected currencies.

It supports conversions in both directions without requiring separate mathematical formulas for forward and reverse conversions.

### 5. Number Formatting

Converted amounts are formatted with thousand separators and configurable decimal precision to improve readability.

Example:

- Raw value: `1234567.89`
- Formatted value: `1,234,567.89`

### 6. Input Validation

The application validates user input before performing calculations.

Validation includes:

- Empty input detection.
- Invalid numerical values.
- Non-finite numbers.
- Zero and negative amount restrictions.
- Invalid or unavailable exchange rates.

### 7. Exchange Rate Data Management

The application supports structured JSON exchange-rate data through a local `data.json` file.

This provides a convenient way to load exchange-rate information without requiring an external API request for every conversion.

### 8. API Integration and Status Monitoring

The application is structured to work with ExchangeRate-API for retrieving exchange-rate information.

The API integration can be used to retrieve conversion rates and associated update metadata, including the last update and next scheduled update.

The interface can also display exchange-rate data availability and connection status.

### 9. Responsive User Interface

The application is designed to provide a straightforward currency conversion experience across supported screen sizes.

The interface focuses on accessible controls, clear currency selections, readable conversion results, and convenient user interactions.

---

## How Currency Conversion Works

The application uses exchange rates relative to a common base currency.

For example, when USD is the base currency:

| Currency | Exchange Rate |
| -------- | ------------: |
| USD      |             1 |
| UGX      |      4,215.85 |
| EUR      |       0.91025 |
| GBP      |       0.76194 |
| KES      |        129.97 |

These figures are illustrative examples; actual exchange rates depend on the currently loaded dataset.

### Conversion Formula

The application uses the following formula:

`Converted Amount = (Input Amount / From Currency Rate) × To Currency Rate`

**Example: USD to UGX**

If:

- Input amount = 100 USD
- USD rate = 1
- UGX rate = 4,215.85

Then:

`(100 / 1) × 4,215.85 = 421,585 UGX`

**Example: UGX to USD**

`(421,585 / 4,215.85) × 1 = 100 USD`

This approach supports conversions between any two currencies available in the same base-currency exchange-rate dataset.

---

## Technologies Used

The application uses the following web technologies and development concepts:

| Technology        | Purpose                                       |
| ----------------- | --------------------------------------------- |
| HTML5             | Application structure and interface elements  |
| CSS3              | Styling and visual presentation               |
| Tailwind CSS      | Utility-based interface styling               |
| JavaScript (ES6+) | Application logic and interactions            |
| DOM API           | Dynamic interface updates and event handling  |
| Fetch API         | Loading exchange-rate data                    |
| JSON              | Structured currency and exchange-rate storage |
| ExchangeRate-API  | External exchange-rate data provider          |

### JavaScript Concepts Demonstrated

- ES6 modules and imports/exports.
- Arrow functions.
- Destructuring.
- Array and object manipulation.
- Event listeners and event dispatching.
- Conditional statements.
- Asynchronous programming with `async/await`.
- Fetch API and HTTP response handling.
- Number validation using `Number.isFinite()`.
- Number formatting using `toLocaleString()`.
- String comparison using `localeCompare()`.
- DOM selection and manipulation.
- Error handling using `try`, `catch`, and `throw`.

---

## Application Structure

A suggested project structure is:

```text
currency-converter/
│
├── index.html
│
├── data.json
│
├── css/
│   └── style.css
│
├── js/
│   ├── script.js
│   ├── api.js
│   ├── getLastDate.js
│   └── currencyConverter.js
│
├── assets/
│   ├── images/
│   └── icons/
│
└── README.md
```

**Main Files:**

- `index.html` – Contains the application interface.
- `data.json` – Stores the exchange-rate dataset.
- `style.css` – Contains custom application styling.
- `script.js` – Handles application initialization and event management.
- `api.js` – Manages exchange-rate data retrieval and API status.
- `getLastDate.js` – Handles exchange-rate date formatting.
- `currencyConverter.js` – Contains currency conversion calculations and related functionality.

The structure can be adjusted to match the actual repository organization.

---

## Exchange Rate Data

The application uses a structured exchange-rate response similar to the ExchangeRate-API response format.

Example:

```json
{
  "result": "success",
  "base_code": "USD",
  "conversion_rates": {
    "USD": 1,
    "UGX": 4215.85,
    "KES": 129.97,
    "EUR": 0.91025,
    "GBP": 0.76194
  }
}
```

### Loading Local JSON Data

The application can retrieve the local dataset using JavaScript's Fetch API:

```javascript
const response = await fetch("./data.json");

if (!response.ok) {
  throw new Error("Unable to load exchange rates.");
}

const data = await response.json();
```

The returned exchange-rate data can then be accessed using:

```javascript
data.base_code;

data.conversion_rates.UGX;

data.conversion_rates.EUR;
```

### Live Exchange Rate Integration

The application can also connect to the ExchangeRate-API service.

Official API documentation:

[https://www.exchangerate-api.com/docs](https://www.exchangerate-api.com/docs)

Example endpoint:

```text
https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD
```

**Important:** Local JSON data represents a stored snapshot and does not automatically update. Live exchange-rate data requires a successful API request or another reliable update mechanism. Exchange rates should not be presented as real-time when the application is using an older local dataset.

API credentials should be protected. For production applications, route authenticated requests through a backend rather than publishing private API keys in frontend JavaScript.

---

## Getting Started

### Requirements

To run and modify the application, you need:

- A modern web browser.
- Visual Studio Code or another code editor.
- Live Server or another local development server.
- Basic knowledge of HTML, CSS, and JavaScript.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the Project

Open the project directory in Visual Studio Code.

### 3. Start the Development Server

Use the Live Server extension in Visual Studio Code.

Open the application through the local server rather than opening `index.html` directly with the browser's `file://` protocol.

### 4. Access the Application

Open the local development URL provided by Live Server.

Ensure that `data.json` is accessible from the application's URL.

### 5. Test Currency Conversion

Select your source and destination currencies, enter a valid amount, and test the conversion and swap functionality.

---

## Application Workflow

The application follows a straightforward conversion workflow:

1. **Initialize Application:** Load the application and retrieve available exchange-rate data.
2. **Load Currency Options:** Populate the currency selection controls.
3. **Select Currencies:** Choose the source and destination currencies.
4. **Enter Amount:** Validate the amount supplied by the user.
5. **Calculate Conversion:** Apply the appropriate exchange-rate formula.
6. **Format Results:** Display the converted value with readable number formatting.
7. **Swap Currencies:** Allow users to reverse the conversion direction.
8. **Update Interface:** Refresh the visible conversion information and relevant status indicators.

---

## Validation and Error Handling

Reliable currency conversion requires proper input validation and data handling.

The application includes validation for common scenarios such as:

| Scenario                   | Expected Behaviour           |
| -------------------------- | ---------------------------- |
| Empty amount               | Reject the input             |
| Alphabetical input         | Reject the input             |
| Zero amount                | Reject the input             |
| Negative amount            | Reject the input             |
| Infinite value             | Reject the input             |
| Valid positive amount      | Allow conversion             |
| Missing exchange-rate data | Display an appropriate error |
| Failed HTTP request        | Handle the request failure   |

The application also checks the availability of exchange-rate information before performing calculations.

---

## Deployment

The application is published using GitHub Pages.

**Live Preview:**

[https://pauldeveloper73.github.io/currency-converter/](https://pauldeveloper73.github.io/currency-converter/)

For future deployment updates:

1. Commit your application changes.
2. Push the updates to the configured GitHub repository.
3. Ensure that GitHub Pages is enabled.
4. Verify that JSON files, JavaScript modules, stylesheets, and other assets load correctly.
5. Test the deployed application using its live URL.

When deploying to a GitHub Pages repository subdirectory, ensure that relative asset and JSON paths resolve correctly.

---

## Future Improvements

The project can be extended into a more comprehensive financial utility with additional functionality.

Potential improvements include:

- **Historical Exchange Rates:** Allow users to view exchange rates from previous dates.
- **Currency Charts:** Visualize exchange-rate movements over different periods.
- **Currency Search:** Add searchable currency selection controls.
- **Currency Favourites:** Allow users to save frequently used currencies.
- **Recent Conversions:** Maintain a history of previous conversions.
- **Live Rate Refresh:** Automatically retrieve updated rates at appropriate intervals.
- **Offline Support:** Cache previously retrieved exchange-rate data for limited offline use.
- **Multi-Provider Integration:** Support alternative exchange-rate providers.
- **Conversion Alerts:** Notify users when selected currency rates reach specified thresholds.
- **PWA Support:** Make the application installable on supported devices.
- **Backend Integration:** Introduce a secure backend for API key management and centralized rate caching.

---

## Project Notes and Attribution

**Project Name:** Currency Converter – Global Exchange Rate Calculator

**Developer:** Kisakye Paul — Software Developer

**Exchange Rate Provider:** ExchangeRate-API (when using the live API integration)

**Configured API Documentation:** [https://www.exchangerate-api.com/docs](https://www.exchangerate-api.com/docs)

**Live Preview:** [https://pauldeveloper73.github.io/currency-converter/](https://pauldeveloper73.github.io/currency-converter/)

**Developer Portfolio:** [https://pauldeveloper73.github.io/Kisakye-Paul-Elite-Portifolio/](https://pauldeveloper73.github.io/Kisakye-Paul-Elite-Portifolio/)

Exchange-rate data, API services, trademarks, libraries, fonts, and other third-party resources remain subject to their respective owners' terms, conditions, and licensing requirements.

Exchange rates are indicative reference values and may differ from rates offered by banks, financial institutions, payment providers, and foreign exchange bureaus. Rates should be verified with the relevant financial provider before making financial transactions.

This application is intended as a currency conversion utility and does not provide financial, investment, or foreign exchange trading advice.

No ownership of third-party services or exchange-rate data is claimed by this project.

Unless a separate LICENSE file is added to this repository, do not assume that the project's source code is released under an open-source license.

---

## Developer Information

**Developed By: Kisakye Paul – Software Developer**

I design, develop, and maintain modern web and mobile applications, with a focus on functional user interfaces, practical software solutions, maintainable code, and reliable digital experiences.

**Portfolio:** [Explore My Development Portfolio](https://pauldeveloper73.github.io/Kisakye-Paul-Elite-Portifolio/)

**Email:** [kisakyepaul73@gmail.com](mailto:kisakyepaul73@gmail.com)

**GitHub:** [Explore My Projects](https://github.com/pauldeveloper73)

**WhatsApp:** [Contact Me on WhatsApp](https://wa.me/+256774185964)

**Interested in working together?** Get in touch for website development, custom software solutions, business applications, and web or mobile application projects.

---

**BUILT WITH PURPOSE. DEVELOPED WITH PRECISION. DESIGNED FOR REAL-WORLD USE.**

© Kisakye Paul – Software Developer. All rights reserved.
