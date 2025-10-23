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

    // Check if the selected currencies are the same
    if(from === to){
        errorMessage.style.visibility = "visible";
        errorMessage.textContent = "Please select different currencies to convert.";
        return;
    }

    try {
        // Call Vercel serverless function instead of the external API
        const response = await fetch(`/api/convert?from=${from}&to=${to}`);  // Call the internal API
        const data = await response.json();

        // Validate response and data
        if (!response.ok){
            throw new Error(data.error || "Server error. Please try again.");
        }
        if (!data.data || !data.data[to]){
            throw new Error("Conversion rate not found.");
        }

        const rate = data.data[to].value;

        if (!rate) {
            throw new Error("Invalid conversion rate received.");
        }

        // Conversion
        const convertedAmount = (rate * amount).toFixed(2);
        convertDisplay.style.visibility = "visible";
        rateValue.textContent = `${rate.toFixed(5)} ${to}`;
        result.textContent = `${convertedAmount} ${to}`;

        // Hide error message (if there's any)
        errorMessage.style.visibility = "hidden";
        errorMessage.textContent = "";

    } catch (error) {
        // Hide previous conversion display
        convertDisplay.style.visibility = "hidden";
        errorMessage.style.visibility = "visible";
        errorMessage.textContent = "Failed to fetch conversion rate.";

        console.error("Error fetching conversion rate:", error);
    }
});