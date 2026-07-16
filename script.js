const API_URL =
    "https://pqynet3bnl.execute-api.ap-south-1.amazonaws.com/ompa/visit";

const statusBox = document.getElementById("status");
const visitButton = document.querySelector(".primary-btn");

async function logVisit() {

    statusBox.innerHTML =
        "⏳ Connecting to AWS API Gateway...";

    visitButton.disabled = true;
    visitButton.innerHTML =
        "Processing...";

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (response.ok) {

            statusBox.innerHTML = `
                ✅ Visitor Logged Successfully<br><br>
                🌍 API Gateway Connected<br>
                ⚡ Lambda Executed<br>
                🗄️ DynamoDB Updated
            `;

        } else {

            statusBox.innerHTML = `
                ❌ API Error<br>
                ${data.message || "Unknown error"}
            `;

        }

    }
    catch (error) {

        console.error(error);

        statusBox.innerHTML = `
            ❌ Connection Failed<br><br>
            Check:
            <br>• API Gateway
            <br>• Lambda
            <br>• CORS Settings
        `;
    }

    visitButton.disabled = false;
    visitButton.innerHTML =
        "Record Visit";
}

window.onload = () => {
    statusBox.innerHTML =
        "🚀 AWS Visitor Logger Ready";
};