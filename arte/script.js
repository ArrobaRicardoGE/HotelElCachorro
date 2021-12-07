const url = "https://api.artic.edu/api/v1/artworks";

function randInt(inf, sup) {
    return Math.floor(Math.random() * (sup - inf) + inf);
}

function showImage() {
    let request = new XMLHttpRequest();
    request.open("GET", url + `?limit=100`);
    let image = document.getElementById("image");
    image.innerHTML = `<div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
    request.onload = () => {
        if (request.status != 200) {
            alert("No se pudo cargar la imagen.");
            return;
        }
        let i = randInt(0, 100);
        let obj = JSON.parse(request.response);
        if (!obj.data[i].image_id) {
            showImage();
            return;
        }
        let title = document.getElementById("title");
        let author = document.getElementById("author");
        let image = document.getElementById("image");
        let date = document.getElementById("date");
        title.textContent = obj.data[i].title;
        author.textContent = obj.data[i].artist_title;
        date.textContent = obj.data[i].date_display;
        image.innerHTML = `<img src ="https://www.artic.edu/iiif/2/${obj.data[i].image_id}/full/843,/0/default.jpg" alt="Obra de arte" style="width:100%">`;
        console.log(obj.data[i]);
    };
    request.send();
}

showImage();
