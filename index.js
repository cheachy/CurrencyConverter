// const values to be used 
const valueInput = document.getElementById("amount"); 
const currencyFrom = document.getElementById("currencyFrom");
const currencyTo = document.getElementById("convertedTo");
const rateValue = document.getElementById("rateValue");
const result = document.getElementById("resultValue");
const convertBtn = document.querySelector(".convertButton");
const convertDisplay = document.querySelector(".conversionInfo");

// swap currencies
function swap(){
  const temp = currencyFrom.value;
  currencyFrom.value = currencyTo.value;
  currencyTo.value = temp;
}

convertBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  
  const amount = parseFloat(valueInput.value); // turn the amount into float
  
  // input validation
  if (isNaN(amount) || amount <= 0) {
    result.textContent = "Enter a valid amount.";
    return;
  }

  // makes sure that the values are all in uppercase for validation
  const from = currencyFrom.value.toUpperCase();
  const to = currencyTo.value.toUpperCase();

  const apiKey = "cur_live_FFORayCQBezLFWpQC5KjJMVzLPTTO66d7R34Nhtn";

  try {
    // fetch latest rates of the from and to values (PHP, USD, etc.)
    let url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=${from}&currencies=${to}`;

    const response = await fetch(url); // waiting for response
    const data = await response.json(); // get data

    // conditions if response is true, data was fetched and the currency rate to be converted was fetched
    if (response.ok && data.data && data.data[to]) { 
      const rate = data.data[to].value;                       // rate of to be converted currency
      const convertedAmount = (rate * amount).toFixed(2);     // manual calculation up to two decimals
      convertDisplay.style.visibility = 'visible';            // make the rate and result visible
      rateValue.textContent = `${rate.toFixed(5)} ${to}`;     //print the rate to the website
      result.textContent = `${convertedAmount} ${to}`;        // print the results to the website
    } else {
      result.textContent = "Conversion rate not available.";
    }
  } catch (error) {
    result.textContent = "Error fetching currency rates.";
    console.error(error);
  }
});