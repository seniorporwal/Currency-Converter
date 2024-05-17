# Global Currency Converter

Global Currency Converter is a web application that allows users to convert between different currencies in real-time. It utilizes the Currency API for exchange rates and the Flags API for displaying country flags.

## Live Demo
Try out the live application: [Global Currency Converter]([https://yourwebsite.com](https://fastforex.netlify.app/))

## APIs Used
- **Currency API**: Provides real-time currency exchange rates.
  - Repository: [fawazahmed0/currency-api](https://github.com/fawazahmed0/currency-api)
- **Flags API**: Provides flag images for different countries.
  - Website: [Flags API](https://flagsapi.com)

## Features
- Convert between multiple currencies.
- Real-time exchange rates.
- Display of country flags corresponding to selected currencies.
- User-friendly interface.

## Technologies Used
- **HTML**: Structure of the web pages.
- **CSS**: Styling of the web pages.
- **JavaScript**: Functionality and API integration.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/global-currency-converter.git
    ```
2. Navigate to the project directory:
    ```bash
    cd global-currency-converter
    ```
3. Open `index.html` in your browser to view the application.

## Usage
1. Select the currencies you want to convert from and to.
2. Enter the amount to be converted.
3. Click the "Convert" button to see the converted amount and the exchange rate.

## Code Overview

### HTML
The structure of the application is defined in `index.html`. It includes the dropdowns for selecting currencies, input for the amount, and placeholders for displaying the conversion result and flags.

### CSS
Styling is provided in `styles.css`, ensuring the application is visually appealing and user-friendly.

### JavaScript
Functionality is implemented in `app.js`. Key functions include:
- **populateDropdowns**: Populates the currency selection dropdowns.
- **updateFlag**: Updates the country flag based on the selected currency.
- **getExchangeRate**: Fetches the real-time exchange rate and performs the conversion.

### Example
```javascript
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let button = document.querySelector("button");

button.addEventListener("click", async (e) => {
  e.preventDefault();

  const input = document.querySelector(".amount input");
  let amount = input.value || 1;
  input.value = amount; // Set the input value to 1 if empty

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  try {
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()][fromCurr.value.toLowerCase()];

    if (rate) {
      let convertedAmount = amount * rate;
      document.querySelector(".result").innerText = `${amount} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
    } else {
      console.error("Exchange rate not found.");
    }
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
  }
});
