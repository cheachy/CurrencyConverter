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

    // Reset previous error messages (if there is any)
    errorMessage.style.visibility = "none";
    errorMessage.textContent = "";
    convertDisplay.style.visibility = "hidden";

    // Input validation
    if (isNaN(amount) || amount <= 0) {
        errorMessage.style.visibility = "visible";
        errorMessage.textContent = "Enter a valid amount.";
        return;
    }

    // Ensure currencies values are uppercase
    const from = currencyFrom.value.toUpperCase();
    const to = currencyTo.value.toUpperCase();

    try {
        const response = await fetch(`/api/convert?from=${from}&to=${to}`);     // Call the API route
        const data = await response.json();

        if (!response.ok) {
            errorMessage.style.visibility = "visible";
            errorMessage.textContent = data.error || "Conversion rate not available.";
            return;
        }

        // If success
        const rate = data.rate[to]?.value;

        if (!rate) {
            errorMessage.style.visibility = "visible";
            errorMessage.textContent = "Conversion rate not available.";
            return;
        }

        const convertedAmount = (rate * amount).toFixed(2);
        convertDisplay.style.visibility = "visible";

        // Update the UI
        rateValue.textContent = `${rate.toFixed(5)} ${to}`;
        result.textContent = `${convertedAmount} ${to}`;

    } catch (error) {
        errorMessage.style.visibility = "visible";
        errorMessage.textContent = "Error fetching currency rates.";
        console.error(error);
    }
});