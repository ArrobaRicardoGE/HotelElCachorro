let request = new XMLHttpRequest();

const url =
    "https://api.open-meteo.com/v1/forecast?latitude=41.85&longitude=-87.65&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=America%2FLos_Angeles";

request.open("GET", url);
request.onload = () => {
    if (request.status != 200) {
        alert("Ocurrió un error. Intente más tarde");
        return;
    }
    let data = JSON.parse(request.response).daily;
    for (let i = 1; i <= 5; i++) {
        let dummy = document.createElement("tbody");
        let list = document.getElementById("list" + i);
        let day = document.getElementById("day" + i);
        let icon = document.getElementById("icon" + i);
        day.textContent = data.time[i - 1];
        icon.innerHTML = `<img src = "${getImgUrl(
            data.weathercode[i - 1]
        )}" alt="code ${data.weathercode[i - 1]}" width="32px">`;
        list.innerHTML = `
            <li class="list-group-item"><b>Temperatura máxima</b>: ${
                data.temperature_2m_max[i - 1]
            } °C </li>
            <li class="list-group-item"><b>Temperatura mínima</b>: ${
                data.temperature_2m_min[i - 1]
            } °C </li>
        `;
    }
};
request.send();

function getImgUrl(code) {
    return (
        "https://www.metaweather.com/static/img/weather/" +
        mapCode(code) +
        ".svg"
    );
}

function mapCode(code) {
    if (code == 0) return "c";
    if (code <= 3) return "lc";
    if (code <= 63) return "lr";
    if (code <= 70) return "hr";
    if (code <= 86) return "sn";
    return "t";
}
