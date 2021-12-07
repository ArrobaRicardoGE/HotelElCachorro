function populateEmployees() {
    let request = new XMLHttpRequest();

    const url = "https://dummy.restapiexample.com/api/v1/employees";
    request.open("GET", url);
    request.onload = () => {
        let dummy = document.createElement("tbody");
        let table = document.getElementById("body-table");
        let spinner = document.getElementById("spinner");
        if (request.status != 200) {
            alert(
                `Ocurrió un error con la API. Intentelo de nuevo (${request.status})`
            );
            spinner.style.display = "none";
            return;
        }
        spinner.style.display = "none";
        let obj = JSON.parse(request.response);
        obj.data.forEach((register) => {
            dummy.innerHTML = `<tr>
                <th scope="row">${register.id}</th>
                <td>${register.employee_name}</td>
                <td>${register.employee_age}</td>
                <td>${register.employee_salary}</td>
            </tr>`;
            table.appendChild(dummy.firstElementChild);
        });
    };
    request.onerror = () => {
        let spinner = document.getElementById("spinner");
        alert(`Ocurrió un error con la API. Intentelo de nuevo.`);
        spinner.style.display = "none";
    };
    request.send();
}

function login() {
    let password = document.getElementById("password").value;
    if (password != "pa55word123") {
        alert("Contraseña incorrecta");
        return;
    }
    let loginForm = document.getElementById("loginForm");
    let content = document.getElementById("content");
    content.style.display = "block";
    loginForm.style.display = "none";
    populateEmployees();
}
