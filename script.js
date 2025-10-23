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

    // Reset error message and conversion display
    errorMessage.style.visibility = "hidden";
    errorMessage.textContent = "";
    convertDisplay.style.visibility = "hidden";

    if (isNaN(amount) || amount <= 0) {
        errorMessage.style.visibility = "visible";
        errorMessage.textContent = "Enter a valid amount.";
        return;
    }

    // Ensures that currency codes are in uppercase
    const from = currencyFrom.value.toUpperCase();
    const to = currencyTo.value.toUpperCase();

    if(from === to){
        errorMessage.style.visibility = "visible";
        errorMessage.textContent = "Please select different currencies to convert.";
        return;
    }

    try {
        // Call your Vercel serverless function instead of the external API
        const response = await fetch(`/api/convert?from=${from}&to=${to}`);  // Updated to call local API
        const data = await response.json();

        // Conditions if response is true, data was fetched and the currency rate to be converted was fetched
        if (response.ok && data.data && data.data[to]) { 
        const rate = data.data[to].value;

        if(!rate){
            throw new Error("Conversion rate not found.");
        }

        const convertedAmount = (rate * amount).toFixed(2);   // rate of to be converted currency
        convertDisplay.style.visibility = 'visible';          // make the rate and result visible
        rateValue.textContent = `${rate.toFixed(5)} ${to}`;   //print the rate
        result.textContent = `${convertedAmount} ${to}`;      // print the results

        } else {
            throw new Error("Conversion rate not found.");
        }
    } catch (error) {
        errorMessage.style.visibility = "visible";
        errorMessage.textContent = "Failed to fetch conversion rate.";
        console.error("Error fetching conversion rate:", error);
    }
});