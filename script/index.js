let lastId = 1;
let museums = [];

function filterFunction() {
    const input = document.getElementById("myInput");
    const filter = input.value.toUpperCase();
    const div = document.getElementById("myDropdown");
    const a = div.getElementsByTagName("a");
    for (let i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (filter == "") {
            a[i].style.display = "none";
        } else if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "block";
        } else {
            a[i].style.display = "none";
        }
    }
    if (filter.length == 0) {
        const cardContainer = document.querySelector(".card-container");
        const loadMoreButton = document.querySelector(".load-more-button");
        cardContainer.innerHTML = "";
        lastId = 1;
        setValues(museums);
        setCities(cities);
        loadMoreButton.style.display = "block";
    }
}

function chooseCity(e) {
    const div = document.getElementById("myDropdown");
    const input = document.getElementById("myInput");

    input.value = e.textContent;

    const a = div.getElementsByTagName("a");
    for (let i = 0; i < a.length; i++) {
        a[i].style.display = "none";
    }

    loadMuseumsBySearch(input.value);
}

function createCard(data) {
    return `
    <div class="col-md-4 col-sm-6">
        <div class="box">
            <img src="${data.images[0]}" alt="${data.title}" />
            <div class="box-content">
                <h3 class="title">${data.title}</h3>
                <span class="post">${data.city}</span>
                <ul class="icon">
                    <li>
                        <a href="single-museum.html?id=${data.id}"
                            ><i class="fa fa-search"></i
                        ></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    `;
}

function setValues(data) {
    const cardContainer = document.querySelector(".card-container");
    for (let i = lastId; i < lastId + 3; i++) {
        cardContainer.innerHTML += createCard(data[i - 1]);
    }
    lastId += 3;
}

function loadMore() {
    setValues(museums);
}

function loadMuseumsBySearch(city) {
    const cardContainer = document.querySelector(".card-container");
    const newMuseums = museums.filter((el) => el.city == city);
    const loadMoreButton = document.querySelector(".load-more-button");
    loadMoreButton.style.display = "none";
    cardContainer.innerHTML = "";
    newMuseums.forEach((museum) => {
        cardContainer.innerHTML += createCard(museum);
    });
}

function loadMuseums() {
    fetch("./data/museums.json")
        .then((response) => response.json())
        .then((data) => {
            museums = data.museums;
            cities = data.museums.map((el) => el.city);
            cities = [...new Set(cities)];
            setCities(cities);
            setValues(museums);
        });
}

function createCity(city) {
    return `
    <a onclick="chooseCity(this)">${city}</a>
    `;
}

function setCities(cities) {
    const dropdown = document.getElementById("myDropdown");
    dropdown.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="search-icon">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                    <input type="text" placeholder="Choose city..." id="myInput" onkeyup="filterFunction()" />
    `;
    for (let i = 0; i < cities.length; i++) {
        dropdown.innerHTML += createCity(cities[i]);
    }
}

loadMuseums();
