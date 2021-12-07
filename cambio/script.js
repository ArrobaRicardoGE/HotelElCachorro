const url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/";

function populateOptions() {
    let request = new XMLHttpRequest();
    request.open("GET", url + "currencies.min.json");
    request.onload = () => {
        if (request.status != 200) {
            alert("no se pudo cargar info de divisas");
            return;
        }
        let obj = JSON.parse(request.response);
        let dummy = document.createElement("select");
        let select = document.getElementById("divisa");
        for (const [value, name] of Object.entries(obj)) {
            dummy.innerHTML = `<option value="${value}">${name}</option>`;
            select.appendChild(dummy.firstElementChild);
        }
    };
    request.send();
}

async function calculatePrice() {
    let result = document.getElementById("result");
    result.innerHTML = `<div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
    let divisa = document.getElementById("divisa").value;
    let request = await fetch(url + "currencies/usd/" + divisa + ".json");
    if (request.status != 200) {
        alert("Ocurrió un error. Vuelva a intentarlo más tarde.");
        result.innerHTML =
            "<p>Ocurrió un error, vuelva a interarlo más tarde</p>";
        return;
    }
    let json = await request.json();
    result.innerHTML = "";
    result.textContent = `Costo por dólar en ${divisa.toUpperCase()}: ${(
        json[divisa] * 1.05
    ).toFixed(2)}`;
    console.log("costo del dolar:", json[divisa] * 1.05);
}

populateOptions();
