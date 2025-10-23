const valueInput = document.getElementById("amount"); 
const currencyFrom = document.getElementById("currencyFrom");
const currencyTo = document.getElementById("convertedTo");
const rateValue = document.getElementById("rateValue");
const result = document.getElementById("resultValue");
const convertBtn = document.querySelector(".convertButton");
const convertDisplay = document.querySelector(".conversionInfo");
const errorMessage = document.getElementById("errorMessage");

function swap(){
    const temp = currencyFrom.value;
    currencyFrom.value = currencyTo.value;
    currencyTo.value = temp;
}

convertBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const amount = parseFloat(valueInput.value);

    if (isNaN(amount) || amount <= 0) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Enter a valid amount.";
        return;
    } else {
        errorMessage.style.display = "none";
        errorMessage.textContent = "";
    }

    // Ensures that currency codes are in uppercase
    const from = currencyFrom.value.toUpperCase();
    const to = currencyTo.value.toUpperCase();

    try {
        // Call your Vercel serverless function instead of the external API
        const response = await fetch(`/api/convert?from=${from}&to=${to}`);  // Updated to call local API
        const data = await response.json();

        // Conditions if response is true, data was fetched and the currency rate to be converted was fetched
        if (response.ok && data.data && data.data[to]) { 
        const rate = data.data[to].value;
        const convertedAmount = (rate * amount).toFixed(2);   // rate of to be converted currency
        convertDisplay.style.visibility = 'visible';          // make the rate and result visible
        rateValue.textContent = `${rate.toFixed(5)} ${to}`;   //print the rate
        result.textContent = `${convertedAmount} ${to}`;      // print the results
        } else {
        result.textContent = "Conversion rate not available.";
        }
    } catch (error) {
        result.textContent = "Error fetching currency rates.";
        console.error(error);
    }
});